// src/ui/teamSelector.ts

import { emit } from "../utils/eventBus";

/**
 * チーム選択 UI を生成し、選択時に通知を発火
 */
export function createTeamSelector(teams: string[]): void {
  const container = document.createElement("div");
  container.id = "team-selector";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.left = "20px";
  container.style.backgroundColor = "#333";
  container.style.padding = "8px";
  container.style.border = "1px solid #ccc";
  container.style.zIndex = "200";

  const label = document.createElement("label");
  label.innerText = "📂 Team:";
  label.style.color = "#fff";
  label.style.marginRight = "8px";

  const select = document.createElement("select");
  select.style.padding = "4px";

  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.text = "All";
  select.appendChild(allOption);

  teams.forEach((team) => {
    const option = document.createElement("option");
    option.value = team;
    option.text = team;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selected = select.value || null;
    emit("teamFilterChanged", selected);
  });

  container.appendChild(label);
  container.appendChild(select);
  document.body.appendChild(container);
}