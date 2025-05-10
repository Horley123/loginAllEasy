import React, {useEffect} from 'react';
import {Toast, ToastDescription, useToast} from '@gluestack-ui/themed';
import {useError} from '@/hooks/appError';

const TooltipeError = () => {
  const {tooltipeError, hideTooltipeError} = useError();
  const toast = useToast();

  useEffect(() => {
    if (tooltipeError.visible) {
      toast.show({
        id: Math.random().toString(),
        placement: 'top',
        duration: 3000,
        render: ({id}: {id: string}) => (
          <Toast
            nativeID={id}
            action="error"
            variant="solid"
            bg="$red600"
            px="$4"
            py="$3"
            borderRadius="$md">
            <ToastDescription color="$white">
              {tooltipeError.message}
            </ToastDescription>
          </Toast>
        ),
      });

      setTimeout(() => {
        hideTooltipeError();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipeError]);

  return null;
};

export default TooltipeError;
