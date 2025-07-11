// src/utils/botRegistry.ts
export type BotProfile = {
  id: string;
  name: string;
  replyHandler: (input: string) => Promise<string>;
};

export const botRegistry: Record<string, BotProfile> = {
  defaultBot: {
    id: 'defaultBot',
    name: 'Default Bot',
    replyHandler: async (input: string) => {
      return `Bot応答（Default）: ${input}`;
    },
  },
};