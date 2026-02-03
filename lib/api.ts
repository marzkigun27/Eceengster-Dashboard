const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface SensorReading {
    _time: string;
    temperature?: number;
    humidity?: number;
    ph?: number;
    methane?: number;
    gas?: number;  // Backend returns 'gas' field for methane sensor (MQ-4)
    device?: string;
    device_id?: string;
}

export interface HistoryResponse {
    success: boolean;
    count: number;
    data: SensorReading[];
}

/**
 * Fetch the latest sensor data
 */
export async function fetchLatestData(): Promise<SensorReading[]> {
    const response = await fetch(`${API_URL}/latest`);
    if (!response.ok) {
        throw new Error('Failed to fetch latest data');
    }
    return response.json();
}

/**
 * Fetch historical sensor data
 * @param range - Time range string (e.g., '-1h', '-24h', '-7d', '-30d')
 */
export async function fetchHistoryData(range: string = '-24h'): Promise<SensorReading[]> {
    const response = await fetch(`${API_URL}/history?range=${encodeURIComponent(range)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch history data');
    }
    const result: HistoryResponse = await response.json();
    return result.data;
}

/**
 * Convert time range button label to API range format
 */
export function rangeToApiFormat(view: string): string {
    switch (view) {
        case '1h': return '-1h';
        case '24h': return '-24h';
        case '7d': return '-7d';
        case '30d': return '-30d';
        default: return '-24h';
    }
}
