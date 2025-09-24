import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test("Homepage has title", async ({ page }) => {
  await expect(page.locator("h1")).toContainText("All superheroes");
  await expect(page.locator("h2")).toContainText("No superheroes created yet");
});
