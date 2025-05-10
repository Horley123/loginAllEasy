import React from 'react';
import {Box} from '@gluestack-ui/themed';
import {Dimensions} from 'react-native';
import {useError} from '@/hooks/appError';

interface BackdropProps {
  text?: string;
  children?: React.ReactNode;
}

const {width, height} = Dimensions.get('window');

export const Backdrop: React.FC<BackdropProps> = () => {
  const {loading} = useError();

  if (!loading) {
    return null;
  }

  return (
    <Box
      testID="backdrop"
      position="absolute"
      top={0}
      left={0}
      width={width}
      height={height}
      bg="rgba(0, 0, 0, 0.4)"
      justifyContent="center"
      alignItems="center"
      zIndex={9999}
    />
  );
};
