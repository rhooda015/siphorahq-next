'use client';

import React, { createContext, useContext } from 'react';

const NonceContext = createContext<string>('');

export const useNonce = () => useContext(NonceContext);

export default function NonceProvider({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce: string;
}) {
  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  );
}
