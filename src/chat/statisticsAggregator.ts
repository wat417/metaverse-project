import { ChatSessionData } from './sessionTypes';
import { AggregatedStatistics } from './statisticsTypes';

export function aggregateStatistics(sessions: ChatSessionData[]): AggregatedStatistics {
  const totalSessions = sessions.length;
  const totalMessages = sessions.reduce((acc, session) => acc + session.messages.length, 0);
  const activeUserCount = new Set(sessions.map(s => s.userId)).size;

  return {
    totalSessions,
    totalMessages,
    activeUserCount,
  };
}