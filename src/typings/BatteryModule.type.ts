export interface BatteryModuleType {
  getBatteryLevel(): Promise<number>;
}
