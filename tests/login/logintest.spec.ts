import { test, expect } from '@playwright/test';
import 'dotenv/config';

// Configuración global para la geolocalización simulada y el idioma
test.use({
  permissions: ['geolocation'],
  geolocation: { latitude: 18.4861, longitude: -69.9312 }, 
  locale: 'es-DO'
});

test.describe('Login', () => {

  // Test para login  con credenciales válidas
  test('debe permitir iniciar sesión con credenciales válidas', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/auth/login`);

    // Completar campos del formulario de inicio de sesión
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill(process.env.PASSWORD!);

    // Enviar formulario
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Validaciones de acceso
    await expect(page).toHaveURL(/\/publications\/list/);

  });

  // Test para login fallido con contraseña incorrecta
  test('debe mostrar mensaje de error si las credenciales son inválidas', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/auth/login`);

    // Completar campos con contraseña incorrecta
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('1234');

    // Enviar formulario
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Verificar mensaje de error
    const errorMessage = await page.getByText('Usuario o contraseña incorrecto.');
    await expect(errorMessage).toBeVisible();
  });
  
  


});
