export type EnvironmentOptionsType = keyof typeof EnvironmentOptionsEnum;
export const EnvironmentOptionsEnum = {
  SANDBOX: 'SADNBOX',
  PROD: 'PROD',
} as const;
