# 📅 Day 3：アバター描画・移動処理（Phaser.js基本導入）

## 🎯 作業の目的
- ユーザーごとのアバターを画面上に描画し、キーボード入力による移動を可能にする
- カメラ追従や境界制御によるUX強化の足場を構築する

## 🔧 実装タスク
- Phaser.jsの初期化とゲームシーンの定義
- アバタースプライトのロードと表示
- 矢印キー入力による移動処理の実装
- 移動時のアニメーション切り替え

## 💡 技術補足
- `Phaser.Scene` クラスを拡張し、主要ロジックを整理
- アセットはローカル or CDN 経由で一時導入

---

# 📅 Day 4：リアルタイム位置同期（Firebase RTDB連携）

## 🎯 作業の目的
- 自身のアバター状態をRTDBに送信し、他ユーザーの位置と同期する
- 多人数同時接続でも最低限の滑らかさを担保する同期制御を導入する

## 🔧 実装タスク
- ユーザーごとの `avatars{uid}` パスへの位置送信（定期またはイベント駆動）
- 他ユーザーの状態購読と描画反映（アバター生成・移動反映）
- 退室時の状態削除処理（`onDisconnect()` 利用）

## 💡 技術補足
- RTDB 書き込み頻度の制御（例：一定間隔 or 差分が閾値を超えたとき）
- 表示対象ユーザーのキャッシュ管理と再描画効率化

---

# 📅 Day 5：チャット機能の導入とUI統合

## 🎯 作業の目的
- 画面上にリアルタイムチャットUIを実装し、コミュニケーション基盤を提供する
- システムUI（ログイン・チャット・参加者名など）を整理し、SPAとして一体化を進める

## 🔧 実装タスク
- Firebase RTDB `chat` パスへの投稿と購読処理
- チャットメッセージ送信・表示のUI要素作成
- ログイン後画面にチャット／アバター表示を統合

## 💡 技術補足
- メッセージの最大表示数制御（過去ログは必要に応じて切り捨て）
- 匿名ユーザー識別の工夫（ニックネーム表示／色分けなど）

---
