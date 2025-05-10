import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppProvider from './hooks';
import Routes from './routes';
import {Backdrop} from './components/Backdrop';
import TooltipeError from './components/TooltipeError';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import useThemeStore from './store/useThemeStore';

function App(): React.JSX.Element {
  const {theme} = useThemeStore();
  return (
    <SafeAreaProvider style={{justifyContent: 'center'}}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <GestureHandlerRootView style={{flex: 1}}>
          <GluestackUIProvider config={theme}>
            <AppProvider>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
              />
              <Routes />
              <Backdrop />
              <TooltipeError />
            </AppProvider>
          </GluestackUIProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
