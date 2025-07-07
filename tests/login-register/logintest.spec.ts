import { test, expect } from '@playwright/test';
import 'dotenv/config';

test.use({
  permissions: ['geolocation'],
  geolocation: { latitude: 18.4861, longitude: -69.9312 }, 
  locale: 'es-DO'
});

test.describe('Login', () => {
  test('debe permitir iniciar sesión con credenciales válidas', async ({ page, context }) => {
    
    await page.goto('http://localhost:5173/auth/login');

    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill(process.env.PASSWORD!);


    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    await expect(page.locator('#content')).toContainText('Publicaciones');
    await expect(page).toHaveURL(/\/publications/);
  });




  test('debe mostrar mensaje de error si las credenciales son inválidas', async ({ page }) => {

    await page.goto('http://localhost:5173/auth/login');

    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('1234'); 

    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    const errorMessage = await page.getByText('Usuario o contraseña incorrecto.');
    await expect(errorMessage).toBeVisible();
  });
});
