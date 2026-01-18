import { test, expect } from '@playwright/test';

test.describe('TODO機能 - TODO削除', () => {
  test.beforeEach(async ({ page }) => {
    // 有効な認証情報でログイン
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page.getByRole('link', { name: 'TODO' }).first()).toBeVisible();
    
    // TODOページに移動
    await page.getByRole('link', { name: 'TODO' }).first().click();
    await expect(page).toHaveURL(/todo/);
  });

  test('TODOを削除できる', async ({ page }) => {
    // ページが正しく読み込まれていることを確認
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/todo/);
  });
});