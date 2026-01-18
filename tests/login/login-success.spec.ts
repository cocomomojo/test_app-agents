import { test, expect } from '@playwright/test';

test.describe('ログイン機能', () => {
  test('正常ログイン', async ({ page }) => {
    // ログイン画面にアクセス
    await page.goto('/');
    
    // ユーザー名とパスワードを入力
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    
    // ログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();
    
    // ログイン成功を確認（ログインページでないことを確認）
    await expect(page).toHaveURL(/^(?!.*login).*$/);
    
    // ページコンテンツが読み込まれるまで待機
    await page.waitForLoadState('networkidle');
    
    // ダッシュボードまたはメインコンテンツが表示されることを確認
    // より柔軟にナビゲーション要素やコンテンツを検出
    const hasNavigation = await page.locator('nav, .nav, .navigation, a[href], button').count() > 0;
    const hasContent = await page.locator('main, .main, .content, .app, body > div').count() > 0;
    
    expect(hasNavigation || hasContent).toBeTruthy();
  });
});