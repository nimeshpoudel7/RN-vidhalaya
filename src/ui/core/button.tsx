import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ActivityIndicator } from './activity-indicator';
import { Text } from './text';
import { TouchableOpacity } from './touchable-opacity';

type Variant = {
  container: string;
  label: string;
  indicator: string;
};
type VariantName = 'defaults' | 'primary' | 'outline' | 'secondary';
type BVariant = {
  [key in VariantName]: Variant;
};

export const buttonVariants: BVariant = {
  defaults: {
    container:
      'flex-row items-center justify-center rounded-full px-12 py-3 my-2',
    label: 'text-[16px] font-medium text-white',
    indicator: 'text-white h-[30px]',
  },
  primary: {
    container: 'bg-black',
    label: '',
    indicator: 'text-white',
  },
  secondary: {
    container: 'bg-primary-600',
    label: 'text-secondary-600',
    indicator: 'text-white',
  },
  outline: {
    container: 'border border-neutral-400',
    label: 'text-black',
    indicator: 'text-black',
  },
};

interface Props extends TouchableOpacityProps {
  variant?: VariantName;
  label?: string;
  loading?: boolean;
  isLinearButton?: boolean;
}

export const Button = ({
  label,
  loading = false,
  variant = 'primary',
  disabled = false,
  isLinearButton = false,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      className={
        !isLinearButton
          ? `
    ${buttonVariants.defaults.container}
     ${buttonVariants[variant].container}
     ${disabled ? 'opacity-50' : ''}
    `
          : ''
      }
    >
      {isLinearButton ? (
        <LinearGradient
          colors={['#888BF4', '#5151C6']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          className={`
                    ${buttonVariants.defaults.indicator}

                    `}
          style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              className={`
          ${buttonVariants.defaults.indicator}
           ${buttonVariants[variant].indicator}
          `}
            />
          ) : (
            <Text
              className={`
          ${buttonVariants.defaults.label}
           ${buttonVariants[variant].label}
          `}
            >
              {label}
            </Text>
          )}
        </LinearGradient>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator
              size="small"
              className={`
          ${buttonVariants.defaults.indicator}
           ${buttonVariants[variant].indicator}
          `}
            />
          ) : (
            <Text
              className={`
          ${buttonVariants.defaults.label}
           ${buttonVariants[variant].label}
          `}
            >
              {label}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
