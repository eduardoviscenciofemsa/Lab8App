export interface BatteryModuleType {
  getBatteryLevel(): Promise<number>;
  performHeavyTask(): Promise<number>;
}
