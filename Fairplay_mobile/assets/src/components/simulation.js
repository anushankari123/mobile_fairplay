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

// Screen Dimensions
const { width, height } = Dimensions.get("window");

// Configuration Constants
const snakeAndLadders = {
  8: "11",
  13: "1",
  15: "26",
  21: "31", 
  27: "16",
  33: "18",
};

const initialCordinates = { left: 40, bottom: 52 };
const playerSize = width * 0.1; // Adjusted player size
const rows = 7;
const columns = 5;

// Box Coordinates Calculation
const boxCordinates = [];
for (let i = 0, bottomVal = 52; i < rows; i++, bottomVal += 70) {
  const direction = i % 2 === 0 ? 1 : -1;
  let leftVal = direction === 1
    ? initialCordinates.left
    : initialCordinates.left + 70 * (columns - 1);

  const boxRow = [];
  for (let j = 0; j < columns; j++) {
    const box = { left: leftVal, bottom: bottomVal };
    boxRow.push(box);
    leftVal += direction * 70;
  }
  boxCordinates.push(boxRow);
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  headerContainer: {
    position: 'absolute',
    top: height * 0.05,
    left: 20,
    zIndex: 10,
  },
  boardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05,
  },
  board: {
    width: width * 0.9,
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
    marginTop: height * 0.03,
    padding: 20,
    width: width * 0.9,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
  },
  infoText: {
    fontSize: width * 0.04,
    marginBottom: 10,
    color: "white",
  },
  button: {
    padding: 10,
    marginTop: height * 0.02,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "lightgreen",
    width: width * 0.5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: width * 0.045,
    color: "green",
  },
  rollText: {
    fontSize: width * 0.15,
    fontFamily: "monospace",
    color: "green",
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  popupButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    width: width * 0.4,
    alignItems: 'center',
  },
  popupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const SnakeAndLadderGame = ({ navigation }) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [playerCordinates, setPlayerCordinates] = useState(initialCordinates);
  const [diceRoll, setDiceRoll] = useState(0);
  const [win, setWin] = useState(false);
  const [userName, setUserName] = useState('Player');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadUserName();
  }, []);

  useEffect(() => {
    movePlayer();
  }, [diceRoll, playerPosition]);

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

  const throwDice = () => {
    const newDiceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(newDiceRoll);
    setPlayerPosition((prevPosition) => {
      const newPosition = prevPosition + newDiceRoll;
      setScore(prevScore => prevScore + newDiceRoll);
      return newPosition;
    });
  };

  const movePlayer = () => {
    if (playerPosition > 35) {
      submitScore(score);
      setPlayerPosition(0);
      setWin(true);
      return;
    }
    if (snakeAndLadders[playerPosition]) {
      const newPosition = Number(snakeAndLadders[playerPosition]);
      setPopupType(newPosition > playerPosition ? "ladder" : "snake");
      setPopupMessage(
        fairPlayMessages[newPosition > playerPosition ? "ladders" : "snakes"][
          Math.floor(Math.random() * fairPlayMessages[newPosition > playerPosition ? "ladders" : "snakes"].length)
        ]
      );
      setPopupVisible(true);
      setPlayerPosition(newPosition);
    }
    const row = Math.floor(playerPosition / 5);
    const column = playerPosition % 5;
    setPlayerCordinates(boxCordinates[row][column]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Game')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Game Board */}
        <View style={styles.boardContainer}>
          <ImageBackground
            source={require("../../images/Board.png")}
            style={styles.board}
          >
            <Image
              source={require("../../images/player.png")}
              style={[styles.playerImage, playerCordinates]}
            />
          </ImageBackground>

          {/* Game Info */}
          <View style={styles.gameInfo}>
            <Text style={styles.infoText}>Welcome, {userName}!</Text>
            <Text style={styles.infoText}>Your Position: {playerPosition}</Text>
            <Text style={styles.infoText}>Current Score: {score}</Text>
            <Text style={styles.rollText}>{win ? "You Won!" : diceRoll}</Text>
            <TouchableOpacity style={styles.button} onPress={throwDice}>
              <Text style={styles.buttonText}>{win ? "Play Again" : "Throw Dice"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SnakeAndLadderGame;
