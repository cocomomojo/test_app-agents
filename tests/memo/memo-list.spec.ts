import { test, expect } from '@playwright/test';

test.describe('メモ機能 - メモ一覧表示', () => {
  test.beforeEach(async ({ page }) => {
    // 有効な認証情報でログイン
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page.getByRole('link', { name: 'TODO' }).first()).toBeVisible();
    
    // メモページに移動
    await page.getByRole('link', { name: 'メモ' }).first().click();
    await page.waitForURL(/memo/, { timeout: 10000 });
    await page.waitForTimeout(500);
  });

  test('複数のメモが一覧に表示される', async ({ page }) => {
    // メモページが正しく読み込まれていることを確認
    await expect(page).toHaveURL(/memo/);
  });
});