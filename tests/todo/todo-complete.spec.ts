import { test, expect } from '@playwright/test';

test.describe('TODO完了機能', () => {
  test.beforeEach(async ({ page }) => {
    // ログイン処理
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveURL(/^(?!.*login).*$/);
    
    // TODOページに移動
    await page.getByRole('link', { name: 'TODO' }).first().click();
  });

  test('TODO完了', async ({ page }) => {
    // TODOページが正しく表示されていることを確認
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/todo/);
  });
});