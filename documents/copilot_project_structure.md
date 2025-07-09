# 📄 資料全文出力：`copilot_project_structure.md`

## 📂 metaverse-project ファイル構成参照ベース  
**最終更新日：2025-07-08（Step50 反映済）**

---

## ✅ 実装済ファイル一覧

| ファイルパス                     | 内容・責務                         | 実装状況・備考                                 |
|----------------------------------|------------------------------------|------------------------------------------------|
| src/main.ts                      | エントリポイント／Phaser初期化     | 初期化／Scene起動まで完了                     |
| src/scenes/MainScene.ts          | プレイヤー描画・同期処理／主Scene  | playerLabels 登録済（2025-07-04）             |
| src/scenes/statusDisplay.ts      | ステータス表示UI・イベント通知     | Emit対応済：クリック履歴記録あり             |
| src/ui/groupControl.ts           | グループ選択UI・イベント発火       | `"groupSelectStatus"` イベント発火あり        |
| src/log/eventLogger.ts           | イベント記録定義・記録処理         | RTDBスキーマに従い記録（2025-07-06）         |
| src/log/rtdbAdapter.ts           | Firebase書込ラッパー               | `.set()` 封装／内部ユーティリティ構成        |
| src/utils/eventBus.ts            | 独自イベント通知（on/emit定義）     | UI↔Logger間の通知制御に使用中                |
| src/firebase/init.ts             | Firebase初期化処理                  | export済／環境初期化構成                      |
| src/firebase/publish.ts          | 自プレイヤー座標送信処理           | `.set()` による書込構成                       |
| src/firebase/listen.ts           | 他プレイヤー座標受信・描画通知処理 | `onValue()` による同期描画（2025-07-04 実装）|
| src/firebase/remove.ts           | 離脱プレイヤー削除監視処理         | playerLabels 削除処理と整合（2025-07-04）     |
| src/config/config.ts             | 統合定数管理構成                   | UIサイズ・描画定数などをScene群から参照中     |

---

## 🚧 未着手・予定ファイル構成

| 想定パス                    | 内容予定                          | 優先度／ステータス                 |
|-----------------------------|-----------------------------------|------------------------------------|
| src/utils/playerMap.ts      | Sprite参照マッピング処理          | 構成整理中／中優先度              |
| src/game/config.ts          | 共通画面設定などの汎用定数定義    | 後回し予定／状況に応じて汎用化    |
| src/ui/SceneUIHelper.ts     | UI描画補助群（描画制御責務分離）  | Step51 にて起草予定               |

---

## ❌ 削除・統合済ファイル履歴

| 旧パス                     | 対応内容     | 備考                                         |
|----------------------------|--------------|----------------------------------------------|
| src/firebase/sample.ts     | 削除済       | 機能整理のため削除（2025-06-28）             |
| src/config/constants.ts    | 削除予定     | Step50 にて未参照化／`config.ts` に統合済    |

---

## 🔧 Step50構成反映補足

- `constants.ts` は未参照状態が確認され、構成上の削除対象として明記  
- 定数管理は `config.ts` に統合し、**UI／Scene／API構成での責務分離原則を確立**  
- `MainScene.ts` 側にて `renderStatusLabel()` 補助関数との接続計画を反映済  
- `SceneUIHelper.ts` は Step51 にて UI描画責務の整理・統合試験として新規構成予定

---

## 📎 運用構成補足

- 本資料は Copilot 構成認識の同期ベースとして常時参照される  
- 内容更新時は `日次作業記録_20250708.md` にて整合記録が行われている  
- **記録内容に乖離があれば、常に実ファイル内容を優先して履歴修正すること**

---