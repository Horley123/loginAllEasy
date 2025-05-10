import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../pages/auth/Login';
import RNBootSplash from 'react-native-bootsplash';

const Auth = createStackNavigator();

function AuthRoutes(): React.JSX.Element {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Auth.Navigator initialRouteName="Login">
        <Auth.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default AuthRoutes;
