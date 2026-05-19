import { chromium } from "playwright";

const URL = process.env.TEST_URL || "http://localhost:5173/";

async function videoState(page) {
  return page.evaluate(() => {
    const v = document.querySelector("video.app-bg-video");
    if (!v) return null;
    return {
      paused: v.paused,
      muted: v.muted,
      volume: v.volume,
      currentTime: Math.round(v.currentTime * 100) / 100,
      readyState: v.readyState,
    };
  });
}

async function motionState(page) {
  return page.evaluate(() => ({
    mountedRows: document.querySelectorAll(".p3-row.mounted").length,
    totalRows: document.querySelectorAll(".p3-row").length,
    hintMounted: document.querySelector(".p3-hint.mounted") !== null,
    transitionLayers: document.querySelectorAll('[style*="z-index: 999"]').length,
    path: location.pathname,
  }));
}

async function runScenario(browser, { label, clearAudioSession = false }) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  if (clearAudioSession) {
    await context.addInitScript(() => sessionStorage.removeItem("pw-bg-audio"));
  }
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: "load", timeout: 25000 });

  const timeline = [];
  for (const waitMs of [0, 300, 1000, 1500, 2500]) {
    if (waitMs) await page.waitForTimeout(waitMs === 300 ? 300 : waitMs === 1000 ? 700 : waitMs === 1500 ? 500 : 1000);
    timeline.push({
      at: waitMs === 0 ? "load" : `${waitMs}ms`,
      video: await videoState(page),
      motion: await motionState(page),
      sessionAudio: await page.evaluate(() => sessionStorage.getItem("pw-bg-audio")),
    });
  }

  // Page transition: home -> about (default active = ABOUT ME)
  const beforeNav = await page.evaluate(() =>
    document.querySelectorAll("motion-div, [data-framer-name]").length,
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(100);
  const midTransition = await page.evaluate(() => ({
    path: location.pathname,
    fixedMotion: [...document.querySelectorAll("motion-div")].length,
    highZ: [...document.querySelectorAll("*")].filter((el) => {
      const z = getComputedStyle(el).zIndex;
      return z === "999" || z === "998" || z === "997";
    }).length,
  }));
  await page.waitForTimeout(700);
  const afterAbout = {
    path: await page.evaluate(() => location.pathname),
    bars: await page.evaluate(() => document.querySelectorAll(".sc-bar-outer.mounted").length),
    dim: await page.evaluate(() => !!document.querySelector(".sc-dim")),
    video: await videoState(page),
  };

  // Arrow should play transition + move focus on about page
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(400);
  const afterBarNav = await page.evaluate(() => ({
    activeBar: document.querySelector(".sc-bar-outer.active .sc-bar-label")?.textContent?.trim(),
    mountedBars: document.querySelectorAll(".sc-bar-outer.mounted").length,
  }));

  // Click sound pool primed?
  const clickPool = await page.evaluate(() => {
    const audios = [...document.querySelectorAll("audio")];
    return { audioCount: audios.length, anyPlaying: audios.some((a) => !a.paused) };
  });

  // First click on menu-like target after going back
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  await page.goto(URL);
  await page.waitForTimeout(1500);
  const afterPointer = await videoState(page);
  await page.mouse.click(400, 400);
  await page.waitForTimeout(500);
  const afterClick = await videoState(page);

  await context.close();
  return { label, timeline, beforeNav, midTransition, afterAbout, afterBarNav, clickPool, afterPointer, afterClick };
}

async function runDefaultPolicySuite() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const out = [];
  for (const vp of [
    { label: "desktop default autoplay", width: 1440, height: 900 },
    { label: "mobile default autoplay", width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    await context.addInitScript(() => sessionStorage.removeItem("pw-bg-audio"));
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "load", timeout: 25000 });
    await page.waitForTimeout(2500);
    const home = await page.evaluate(() => {
      const v = document.querySelector("video.app-bg-video");
      return {
        video: v && { paused: v.paused, muted: v.muted, currentTime: v.currentTime },
        session: sessionStorage.getItem("pw-bg-audio"),
        mountedRows: document.querySelectorAll(".p3-row.mounted").length,
      };
    });
    await page.keyboard.press("Enter");
    await page.waitForTimeout(900);
    const about = await page.evaluate(() => ({
      path: location.pathname,
      mountedBars: document.querySelectorAll(".sc-bar-outer.mounted").length,
      highZ: [...document.querySelectorAll("*")].filter((el) => {
        const z = getComputedStyle(el).zIndex;
        return z === "999" || z === "998";
      }).length,
    }));
    await page.mouse.click(vp.width / 2, vp.height / 2);
    await page.waitForTimeout(500);
    const afterClick = await page.evaluate(() => {
      const v = document.querySelector("video.app-bg-video");
      return v && { paused: v.paused, muted: v.muted, currentTime: v.currentTime };
    });
    await context.close();
    out.push({ label: vp.label, home, about, afterClick });
  }
  await browser.close();
  return out;
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});

const results = [];
results.push(
  await runScenario(browser, { label: "permissive autoplay policy" }),
);
results.push(
  await runScenario(browser, {
    label: "permissive + cleared sessionStorage",
    clearAudioSession: true,
  }),
);

await browser.close();

const defaultPolicy = await runDefaultPolicySuite();

console.log(JSON.stringify({ url: URL, results, defaultPolicy }, null, 2));

const std = results[0];
const pass = {
  menuAnimatesOnLoad: std.timeline.some((t) => t.motion.mountedRows === 4),
  menuFullyMountedBy2_5s: std.timeline.at(-1)?.motion.mountedRows === 4,
  navigatesToAbout: std.afterAbout.path === "/about",
  aboutBarsAnimate: std.afterAbout.bars >= 3,
  videoAdvancesWithPermissivePolicy:
    std.timeline.some((t) => t.video && t.video.currentTime > 0.1) ||
    std.afterClick?.currentTime > 0.1,
};
console.log("\n--- PASS/FAIL ---");
console.log(JSON.stringify(pass, null, 2));
