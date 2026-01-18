import { test, expect } from '@playwright/test';

test.describe('アプリケーション基本設定', () => {
  test('アプリケーションへの基本接続確認', async ({ page }) => {
    // アプリケーションのベースURLにアクセス
    await page.goto('/');
    
    // ページが正常に読み込まれることを確認
    await expect(page).toHaveURL(/localhost:5173/);
    
    // ログイン画面またはダッシュボードが表示されることを確認
    const loginForm = page.getByRole('textbox', { name: 'パスワード' });
    const dashboard = page.getByRole('link', { name: 'TODO' });
    
    // ログイン画面またはダッシュボードのいずれかが表示される
    const isLoginPage = await page.getByRole('textbox', { name: 'パスワード' }).isVisible();
    const isDashboard = await page.getByRole('link', { name: 'TODO' }).isVisible();
    
    // どちらかが表示されていることを確認
    expect(isLoginPage || isDashboard).toBe(true);
  });
});
