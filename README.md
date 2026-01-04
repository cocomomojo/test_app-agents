# Playwright Test Agents リポジトリ

Playwright Test Agents は、アプリのコードやマニュアルを入力として **テスト設計 → テスト実装 → テスト修正** を自動で行う仕組みです。手動で E2E テストを書く必要はありません。3 つのエージェント（Planner / Generator / Healer）がテストを生成し、失敗時は自動修正まで行います。

## 期待する運用イメージ
- **入力**: テスト対象のアプリコード、仕様/マニュアル（`specs/` などに置く）、必要な環境変数や資格情報。
- **自動化**: Planner が計画を作り、Generator がテストコードを生成し、Healer が失敗を自動修正。
- **人手の最小化**: テストケースの手書きや実装は不要。必要なのはアプリの実行環境と参照情報を与えることだけ。

## このリポジトリに含まれるもの
- `playwright.config.ts`: Playwright 設定。`PLAYWRIGHT_BASE_URL` などの環境変数で対象アプリを指定。
- `tests/`: 生成されたテストが置かれる場所。`seed.spec.ts` はプレースホルダーのスモーク枠で、実装必須ではありません。
- `specs/`: Planner が出力するテスト計画（Markdown）。アプリのマニュアルや要件をここに置くと参照できます。
- `.github/workflows/playwright-agents-ci.yml`: CI でエージェントを実行し、アプリ起動→計画→生成→実行→レポート公開まで行うワークフロー。

## 最低限の準備（ローカル）
1) 依存関係をインストール: `npm ci`
2) テスト対象アプリを起動し、`PLAYWRIGHT_BASE_URL` でアクセス先を指定（例: `http://localhost:5173`）。
3) VS Code でエージェント初期化: `npx playwright init-agents --loop=vscode`
4) テスト実行: `npx playwright test`（必要に応じて `seed.spec.ts` だけ先に回してもOK）

## CI の動き（playwright-agents-ci.yml 概要）
- アプリリポジトリと本リポジトリをチェックアウト
- `npm ci` と Playwright ブラウザ導入
- Docker Compose でテスト対象アプリを起動し、ヘルスチェック
- エージェント初期化 (`npx playwright init-agents --loop=vscode`)
- Planner/Generator/Healer によりテスト生成と実行 (`npx playwright test`)
- Allure レポートを GitHub Pages に公開（main ブランチ時）

## よくある質問
- **Q. 手動でテストを書かなくていいの？**  
  A. 基本不要です。アプリコードとマニュアルを入力すれば、エージェントが計画・生成・修正を担当します。スモーク用の `seed.spec.ts` は空でも構いません。
- **Q. 追加で人がやるべきことは？**  
  A. 対象アプリを起動できること、必要な環境変数・認証情報を渡すこと、仕様書/マニュアルを `specs/` などに置くことです。
- **Q. 既存テストを混ぜてもよい？**  
  A. 可能です。`tests/` に手書きテストを置いても、生成テストと共存できます。

## メモ
- `PLAYWRIGHT_BASE_URL` を CI/ローカルで適切に設定してください。
- エージェント定義は `npx playwright init-agents --loop=vscode` で自動生成されます（既存生成物は `.github/agents/` 配下に置かれます）。

### ワークフローの特徴

| ステップ | 説明 | エージェント |
|---------|------|------------|
| **1-6** | 環境セットアップ・アプリ起動 | - |
| **7** | Playwright Agents 初期化 | - |
| **8** | Seed Test 実行 | - |
| **9** | テスト計画生成 | 🎭 Planner |
| **10** | テストコード生成 | 🎭 Generator |
| **11** | テスト実行 | - |
| **12** | 失敗テスト自動修正 | 🎭 Healer |
| **13-15** | レポート生成・公開 | - |
