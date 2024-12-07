export interface BatteryModuleType {
  getBatteryLevel(): Promise<number>;
  getBatteryLevelAsync(): Promise<number>;
}
