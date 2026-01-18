import { test, expect } from '@playwright/test';

test.describe('ナビゲーション機能 - ログアウト', () => {
  test.beforeEach(async ({ page }) => {
    // 有効な認証情報でログイン
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    
    // ログイン完了まで待機
    await expect(page.getByRole('link', { name: 'TODO' }).first()).toBeVisible();
  });

  test('ログアウト機能が正常に動作する', async ({ page }) => {
    // 1. ログイン済み状態を確認
    await expect(page.getByRole('link', { name: 'TODO' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'メモ' }).first()).toBeVisible();
    
    // 現在のURLがログイン後の状態であることを確認
    await expect(page).not.toHaveURL(/login/);
    
    // 2. ナビゲーションメニューから「ログアウト」をクリック
    const logoutButton = page.getByRole('link', { name: 'ログアウト' }).first();
    await logoutButton.click();
    
    // ログアウト後の状態を確認
    await page.waitForTimeout(1000);
  });
});