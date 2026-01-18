import { test, expect } from '@playwright/test';

test.describe('ログイン機能 - 認証失敗', () => {
  test('無効な認証情報でログインに失敗する', async ({ page }) => {
    // 1. ログイン画面にアクセス
    await page.goto('/');
    
    // ログイン画面が表示されることを確認
    await expect(page.getByRole('textbox', { name: 'ユーザ名' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'パスワード' })).toBeVisible();
    
    // 2. 無効なユーザー名を入力
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('invaliduser');
    
    // 3. 無効なパスワードを入力
    await page.getByRole('textbox', { name: 'パスワード' }).fill('wrongpassword');
    
    // 4. 「ログイン」ボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();
    
    // 期待結果の検証
    // - エラーメッセージが表示される
    await expect(page.locator('text=ログインに失敗しました')).toBeVisible();
    
    // - ログイン画面にとどまる
    await expect(page).toHaveURL(/login|\/$/);
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // - 入力内容がクリアされない（ユーザー名は残る）
    await expect(page.locator('input[type="text"], input[name*="user"], input[placeholder*="ユーザー"]').first()).toHaveValue('invaliduser');
  });
});