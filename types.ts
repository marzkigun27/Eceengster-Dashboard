
export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  ph: number;
  methane: number;
}

export type StatusLevel = 'normal' | 'warning' | 'critical' | 'low' | 'high';

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
}
