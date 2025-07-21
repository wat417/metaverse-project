import { onToast } from "../utils/eventBus";
import { getNotificationText } from "../utils/getNotificationText";
import { MessageType } from "../types/message";

const isValidMessageType = (key: string): key is MessageType => {
  return [
    "error.invalidToken",
    "error.tokenExpired",
    "error.unauthorizedAccess",
    "connection.disconnected",
    "connection.reconnected",
    "connection.serverTimeout",
    "status.userJoined",
    "status.userLeft",
    "status.roomCreated",
    "chat.messageSent",
    "chat.messageReceived"
  ].includes(key);
};

onToast(({ messageKey }) => {
  const message = isValidMessageType(messageKey)
    ? getNotificationText(messageKey)
    : "未定義メッセージ";

  showToast(message);
});

export const showToast = (message: string) => {
  console.log("[Toast]", message);
};