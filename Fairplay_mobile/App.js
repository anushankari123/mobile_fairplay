import 'react-native-gesture-handler'; // Must be at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './assets/src/screens/LoginScreen';
import SignupScreen from './assets/src/screens/SignUpScreen';
import HomeScreen from './assets/src/screens/homescreen';
import ProfileScreen from './assets/src/screens/ProfileScreen';
import Activity from './assets/src/components/activity';
import EditProfile from './assets/src/components/EditProfile';
import LinkedInStyleFeed from './assets/src/components/allactivity';
//import PostsScreen from './assets/src/screens/post';
import GameScreen from './assets/src/screens/gamescreen';
import SnakeLadderRulesScreen from './assets/src/components/snakeandladder';
import SnakeAndLadderGame from './assets/src/components/simulation';

import { StyleSheet, View, Text } from 'react-native';
{/* GAMES */}
{/* hangman games */}
import HangmanRulesScreen from "./assets/src/components/games/hangman/hangmanrules";
import LevelSelectorScreen from "./assets/src/components/games/hangman/hangmanlevel";
import Hangman from "./assets/src/components/games/hangman/hangman";
import Hangman1 from "./assets/src/components/games/hangman/hangman1";
import Hangman2 from "./assets/src/components/games/hangman/hangman2";
import Hangman3 from "./assets/src/components/games/hangman/hangman3";
{/* wordscramble games */}
import Scramble from "./assets/src/components/games/word_scramble/scramble";
const Stack = createStackNavigator(); // Create the Stack Navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game" screenOptions={{ cardStyle: { height: '100%' } }}>
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
        {/* <Stack.Screen
          name="Post"
          component={PostsScreen}
          options={{ headerShown: false }}
        /> */}
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
        {/* GAMES */}
        {/* hangman game */}
        <Stack.Screen
          name="Hangman Rules"
          component={HangmanRulesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hangman Level"
          component={LevelSelectorScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Hangman"
          component={Hangman}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hangman1"
          component={Hangman1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hangman2"
          component={Hangman2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hangman3"
          component={Hangman3}
          options={{ headerShown: false }}
        />
        {/* wordscramble game */}
        <Stack.Screen
          name="Scramble"
          component={Scramble}
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
