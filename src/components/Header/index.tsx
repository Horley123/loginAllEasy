// Header.tsx
import React from 'react';
import {useAuth} from '@/hooks/useAuth';
import switchTheme from 'react-native-theme-switch-animation';
import {Box, Text, Icon} from '@gluestack-ui/themed';
import useThemeStore from '@/store/useThemeStore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  title: string;
};

export function Header({title}: Props) {
  const {signOut} = useAuth();
  const {theme, toggleTheme, isDarkMode} = useThemeStore();
  return (
    <Box
      w="100%"
      height={50}
      bg={theme.tokens.colors.blue100}
      justifyContent="space-between"
      px="$4"
      flexDirection="row"
      alignItems="center">
      <Text fontSize="$lg" fontWeight="bold" color={theme.tokens.colors.white}>
        {title}
      </Text>

      <Box flexDirection="row" alignItems="center" gap="$2">
        <FontAwesome
          size={20}
          name={isDarkMode ? 'moon-o' : 'sun-o'}
          color={theme.tokens.colors.white}
          onPress={() =>
            switchTheme({
              switchThemeFunction: () => {
                toggleTheme();
              },
              animationConfig: {
                type: 'fade',
                duration: 900,
              },
            })
          }
        />

        <Text color="$red600" onPress={signOut}>
          Sair
        </Text>
      </Box>
    </Box>
  );
}
