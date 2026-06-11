'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BRAND as DEFAULT_BRAND } from '@/config/brand';

type SettingsContextType = {
  shippingCost: number;
  freeShippingThreshold: number;
};

const SettingsContext = createContext<SettingsContextType>({
  shippingCost: DEFAULT_BRAND.shippingCost,
  freeShippingThreshold: DEFAULT_BRAND.freeShippingThreshold,
});

export const useStoreSettings = () => useContext(SettingsContext);

export default function SettingsProvider({ 
  children, 
  initialSettings 
}: { 
  children: React.ReactNode; 
  initialSettings: any;
}) {
  const [settings, setSettings] = useState<SettingsContextType>({
    shippingCost: initialSettings?.flatShippingRate ?? DEFAULT_BRAND.shippingCost,
    freeShippingThreshold: initialSettings?.freeShippingThreshold ?? DEFAULT_BRAND.freeShippingThreshold,
  });

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
