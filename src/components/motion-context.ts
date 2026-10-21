import { createContext, useContext } from 'react';

export const MotionContext = createContext({ paused: false, toggle: () => {} });
export const useMotionSettings = () => useContext(MotionContext);
