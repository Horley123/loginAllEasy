import React, {useCallback, forwardRef} from 'react';
import {TextInputProps} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Box,
  Input as InputGluestack,
  InputField,
  Text,
  Heading,
  InputSlot,
  InputIcon,
} from '@gluestack-ui/themed';
import {useError} from '@/hooks/appError';
import useThemeStore from '@/store/useThemeStore';

interface InputProps extends TextInputProps {
  error?: string;
  icon?: string;
  isReadOnly?: boolean;
  editable?: boolean;
  rightIcon?: string;
  type?: 'text' | 'password';
  mt?: number;
  onRightIconPress?(): void;
  label?: string;
  placeholder?: string;
  onText(value: string): void;
  variant?: 'rounded' | 'outline' | 'underlined';
  secureTextEntry?: boolean;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    mt,
    type = 'text',
    placeholder,
    rightIcon,
    isReadOnly,
    error,
    label,
    onText,
    variant,
    editable,
    value,
    secureTextEntry,
    ...rest
  },
  ref,
) => {
  const [secure, setSecure] = React.useState(true);
  const {theme} = useThemeStore();

  const {loading} = useError();
  const catchError = useCallback(() => {
    if (error) {
      return (
        <Text mt="$2" ml={'$2'} color={theme.tokens.colors.red500}>
          {error}
        </Text>
      );
    }
    return undefined;
  }, [error, theme.tokens.colors.red500]);

  return (
    <Box mt={mt}>
      {label && (
        <Heading ml="$3" fontSize={15} fontWeight="$bold">
          {label}
        </Heading>
      )}
      <InputGluestack
        {...rest}
        ref={ref as any}
        height={50}
        variant={variant}
        isDisabled={editable || loading}
        isReadOnly={isReadOnly || loading}
        pl={5}
        pr={5}
        borderRadius={12}
        isInvalid={error?.length ? true : false}
        backgroundColor={
          error?.length
            ? theme.tokens.colors.red100
            : theme.tokens.colors.coolGray100
        }
        softShadow="4">
        <InputField
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          placeholder={placeholder || ''}
          type={type}
          fontSize={17}
          value={value}
          onChangeText={(newValue: string) => onText(newValue)}
          secureTextEntry={secure}
        />
        {secureTextEntry && (
          <InputSlot pr="$3" onPress={() => {}}>
            <FontAwesome
              size={20}
              name={secure ? 'eye' : 'eye-slash'}
              onPress={() => setSecure(e => !e)}
            />
          </InputSlot>
        )}
      </InputGluestack>
      {catchError()}
    </Box>
  );
};

export default forwardRef(Input);
