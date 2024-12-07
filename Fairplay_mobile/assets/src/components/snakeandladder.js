import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { PlayCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SnakeLadderRulesScreen = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../../fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('../../fonts/Montserrat-Regular.ttf'),
  });

  const navigation = useNavigation();

  const handleStartGame = () => {
    navigation.navigate('Simulation');
  };

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.rulesContainer}>
          <Text style={styles.title}>Snake & Ladder Game Rules</Text>

          <View style={styles.ruleSection}>
            <Text style={styles.ruleHeader}>Objective</Text>
            <Text style={styles.ruleText}>
              Be the first player to reach the 100th square by rolling the dice and navigating through snakes and ladders.
            </Text>
          </View>

          <View style={styles.ruleSection}>
            <Text style={styles.ruleHeader}>Gameplay</Text>
            <Text style={styles.ruleText}>
              • Players take turns rolling a single die.{"\n"}
              • Move your token forward by the number of squares shown on the die.{"\n"}
              • If you land on the bottom of a ladder, climb up to the top square.{"\n"}
              • If you land on the head of a snake, slide down to its tail.{"\n"}
              • The first player to reach exactly 100 wins the game.
            </Text>
          </View>

          <View style={styles.ruleSection}>
            <Text style={styles.ruleHeader}>Special Rules</Text>
            <Text style={styles.ruleText}>
              • If you roll a 6, you get an extra turn.{"\n"}
              • To win, you must land exactly on square 100.{"\n"}
              • If your move would take you beyond 100, stay in your current position.
            </Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
            <PlayCircle color="#000" size={20} style={{ marginRight: 10 }} />
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  rulesContainer: {
    width: width * 0.95,
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#00FF66',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginVertical: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#00FF66',
    textAlign: 'center',
    marginBottom: 20,
  },
  ruleSection: {
    marginBottom: 15,
  },
  ruleHeader: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#00FF66',
    marginBottom: 8,
  },
  ruleText: {
    fontFamily: 'Montserrat-Regular',
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#00FF66',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 4,
  },
  startButtonText: {
    fontFamily: 'Montserrat-Bold',
    color: '#000',
    fontSize: 16,
  },
});

export default SnakeLadderRulesScreen;
