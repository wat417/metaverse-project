type PublishSettings = {
  environment: 'production' | 'staging' | 'development';
  enableLogs: boolean;
  version: string;
  chartType: 'bar' | 'line' | 'pie' | 'default';
  deploySelectorGroup: boolean;
};

export const publishSettings: PublishSettings = {
  environment: 'production',
  enableLogs: true,
  version: '1.2.8',
  chartType: 'bar',
  deploySelectorGroup: true
};