<!-- src/dev/mainTestPage.vue -->

<template>
  <div id="main-ui-container" style="width:100%; height:100vh;"></div>
  <ChatUI />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import { initPeerAvatarSync } from "../services/peerAvatarSync";
import ChatUI from "../ui/chat/chatUI.vue";

onMounted(() => {
  const container = document.querySelector("#main-ui-container");
  if (!container) {
    console.error("main-ui-container not found");
    return;
  }

  // Phaserゲーム初期化
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: container.clientWidth,
    height: container.clientHeight,
    parent: "main-ui-container",
    scene: MainScene,
    transparent: true
  };

  new Phaser.Game(config);

  // アバター同期初期化（WebSocket）
  const socket = new WebSocket("wss://example.com/socket"); // ← 実環境に応じて差し替え
  initPeerAvatarSync(socket);
});
</script>