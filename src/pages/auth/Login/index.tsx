import React from 'react';
import {NativeModules, Platform} from 'react-native';
import {
  Box,
  Button,
  Image,
  ImageBackground,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Logo from './../../../assets/logo.svg';
import Input from '@/components/Input';
import {background, iconLogo} from '@/assets';
import {useAuth} from '@/hooks/useAuth';
import {ILogin} from '@/dtos/login';
import {useError} from '@/hooks/appError';
import useThemeStore from '@/store/useThemeStore';
import {getManufacturer} from '@/NativeModules/android/DeviceInfo';

const schema = yup.object({
  email: yup
    .string()
    .email('Por favor, insira um email válido')
    .required('O email é obrigatório'),
  senha: yup
    .string()
    // .min(6, 'A senha deve ter pelo menos 6 caracteres')
    // .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    // .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    // .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    // .matches(/[\W_]/, 'A senha deve conter pelo menos um caractere especial')
    .required('A senha é obrigatória'),
});

interface IDeviceInfo {
  manufacturer: string;
  model: string;
  platform: string;
  sdkVersion: string;
}
export function Login() {
  const {theme, toggleTheme} = useThemeStore();

  const {loading} = useError();
  const {signIn} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [deviceInfo, setDeviceInfo] = React.useState<IDeviceInfo | null>();

  const Infor = async () => {
    if (Platform.OS === 'android') {
      NativeModules.MyDeviceInfoPackage.getDeviceInfo((deviceInfo: any) => {
        setDeviceInfo(JSON.parse(deviceInfo));
      });
    }

    if (Platform.OS === 'ios') {
      try {
        const result: {
          model: string;
          name: string;
          iosVersion: string;
        } = await NativeModules.MyDeviceInfo.getDeviceInfo();

        setDeviceInfo(e => ({
          ...e,

          sdkVersion: result.iosVersion,
          model: result.name,
          platform: result.name,
          manufacturer: result.name,
        }));
      } catch (error) {
        console.log('ios', error);
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      await Infor();
    })();
  }, []);

  const onSubmit = async (data: ILogin) => {
    console.log('onSubmit', {data});
    await signIn(data);
  };

  return (
    <ImageBackground px="$4" source={background} flex={1} resizeMode="stretch">
      <Box flex={1} justifyContent="flex-end" alignItems="center">
        <Box>
          <Image
            alt="Logo"
            source={iconLogo}
            width={59}
            height={59}
            position="absolute"
            top={-30}
            right={-50}
          />
          <Logo width={150} height={90} />
        </Box>
      </Box>
      <Box flex={2} justifyContent="center" gap={'$6'}>
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <Input
              label="Email"
              value={field.value}
              onText={field.onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="senha"
          render={({field}) => (
            <Input
              label="Senha"
              value={field.value}
              onText={field.onChange}
              error={errors.senha?.message}
              secureTextEntry
            />
          )}
        />
      </Box>

      <Box flex={1} justifyContent="flex-end" pb={'$6'}>
        <Box alignItems="center">
          {Platform.OS === 'android' && (
            <>
              <Text color={theme.tokens.colors.black}>
                Aparelho fabricado por: {deviceInfo?.manufacturer}
              </Text>
              <Text color={theme.tokens.colors.black}>
                Modelo: {deviceInfo?.model}
              </Text>
            </>
          )}
          {Platform.OS === 'ios' && (
            <>
              <Text color={theme.tokens.colors.black}>
                Aparelho: {deviceInfo?.model}
              </Text>
              <Text color={theme.tokens.colors.black}>
                IOS: {deviceInfo?.sdkVersion}
              </Text>
            </>
          )}
        </Box>
        <Button
          //@ts-ignore
          bg={theme.tokens.colors.blue100}
          size="xl"
          borderRadius={10}
          onPress={handleSubmit(onSubmit)}>
          {loading && (
            <Spinner size="large" color={theme.tokens.colors.white} />
          )}
          {!loading && (
            <Text color={theme.tokens.colors.white} fontWeight={'bold'}>
              Login
            </Text>
          )}
        </Button>
      </Box>
    </ImageBackground>
  );
}
