// message.ts
export type MessageType =
  | "error.invalidToken"
  | "error.tokenExpired"
  | "error.unauthorizedAccess"
  | "connection.disconnected"
  | "connection.reconnected"
  | "connection.serverTimeout"
  | "status.userJoined"
  | "status.userLeft"
  | "status.roomCreated"
  | "chat.messageSent"
  | "chat.messageReceived";

export interface ChatEvent {
  timestamp: string
  text: string
  type: MessageType
  system?: boolean
}