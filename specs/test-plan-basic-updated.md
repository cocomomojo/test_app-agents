# Basic粒度テスト計画（更新版）

## Application Overview

更新されたマニュアルを基に作成したbasic粒度のテスト計画です。正確なテストアカウント情報（testuser / Test1234!）を使用し、ログイン・TODO・メモ機能の基本操作と主要な画面遷移を検証する5本の軽量テストで構成されています。正常系を中心とした実用的なテストシナリオとなっています。

## Test Scenarios

### 1. ログイン機能

**Seed:** `tests/seed.spec.ts`

#### 1.1. 正常ログイン

**File:** `tests/login/login-success.spec.ts`

**Steps:**
  1. ログイン画面（http://localhost:5173）にアクセスする
  2. ユーザー名フィールドに「testuser」を入力する
  3. パスワードフィールドに「Test1234!」を入力する
  4. 「ログイン」ボタンをクリックする

**Expected Results:**
  - ログインが正常に完了し、ダッシュボードまたはトップページが表示される
  - ナビゲーションバーに「トップ」「TODO」「メモ」「ログアウト」のリンクが表示される

### 2. TODO機能

**Seed:** `tests/seed.spec.ts`

#### 2.1. TODO作成

**File:** `tests/todo/todo-create.spec.ts`

**Steps:**
  1. testuser / Test1234! でログインする
  2. ナビゲーションバーの「TODO」リンクをクリックする
  3. TODO入力フィールドに「会議の資料作成」を入力する
  4. 「追加」または「作成」ボタンをクリックする

**Expected Results:**
  - 新しいTODO「会議の資料作成」がリストに表示される
  - TODOが未完了状態で表示される

#### 2.2. TODO完了

**File:** `tests/todo/todo-complete.spec.ts`

**Steps:**
  1. testuser / Test1234! でログインする
  2. TODOページで既存のTODOアイテムを確認する
  3. 対象TODOの「完了」チェックボックスまたはボタンをクリックする

**Expected Results:**
  - TODOが完了状態に変更される
  - 完了されたTODOは視覚的に区別される（取り消し線、色変更など）

### 3. メモ機能

**Seed:** `tests/seed.spec.ts`

#### 3.1. メモ作成

**File:** `tests/memo/memo-create.spec.ts`

**Steps:**
  1. testuser / Test1234! でログインする
  2. ナビゲーションバーの「メモ」リンクをクリックする
  3. メモ作成フィールドに「プロジェクトの進捗についてのメモ」を入力する
  4. 「保存」または「作成」ボタンをクリックする

**Expected Results:**
  - 新しいメモが正常に作成される
  - 作成されたメモがメモリストに表示される

### 4. ナビゲーション機能

**Seed:** `tests/seed.spec.ts`

#### 4.1. 基本ナビゲーション

**File:** `tests/navigation/basic-navigation.spec.ts`

**Steps:**
  1. testuser / Test1234! でログインする
  2. 「TODO」リンクをクリックしてTODOページに移動する
  3. 「メモ」リンクをクリックしてメモページに移動する
  4. 「トップ」リンクをクリックしてトップページに戻る
  5. 「ログアウト」リンクをクリックする

**Expected Results:**
  - 各ページへの遷移が正常に動作する
  - 各ページで適切な機能が表示される
  - ログアウト後はログイン画面に戻る
