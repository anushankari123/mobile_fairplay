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

import { StyleSheet, View, Text } from 'react-native';
{/* GAMES */}
import GameScreen from './assets/src/screens/gamescreen';
{/* hangman games */}
import HangmanRulesScreen from "./assets/src/components/games/hangman/hangmanrules";
import LevelSelectorScreen from "./assets/src/components/games/hangman/hangmanlevel";
import Hangman from "./assets/src/components/games/hangman/hangman";
import Hangman1 from "./assets/src/components/games/hangman/hangman1";
import Hangman2 from "./assets/src/components/games/hangman/hangman2";
import Hangman3 from "./assets/src/components/games/hangman/hangman3";
{/* wordscramble games */}
import Scramble from "./assets/src/components/games/word_scramble/scramble";
{/* quiz game */}
import QuizRulesScreen from "./assets/src/components/games/quiz_game/quizrules";
import CategorySelectionScreen from "./assets/src/components/games/quiz_game/quizcategory";
import Quiz from "./assets/src/components/games/quiz_game/quiz";
import Quiz1 from "./assets/src/components/games/quiz_game/quiz1";
import Quiz2 from "./assets/src/components/games/quiz_game/quiz2";
import Quiz3 from "./assets/src/components/games/quiz_game/quiz3";
{/* memory game */}
import MemoryGame from "./assets/src/components/games/memory_game/memory";
{/* crossword game */}
import CrosswordRulesScreen from "./assets/src/components/games/crossword_game/crosswordrules";
import CrosswordGame from "./assets/src/components/games/crossword_game/crossword";
import CrosswordGame1 from "./assets/src/components/games/crossword_game/crossword1";
import CrosswordGame2 from "./assets/src/components/games/crossword_game/crossword2";
import CrosswordGame3 from "./assets/src/components/games/crossword_game/crossword3";
import CrosswordLevelSelector from "./assets/src/components/games/crossword_game/crosswordlevel";
{/* snake and ladder game */}
import SnakeAndLadderGame from './assets/src/components/games/snakeandladder/simulation';
import SnakeLadderRulesScreen from './assets/src/components/games/snakeandladder/snakeandladder';

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
        {/* quiz game */}
        <Stack.Screen
          name="Quiz Rules"
          component={QuizRulesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz Category"
          component={CategorySelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz1"
          component={Quiz1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz2"
          component={Quiz2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz3"
          component={Quiz3}
          options={{ headerShown: false }}
        />
        {/* memory game */}
        <Stack.Screen
          name="Memory Game"
          component={MemoryGame}
          options={{ headerShown: false }}
        />
        {/* crossword game */}
        <Stack.Screen
          name="Crossword Rules"
          component={CrosswordRulesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crossword Level"
          component={CrosswordLevelSelector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crossword"
          component={CrosswordGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crossword1"
          component={CrosswordGame1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crossword2"
          component={CrosswordGame2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crossword3"
          component={CrosswordGame3}
          options={{ headerShown: false }}
        />
        {/* snake and ladder game */}
        <Stack.Screen
          name="Simulation"
          component={SnakeAndLadderGame}
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
