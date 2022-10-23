import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const Linear = ({ children }: Props) => {
  return (
    // Within your render function
    <LinearGradient colors={['red', 'black']}>{children}</LinearGradient>
  );
};
