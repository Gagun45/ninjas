import { test, expect } from "@playwright/test";
// import { clearDb } from "./utils/clearDb";

const BASE_URL = "http://localhost:3000";

// test.beforeAll(async () => {
//   await clearDb();
// });


test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test("Homepage has title", async ({ page }) => {
  await expect(page.locator("h1")).toContainText("All superheroes");
  await expect(page.locator("h2")).toContainText("No superheroes created yet");
});
