import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

// Color Palette
const COLORS = {
  BACKGROUND: '#010409',
  GREEN: '#00A86B',
  LIGHT_GRAY: '#C9D1D9',
  BLACK: '#000000',
  DARK_GRAY: '#161B22',
  DARK_GREEN: '#002D04',
};

// Screen Dimensions
const { width, height } = Dimensions.get('window');
// Configuration Constants
const snakeAndLadders = {
  8: "11",
  13: "1",
  15: "26",
  21: "31", 
  27: "16",
  33: "18",
};

const initialCordinates = { left: width * 0.1, bottom: height * 0.1 };
const playerSize =width * 0.1;
const rows = 7;
const columns = 5;

// Box Coordinates Calculation
const boxCordinates = [];

for (let i = 0, bottomVal = height * 0.1; i < rows; i++, bottomVal += height * 0.1) {
  const direction = i % 2 === 0 ? 1 : -1;
  let leftVal = direction === 1
    ? initialCordinates.left
    : initialCordinates.left + width * 0.15 * (columns - 1);

  const boxRow = [];
  for (let j = 0; j < columns; j++) {
    const box = { left: leftVal, bottom: bottomVal };
    boxRow.push(box);
    leftVal += direction * width * 0.15;
  }
  boxCordinates.push(boxRow);
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
  backButtonText: {
    color: COLORS.LIGHT_GRAY,
    marginLeft: 5,
  },
  boardContainer: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  board: {
    width: width * 0.8,
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  playerImage: {
    width: playerSize,
    height: playerSize + 22,
    position: "absolute",
  },
  gameInfo: {
    marginTop: 20,
    padding: 20,
    width: width * 0.9,
    alignItems: "center",
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.DARK_GREEN,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.LIGHT_GRAY,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    backgroundColor: COLORS.DARK_GREEN,
    width: width * 0.7,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },
  rollText: {
    fontSize: 80,
    fontFamily: "monospace",
    color: COLORS.GREEN,
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  }
});
// Fair Play and Doping Messages
const fairPlayMessages = {
  ladders: [
    "Great job showing true sportsmanship!",
    "Climbing to success through hard work and dedication!",
    "Your integrity is your greatest strength!",
    "Success comes to those who play by the rules!",
    "Commitment to fair play is the real victory!"
  ],
  snakes: [
    "Doping is cheating yourself and your competitors.",
    "Performance-enhancing drugs destroy the spirit of the game.",
    "True champions compete with their natural abilities.",
    "Integrity is more important than temporary success.",
    "Respect the game, respect yourself - say NO to doping!"
  ]
};

/**
 * The main component of the Snake and Ladder game with Fair Play Messaging
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object for routing
 * @returns {JSX.Element} The JSX element of the game
 */
const SnakeAndLadderGame = ({ navigation }) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [playerCordinates, setPlayerCordinates] = useState(initialCordinates);
  const [diceRoll, setDiceRoll] = useState(0);
  const [win, setWin] = useState(false);
  const [userName, setUserName] = useState('Player');
  
  // Popup state
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "ladder" or "snake"

  // Score tracking
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadUserName();
  }, []);

  useEffect(() => {
    movePlayer();
  }, [diceRoll, playerPosition]);

  /**
   * Loads the user's name from AsyncStorage
   */
  const loadUserName = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.first_name || 'Player');
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  /**
   * Submits the game score to the backend
   * @param {number} finalScore - The score to submit
   */
  const submitScore = async (finalScore) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        const userId = parsedData.id;
  
        const scoreData = {
          game_name: 'snake_and_ladder',
          score: finalScore,
          user_id: userId
        };
  
        const response = await axios.post('http://192.168.118.149:8000/game-scores', scoreData);
        
        Alert.alert('Score Submitted', `You scored ${finalScore} points!`);
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      Alert.alert('Score Submission Failed', 'Please check your connection and try again.');
    }
  };

  /**
   * Rolls the dice and updates the player position.
   */
  const throwDice = () => {
    const newDiceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(newDiceRoll);
    setPlayerPosition((prevPosition) => {
      const newPosition = prevPosition + newDiceRoll;
      // Update score based on dice roll
      setScore(prevScore => prevScore + newDiceRoll);
      return newPosition;
    });
  };

  /**
   * Moves the player to the new position based on the dice roll and the snake and ladder positions.
   */
  const movePlayer = () => {
    if (playerPosition > 35) {
      // Game won - submit final score
      submitScore(score);
      setPlayerPosition(0);
      setWin(true);
      return;
    }
    
    // Check for snake or ladder
    if (snakeAndLadders[playerPosition]) {
      const newPosition = Number(snakeAndLadders[playerPosition]);
      
      // Determine if it's a ladder or snake
      if (newPosition > playerPosition) {
        // Ladder - show fair play message
        setPopupType("ladder");
        setPopupMessage(
          fairPlayMessages.ladders[
            Math.floor(Math.random() * fairPlayMessages.ladders.length)
          ]
        );
        setPopupVisible(true);
      } else {
        // Snake - show doping message
        setPopupType("snake");
        setPopupMessage(
          fairPlayMessages.snakes[
            Math.floor(Math.random() * fairPlayMessages.snakes.length)
          ]
        );
        setPopupVisible(true);
      }
      
      setPlayerPosition(newPosition);
    }
    
    let position = playerPosition;
    const row = Math.floor(position / 5);
    const column = position % 5;
    setPlayerCordinates(boxCordinates[row][column]);
  };

  // Popup styles
  const popupStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(1,4,9,0.8)',
    },
    popupContent: {
      width: width * 0.8,
      padding: 20,
      backgroundColor: popupType === 'ladder' ? COLORS.DARK_GREEN : '#8B0000',
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: popupType === 'ladder' ? COLORS.GREEN : 'red',
    },
    popupText: {
      fontSize: 18,
      textAlign: 'center',
      color: COLORS.LIGHT_GRAY,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    popupButton: {
      marginTop: 15,
      padding: 10,
      width: width * 0.6,
      backgroundColor: popupType === 'ladder' ? COLORS.GREEN : 'red',
      borderRadius: 5,
      alignItems: 'center',
    },
    popupButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    }
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
      {/* Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Game')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.GREEN} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Popup Modal */}
          <Modal
            transparent={true}
            visible={popupVisible}
            animationType="fade"
            onRequestClose={() => setPopupVisible(false)}
          >
            <View style={popupStyles.modalContainer}>
              <View style={popupStyles.popupContent}>
                <Text style={popupStyles.popupText}>
                  {popupType === 'ladder' ? '🏆 Fair Play Moment 🏆' : '⚠️ Doping Alert ⚠️'}
                </Text>
                <Text style={popupStyles.popupText}>{popupMessage}</Text>
                <TouchableOpacity 
                  style={popupStyles.popupButton}
                  onPress={() => setPopupVisible(false)}
                >
                  <Text style={popupStyles.popupButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.boardContainer}>
            <ImageBackground
              source={require("../../../../images/Board.png")}
              style={styles.board}
              resizeMode="contain"
            >
              <Image
                source={require("../../../../images/player.png")}
                style={[
                  styles.playerImage,
                  { left: playerCordinates.left, bottom: playerCordinates.bottom },
                ]}
              />
            </ImageBackground>

            <View style={styles.gameInfo}>
              <Text style={styles.infoText}>Snake and Ladder Board</Text>
              <Text style={styles.infoText}>Welcome, {userName}!</Text>
              <Text style={styles.infoText}>Your Position: {playerPosition}</Text>
              <Text style={styles.infoText}>Current Score: {score}</Text>
              <Text style={styles.rollText}>{win ? "You Won!" : diceRoll}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (win) {
                    setWin(false);
                    setPlayerPosition(0);
                    setPlayerCordinates(initialCordinates);
                    setScore(0);
                  } else {
                    throwDice();
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  {win ? "Play Again" : "Throw Dice"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SnakeAndLadderGame;