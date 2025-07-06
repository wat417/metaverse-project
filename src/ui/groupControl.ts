// src/ui/groupControl.ts

import { emit } from "../utils/eventBus";

/**
 * グループ操作UIコンポーネントを生成
 */
export function createGroupControl(): void {
  const container = document.createElement("div");
  container.id = "group-control-panel";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.backgroundColor = "#333";
  container.style.padding = "8px";
  container.style.border = "1px solid #ccc";
  container.style.zIndex = "200";

  const label = document.createElement("label");
  label.innerText = "👥 Group Action:";
  label.style.color = "#fff";
  label.style.marginRight = "8px";

  const button = document.createElement("button");
  button.innerText = "Select Active";
  button.style.padding = "4px";

  button.addEventListener("click", () => {
    emit("groupSelectStatus", "active");
  });

  container.appendChild(label);
  container.appendChild(button);
  document.body.appendChild(container);
}