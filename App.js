import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Welcome from './src/screens/Welcome'
import ChartRoom from './src/screens/ChartRoom'
import { HeaderMain } from './src/components/Header'
import Message from './src/screens/Message'
import GlobalState from './src/contexts/index'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Welcome' component={Welcome} />
          {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
          <Stack.Screen
            name='ChartRoom'
            component={ChartRoom}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name='Message' component={Message} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
