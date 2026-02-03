'use client';

import React from 'react';
import { Thermometer, Droplets, Beaker, Zap } from 'lucide-react';

export const COLORS = {
  primary: '#1F6F5C',
  secondary: '#7ED6C1',
  accent_energy: '#F2C94C',
  danger: '#E63946',
  warning: '#F4A261',
  text_primary: '#1E2A32',
  background: '#F7F4E9',
};

export const CONFIG = {
  temperature: {
    label: 'Temperature',
    unit: '°C',
    icon: <Thermometer className="w-5 h-5" />,
    normal: [30, 38],
    warning: [25, 42],
  },
  humidity: {
    label: 'Humidity',
    unit: '%',
    icon: <Droplets className="w-5 h-5" />,
  },
  ph: {
    label: 'pH Level',
    unit: 'pH',
    icon: <Beaker className="w-5 h-5" />,
    normal: [6.8, 7.5],
  },
  methane: {
    label: 'Methane',
    unit: '%',
    icon: <Zap className="w-5 h-5" />,
    normal: [55, 70],
    high: [71, 85],
    critical: [86, 100],
  }
};
