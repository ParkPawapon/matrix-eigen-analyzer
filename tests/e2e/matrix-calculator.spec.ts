import { expect, test } from "@playwright/test";

test("matrix calculator core flow", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "EigenScope" })).toBeVisible();
  await page.getByRole("link", { name: /^Open Calculator$/i }).click();
  await expect(page.getByRole("heading", { name: /Matrix Input That Calculates/i })).toBeVisible();
  await expect(page.getByTestId("matrix-calculator")).toHaveAttribute("data-hydrated", "true");
  await page.getByRole("button", { name: /^Generate Matrix$/i }).click();
  const generatedMatrixValues = await page
    .locator('input[type="number"]')
    .evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value));
  expect(generatedMatrixValues.some((value) => value.includes("."))).toBe(true);
  await page.getByRole("button", { name: /^Calculate$/i }).click();
  await expect(page.getByText(/Eigenvalue 1/i)).toBeVisible();
  await expect(page.getByText(/lambda\^2/i)).toBeVisible();
  await page.getByRole("button", { name: "3x3" }).click();
  await page.getByRole("button", { name: /3x3 not diagonalizable/i }).click();
  await page.getByRole("button", { name: /^Calculate$/i }).click();
  await expect(page.getByText(/Not diagonalizable \/ real/i)).toBeVisible();
  await page.locator("body").click({ position: { x: 8, y: 8 } });
  await page.screenshot({ fullPage: true, path: "/tmp/eigenscope-calculator.png" });
});
