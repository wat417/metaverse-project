# 📋 Copilot × 2Dメタバース開発計画（議事録 & スケジュール）

**作成日**：2025年6月28日  
**目的**：GitHub Copilot + VSCodeを使い、20人程度が参加可能な2Dメタバース風Webアプリを個人で開発する

---

## 🧱 技術構成（想定）

| 要素         | 採用技術・ツール例 |
|--------------|-------------------|
| フロントエンド | HTML / CSS / JavaScript（＋Phaser.js） |
| コーディング支援 | GitHub Copilot（VSCode拡張） |
| リアルタイム通信 | Firebase Realtime Database（無料枠活用） |
| サーバーレス機能 | 必要に応じて Firebase Functions or Supabase |
| ホスティング | GitHub Pages or Vercel（静的サイト） |
| コンテナ環境 | Docker（後半に導入予定） |

---

## 🎯 全体目標とコンセプト

- できるだけ無料の範囲で実装
- 初心者レベルの技術スタックで構築可能な内容に限定
- アバター移動／リアルタイムチャット／アバターの位置同期を中心とした「軽量メタバース体験」

---

## 🧮 想定コスト（すべて無料範囲内で試行）

| 項目 | 内容 | 想定コスト |
|------|------|------------|
| GitHub Copilot | Proは有料だが体験版や無料トライアルあり | ¥0〜¥1,500/月（任意） |
| Firebase | 無料枠で20人同時程度までは問題なし | ¥0 |
| Docker | Docker Desktopは個人用途で無料 | ¥0 |
| その他ツール | VSCode、GitHub、Vercel など | 全て無料 |

---

## ⏱️ 総工数目安

- 学習＋開発：**115〜205時間**
- 1日1〜2時間ペース → **1〜2ヶ月程度で完走可能**

---

## 🗓️ スケジュール計画（ガントチャート形式）

| フェーズ / 週                           | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 |
|----------------------------------------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 🧠 HTML/CSS/JS基礎の学習               | ■  | ■  |     |     |     |     |     |     |
| 🧪 Copilot / VSCode活用スキル習得      | ■  | ■  |     |     |     |     |     |     |
| 🎮 Phaser.js（2D描画）でUI試作         |     | ■  | ■  |     |     |     |     |     |
| 💬 チャット/アバター同期の設計・試作   |     |     | ■  | ■  |     |     |     |     |
| 🔌 Firebase連携（同期/チャット）       |     |     |     | ■  | ■  |     |     |     |
| 🐳 Docker基礎・導入                     |     |     |     |     | ■  | ■  |     |     |
| 🧱 Dockerfile作成 & コンテナビルド     |     |     |     |     |     | ■  |     |     |
| 🔧 テスト・バグ修正                     |     |     |     |     |     |     | ■  |     |
| 🚀 公開（GitHub Pages / Vercel）       |     |     |     |     |     |     | ■  |     |
| 📦 最終調整・改善                       |     |     |     |     |     |     |     | ■  |

---

## 🐳 Docker導入フェーズ

- **Week 5**：Docker Desktop インストール、コンセプト理解
- **Week 6**：Dockerfile作成、ビルド＆アプリ起動確認
- 将来的に docker-compose や Firebase Emulator を導入予定

### Dockerfile 雛形（Node.js想定）

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]