import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { COLORS } from './constants';
import StackNavigator from './Navigation/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.primary}
          translucent={false} 
        />
        <StackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
