import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/auth/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('jblanco');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jblanco');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByText('Permisos de ubicación del').click();
  await page.getByRole('alert').locator('path').click();
  await page.getByRole('alert').click();
  await page.locator('[id="1"]').click();
  await page.getByRole('progressbar', { name: 'notification timer' }).click();
  await page.locator('[id="1"]').click();
});