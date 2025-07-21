import { test, expect } from '@playwright/test';
import 'dotenv/config';

// Forzar que no se otorguen permisos de geolocalización para este test
test.use({
  permissions: [] // Esto revoca cualquier permiso previamente otorgado
});

// Test para validar mensaje de geolocalización desactivada tras login
test('debe mostrar mensaje de permisos de ubicación tras el login', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/auth/login`);

  // Completar formulario de login
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // Validar mensaje de alerta por permisos de ubicación desactivados
  const mensaje = page.locator('text=Permisos de ubicación del navegador desactivados');
  await expect(mensaje).toBeVisible({ timeout: 7000 });
});