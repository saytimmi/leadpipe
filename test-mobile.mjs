import { chromium, devices } from 'playwright';

const phone = devices['iPhone 14'];

async function test() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...phone });
  const page = await context.newPage();

  await page.goto('http://localhost:3999', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Hero
  await page.screenshot({ path: '/tmp/m1-hero.png' });
  console.log('1. Hero');

  // Scroll to story
  await page.evaluate(() => document.getElementById('story')?.scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/m2-story-top.png' });
  console.log('2. Story top');

  // Scroll through story
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.6));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `/tmp/m${3+i}-story-${i}.png` });
    console.log(`${3+i}. Story scroll ${i}`);
  }

  // Problem
  await page.evaluate(() => document.getElementById('problem')?.scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/m9-problem.png' });
  console.log('9. Problem');

  await browser.close();
  console.log('Done!');
}

test().catch(console.error);
