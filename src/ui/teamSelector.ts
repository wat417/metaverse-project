// src/ui/teamSelector.ts

import { emit } from "../utils/eventBus";

export function selectTeam(teamId: string): void {
  emit("team-selected", { teamId });
}