export interface NotificationMessageCategory {
  [key: string]: string;
}

export interface NotificationMessages {
  [lang: string]: {
    [category: string]: NotificationMessageCategory;
  };
}