import React, { createContext, useContext, ReactNode } from 'react';
import Poply from '../../core/Poply';

const PoplyContext = createContext(Poply);

export const PoplyProvider = ({ children }: { children: ReactNode }) => (
    <PoplyContext.Provider value={Poply}>
        {children}
    </PoplyContext.Provider>
);

export const usePoply = () => useContext(PoplyContext);
