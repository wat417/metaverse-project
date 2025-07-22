// src/types/i18nTypes.ts

export interface NotificationMessageCategory {
  [key: string]: string;
}

export interface NotificationMessages {
  [lang: string]: {
    [category: string]: NotificationMessageCategory;
  };
}