import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Home} from '@/pages/app/Home';
import {Header} from '@/components/Header';
import RNBootSplash from 'react-native-bootsplash';
const App = createStackNavigator();

export const AppRoutes = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <App.Navigator initialRouteName="Home">
        <App.Screen
          name="Home"
          component={Home}
          options={({route}) => ({
            header: () => <Header title={route.name} />,
          })}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};
