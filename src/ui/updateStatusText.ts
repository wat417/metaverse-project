/**
 * プレイヤー名・絵文字・ステータスを元に、UI表示を更新する処理
 * UI構成に応じて DOM や仮想表示の更新を行う
 */
export function updateStatusText(name: string, emoji: string, status: string): void {
  const label = document.getElementById("player-status-label");
  if (label) {
    label.innerText = `${name}${emoji ?? ""} : ${status}`;
  }
}