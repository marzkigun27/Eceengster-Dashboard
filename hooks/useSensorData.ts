'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchLatestData, fetchHistoryData, rangeToApiFormat, type SensorReading } from '../lib/api';
import { useSocket } from './useSocket';
import type { SensorData, Alert } from '../types';

interface UseSensorDataReturn {
    currentData: SensorData | null;
    dataHistory: SensorData[];
    alerts: Alert[];
    isLoading: boolean;
    error: string | null;
    isConnected: boolean;
    selectedRange: string;
    setSelectedRange: (range: string) => void;
    refetch: () => void;
}

/**
 * Transform API sensor reading to dashboard SensorData format
 */
function transformReading(reading: SensorReading): SensorData {
    const time = new Date(reading._time);

    // The gas sensor returns raw ppm values (e.g., 1098.8)
    // Convert to percentage: assuming max gas reading of ~2000 ppm = 100%
    // Adjust the divisor based on your sensor's actual range
    const gasValue = reading.gas ?? reading.methane ?? 0;
    const methanePercent = Math.min(100, (gasValue / 2000) * 100);

    return {
        timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: reading.temperature ?? 0,
        humidity: reading.humidity ?? 0,
        ph: reading.ph ?? 0,
        methane: methanePercent,
    };
}

export function useSensorData(): UseSensorDataReturn {
    const [currentData, setCurrentData] = useState<SensorData | null>(null);
    const [dataHistory, setDataHistory] = useState<SensorData[]>([]);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRange, setSelectedRange] = useState('1h');
    const [isConnected, setIsConnected] = useState(false);

    const addAlert = useCallback((type: 'info' | 'warning' | 'critical', message: string) => {
        const newAlert: Alert = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            message,
            timestamp: new Date(),
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
    }, []);

    const checkAlerts = useCallback((data: SensorData) => {
        if (data.methane > 85) {
            addAlert('critical', 'Dangerously high methane level detected!');
        } else if (data.temperature > 40 || data.temperature < 26) {
            addAlert('warning', 'Digester temperature outside optimal range.');
        }
    }, [addAlert]);

    // Handle incoming real-time sensor data
    const handleSensorData = useCallback((reading: SensorReading) => {
        const transformed = transformReading(reading);
        setCurrentData(transformed);
        setDataHistory(prev => {
            const next = [...prev, transformed];
            return next.slice(-20); // Keep last 20 readings
        });
        checkAlerts(transformed);
    }, [checkAlerts]);

    // Socket connection
    const { isConnected: socketConnected } = useSocket({
        onSensorData: handleSensorData,
        onConnect: () => setIsConnected(true),
        onDisconnect: () => setIsConnected(false),
    });

    // Fetch data function
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch latest data
            const latestData = await fetchLatestData();
            console.log('API Response (latest):', latestData); // Debug: check actual field names
            if (latestData.length > 0) {
                const latest = transformReading(latestData[0]);
                setCurrentData(latest);
            }

            // Fetch history based on selected range
            const apiRange = rangeToApiFormat(selectedRange);
            const historyData = await fetchHistoryData(apiRange);
            const transformedHistory = historyData.map(transformReading);
            setDataHistory(transformedHistory.slice(-20)); // Keep last 20 for display
        } catch (err) {
            console.error('Failed to fetch sensor data:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    }, [selectedRange]);

    // Initial fetch and refetch on range change
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Polling fallback: fetch latest data every 5 seconds to ensure real-time updates
    useEffect(() => {
        const pollLatestData = async () => {
            try {
                const latestData = await fetchLatestData();
                if (latestData.length > 0) {
                    const latest = transformReading(latestData[0]);
                    setCurrentData(latest);
                    setDataHistory(prev => {
                        // Only add if different from the last entry
                        const lastEntry = prev[prev.length - 1];
                        if (lastEntry && lastEntry.timestamp === latest.timestamp) {
                            return prev;
                        }
                        const next = [...prev, latest];
                        return next.slice(-20); // Keep last 20 readings
                    });
                    checkAlerts(latest);
                }
            } catch (err) {
                console.error('Polling error:', err);
            }
        };

        const intervalId = setInterval(pollLatestData, 5000); // Poll every 5 seconds
        return () => clearInterval(intervalId);
    }, [checkAlerts]);

    return {
        currentData,
        dataHistory,
        alerts,
        isLoading,
        error,
        isConnected: socketConnected,
        selectedRange,
        setSelectedRange,
        refetch: fetchData,
    };
}
