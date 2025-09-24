import test, { expect } from "@playwright/test";
import { clearDb } from "./utils/clearDb";

const BASE_URL = "http://localhost:3000/superpower/create";

test.beforeEach(async ({ page }) => {
  await clearDb();
  await page.goto(BASE_URL);
});

test("Title, input, btn being visible", async ({ page }) => {
  await expect(page.locator("h1")).toContainText("Create a superpower");

  const input = page.getByLabel("Superpower");
  await expect(input).toBeVisible();

  const submitBtn = page.getByRole("button", { name: "Create" });
  await expect(submitBtn).toBeVisible();
});

test("Create empty superpower", async ({ page }) => {
  const input = page.getByLabel("Superpower");
  expect(input).toHaveValue("");
  const submitBtn = page.getByRole("button", { name: "Create" });

  await submitBtn.click();
  
  const errorMsg = 'Power must be at least 3 characters'
  const errorElement = page.getByText(errorMsg)
  await expect(errorElement).toBeVisible()
});

test("Add new superpowers", async ({ page }) => {
  const input = page.getByLabel("Superpower");
  const submitBtn = page.getByRole("button", { name: "Create" });

  const uniquePower = `superpower-${Date.now()}`;
  await input.fill(uniquePower);
  await submitBtn.click();

  const successToastMsg = page.getByText("Superpower created");
  await expect(successToastMsg).toBeVisible({ timeout: 5000 });

  await expect(input).toHaveValue("", { timeout: 5000 });

  const newSuperpower = page.getByText(uniquePower);
  await expect(newSuperpower).toBeVisible();
});

test("Add duplicated superpower", async ({ page }) => {
  const input = page.getByLabel("Superpower");
  const submitBtn = page.getByRole("button", { name: "Create" });

  const superpower = `test_superpower`;
  await input.fill(superpower);
  await submitBtn.click();

  const successToastMsg = page.getByText("Superpower created");
  await expect(successToastMsg).toBeVisible({ timeout: 5000 });

  await expect(input).toHaveValue("", { timeout: 5000 });

  await input.fill(superpower);
  await submitBtn.click();

  const errorToastMsg = page.getByText("Superpower already exists");
  await expect(errorToastMsg).toBeVisible({ timeout: 5000 });

  await expect(input).toHaveValue(superpower, { timeout: 5000 });
});
