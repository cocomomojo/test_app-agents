import { test, expect } from '@playwright/test';

test.describe('基本ナビゲーション機能', () => {
  test.beforeEach(async ({ page }) => {
    // ログイン処理
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveURL(/^(?!.*login).*$/);
  });

  test('基本ナビゲーション', async ({ page }) => {
    // TODOページに移動
    await page.getByRole('link', { name: 'TODO' }).first().click();
    await page.waitForURL(/todo/, { timeout: 10000 });
    
    // メモページに移動
    await page.getByRole('link', { name: 'メモ' }).first().click();
    await page.waitForURL(/memo/, { timeout: 10000 });
    
    // トップページに戻る
    await page.getByRole('link', { name: 'トップ' }).first().click();
    await page.waitForURL(/top|^\//, { timeout: 10000 });
    
    // ログアウト
    await page.getByRole('link', { name: 'ログアウト' }).first().click();
    
    // ログイン画面に戻ることを確認
    await expect(page.locator('input[type="password"], form')).toBeVisible();
  });
});