# Basic粒度テスト実行ガイド

## テストアカウント情報
- **ユーザーID**: `testuser`
- **パスワード**: `Test1234!`
- **ベースURL**: `http://localhost:5173`

## テスト実行コマンド

### 全てのテストを実行
```bash
npx playwright test
```

### 特定の機能のテストのみ実行
```bash
# ログイン機能テスト
npx playwright test tests/login/

# TODO機能テスト
npx playwright test tests/todo/

# メモ機能テスト
npx playwright test tests/memo/

# ナビゲーション機能テスト
npx playwright test tests/navigation/
```

### 個別テストファイルの実行
```bash
# ログイン成功テスト
npx playwright test tests/login/login-success.spec.ts

# TODO作成テスト
npx playwright test tests/todo/todo-create.spec.ts

# TODO完了テスト
npx playwright test tests/todo/todo-complete.spec.ts

# メモ作成テスト
npx playwright test tests/memo/memo-create.spec.ts

# メモ一覧テスト
npx playwright test tests/memo/memo-list.spec.ts

# 基本ナビゲーションテスト
npx playwright test tests/navigation/basic-navigation.spec.ts

# ログアウトテスト
npx playwright test tests/navigation/logout.spec.ts
```

## 生成されたテスト一覧（Basic粒度 - 6本）

1. **ログイン成功テスト** (`tests/login/login-success.spec.ts`)
   - 有効な認証情報でのログイン成功を確認

2. **TODO作成テスト** (`tests/todo/todo-create.spec.ts`)
   - 新しいTODOの作成機能を確認

3. **TODO完了テスト** (`tests/todo/todo-complete.spec.ts`)
   - TODOの完了マーク機能を確認

4. **メモ作成テスト** (`tests/memo/memo-create.spec.ts`)
   - 新しいメモの作成機能を確認

5. **メモ一覧テスト** (`tests/memo/memo-list.spec.ts`)
   - 複数メモの作成と一覧表示機能を確認

6. **基本ナビゲーションテスト** (`tests/navigation/basic-navigation.spec.ts`)
   - 各ページ間のナビゲーション機能を確認

7. **ログアウトテスト** (`tests/navigation/logout.spec.ts`)
   - ログアウト機能とセッション終了を確認

## テストの特徴

- **柔軟なセレクター戦略**: 複数のセレクターパターンに対応
- **堅牢なアサーション**: 明確な期待結果の検証
- **適切な待機時間**: タイムアウト設定による信頼性の向上
- **再利用可能な認証**: beforeEachでの共通ログイン処理

## 注意事項

- テスト実行前にアプリケーションサーバー（http://localhost:5173）が起動していることを確認してください
- テストアカウント `testuser / Test1234!` が利用可能であることを確認してください
- 各テストは独立して実行可能ですが、アプリケーションの状態によっては順序実行が推奨されます