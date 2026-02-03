'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { SensorReading } from '../lib/api';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';

interface UseSocketOptions {
    onSensorData?: (data: SensorReading) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

export function useSocket(options: UseSocketOptions = {}) {
    const socketRef = useRef<Socket | null>(null);

    // Store callbacks in refs to avoid re-creating connect function on every render
    const callbacksRef = useRef(options);

    // Update refs when callbacks change
    useEffect(() => {
        callbacksRef.current = options;
    }, [options]);

    const connect = useCallback(() => {
        if (socketRef.current?.connected) return;

        socketRef.current = io(WS_URL, {
            transports: ['websocket', 'polling'],
        });

        socketRef.current.on('connect', () => {
            console.log('🔌 Connected to WebSocket');
            callbacksRef.current.onConnect?.();
        });

        socketRef.current.on('disconnect', () => {
            console.log('❌ Disconnected from WebSocket');
            callbacksRef.current.onDisconnect?.();
        });

        // Listen for sensor data updates
        // The backend might emit different event names, common ones:
        socketRef.current.on('sensor-data', (data: SensorReading) => {
            callbacksRef.current.onSensorData?.(data);
        });

        socketRef.current.on('sensor-update', (data: SensorReading) => {
            callbacksRef.current.onSensorData?.(data);
        });

        socketRef.current.on('data', (data: SensorReading) => {
            callbacksRef.current.onSensorData?.(data);
        });
    }, []); // No dependencies - stable function

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount/unmount

    return {
        socket: socketRef.current,
        isConnected: socketRef.current?.connected ?? false,
        connect,
        disconnect,
    };
}
