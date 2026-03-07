"use client"

import React, { forwardRef } from "react";
import Dice from "react-dice-roll";

// 1. Define the interface for the methods the Dice component provides
export interface DiceRef {
  roll: (value?: number) => void;
}

// 2. Define the component props (empty for now, or add custom ones)
interface DiceComponentProps {
  onRoll?: (value: number) => void;
  defaultValue?: 1 | 2 | 3 | 4 | 5 | 6;
}

const DiceComponent = forwardRef<DiceRef, DiceComponentProps>((props, ref) => {
  return (
    <div className="neo p-6 flex items-center justify-center">
      <Dice 
        {...props}
        size={120} 
      />
    </div>
  );
});

// 3. Set displayName for easier debugging in React DevTools
DiceComponent.displayName = "DiceComponent";

export default DiceComponent;