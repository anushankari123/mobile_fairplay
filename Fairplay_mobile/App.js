import 'react-native-gesture-handler'; // Must be at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './assets/src/screens/LoginScreen';
import SignupScreen from './assets/src/screens/SignUpScreen';
import HomeScreen from './assets/src/screens/homescreen';
import ProfileScreen from './assets/src/screens/ProfileScreen';
import Activity from './assets/src/screens/components/activity';
import EditProfile from './assets/src/screens/components/EditProfile';
import LinkedInStyleFeed from './assets/src/screens/components/allactivity';
import PostsScreen from './assets/src/screens/post';
import GameScreen from './assets/src/screens/gamescreen';
import SnakeLadderRulesScreen from './assets/src/screens/components/snakeandladder';
import SnakeAndLadderGame from './assets/src/screens/components/simulation';

import { StyleSheet, View, Text } from 'react-native';

const Stack = createStackNavigator(); // Create the Stack Navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ cardStyle: { height: '100%' } }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Simulation"
          component={SnakeAndLadderGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Snake And Ladder"
          component={SnakeLadderRulesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
