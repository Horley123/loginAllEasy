import React from 'react';
import {Box, Text} from '@gluestack-ui/themed';
import Animated, {FadeIn} from 'react-native-reanimated';
import useThemeStore from '@/store/useThemeStore';

const messages = [
  'Ola, seja bem vindo',
  'Esse app foi desenvolvido para demonstrar as habilidades de Horley',
  'Se voce chgeou ate aqui quer dizer que o app deu certo :)',
  'Espero que tenha gostado da experiencia',
  'Se voce quiser saber mais sobre mim, entre em contato',
  'Ate a proxima',
];

export function Home() {
  const {theme} = useThemeStore();
  return (
    <Box
      px="$6"
      justifyContent="center"
      alignContent="center"
      flex={1}
      bg={theme.tokens.colors.backgroundLight900}>
      {messages.map((msg, index) => (
        <Animated.View
          key={index}
          entering={FadeIn.duration(1000).delay(index * 300)}>
          <Text
            fontSize="$lg"
            mb="$2"
            fontWeight={'bold'}
            color={theme.tokens.colors.white}>
            {msg}
          </Text>
        </Animated.View>
      ))}
    </Box>
  );
}
