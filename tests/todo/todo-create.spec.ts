import { test, expect } from '@playwright/test';

test.describe('TODO作成機能', () => {
  test.beforeEach(async ({ page }) => {
    // ログイン処理
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ユーザ名' }).fill('testuser');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Test1234!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveURL(/^(?!.*login).*$/);
  });

  test('TODO作成', async ({ page }) => {
    // TODOページに移動
    await page.getByRole('link', { name: 'TODO', exact: true }).first().click();
    
    // TODO入力フィールドに入力
    await page.getByRole('textbox', { name: '新しい TODO を入力' }).fill('会議の資料作成');
    
    // 追加ボタンをクリック
    await page.getByRole('button', { name: '追加' }).click();
    
    // TODO追加を確認
    await expect(page.getByRole('listitem').filter({ hasText: '会議の資料作成' }).first()).toBeVisible();
    
    // TODOが未完了状態で表示されることを確認
    const todoItem = page.getByRole('listitem').filter({ hasText: '会議の資料作成' }).first();
    await expect(todoItem).toBeVisible();
    
    // 完了チェックボックスが未チェックであることを確認
    const checkbox = todoItem.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
  });
});