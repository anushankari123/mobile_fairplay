import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomePopup from './components/WelcomePopup';
import Leaderboard from './components/leaderboard'

const MenuButton = ({ icon, text, index, onPress, active }) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <Ionicons 
        name={icon} 
        size={24} 
        color={active ? '#00A86B' : '#C9D1D9'} 
      />
      <Text style={[
        styles.menuButtonText, 
        { color: active ? '#00A86B' : '#C9D1D9' }
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const BottomNavbar = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(5); // Default to Games
  const menuItems = [
    { icon: "home-outline", text: "Home", route: 'Home', index: 0 },
    { icon: "information-circle-outline", text: "Info", route: 'Infographics', index: 1 },
    { icon: "newspaper-outline", text: "News", route: 'LatestNews', index: 2 },
    { icon: "create-outline", text: "Post", route: 'Post', index: 3 },
    { icon: "chatbubbles-outline", text: "Forum", route: 'DiscussionForum', index: 4 },
    { icon: "game-controller-outline", text: "Games", route: 'Games', index: 5 }
  ];

  const handlePress = (item) => {
    setActiveIndex(item.index);
    navigation.navigate(item.route);
  };

  return (
    <View style={styles.bottomNavbar}>
      {menuItems.map((item) => (
        <MenuButton
          key={item.index}
          {...item}
          active={activeIndex === item.index}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

export default function GameScreen({ navigation }) {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [userName, setUserName] = useState('Player');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const leftDrawerAnimation = useRef(new Animated.Value(-250)).current;
  const soundRef = useRef(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  const gameIcons = [
    { 
      name: 'Hangman', 
      icon: 'body-outline',
      component: 'Hangman Rules',
      available: true
    },
    { 
      name: 'Word Scramble', 
      icon: 'text-outline',
      component: 'Scramble',
      available: true
    },
    { 
      name: 'Sort', 
      icon: 'swap-vertical-outline',
      component: 'Sort Rules',
      available: true
    },
    { 
      name: 'Quiz', 
      icon: 'clipboard-outline',
      component: 'Quiz Rules',
      available: true
    },
    {
      name: 'Memory Game',
      icon: 'brain-outline',
      component: 'Memory Game',
      available: true
    },
    {
      name: 'Pill Race',
      icon: 'fitness-outline',
      component: 'Pill Race',
      available: true
    },
    {
      name: 'Crossword',
      icon: 'grid-outline',
      component: 'Crossword Rules',
      available: true
    },
    {
      name: 'Snake And Ladder',
      icon: 'cube-outline',
      component: 'Snake And Ladder',
      available: true
    }
  ];

  useEffect(() => {
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

    loadUserName();
  }, []);

  const toggleLeftDrawer = () => {
    const toValue = leftDrawerOpen ? -250 : 0;
    Animated.timing(leftDrawerAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setLeftDrawerOpen(!leftDrawerOpen);
  };

  const handleGameSelect = (game) => {
    if (game.available) {
      navigation.navigate(game.component);
    } else {
      alert('Coming Soon!');
    }
    toggleLeftDrawer();
  };

  return (
    <View style={styles.container}>
      {/* Drawer Menu Button */}
      <TouchableOpacity onPress={toggleLeftDrawer} style={styles.drawerMenuButton}>
        <Ionicons name="menu" size={30} color="#00A86B" />
      </TouchableOpacity>

      {/* Left Drawer */}
      <Animated.View
        style={[
          styles.leftDrawer,
          {
            transform: [{ translateX: leftDrawerAnimation }],
          },
        ]}
      >
        <ScrollView>
          {gameIcons.map((game, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.drawerItem,
                !game.available && styles.drawerItemDisabled
              ]}
              onPress={() => handleGameSelect(game)}
            >
              <Ionicons
                name={game.icon}
                size={24}
                color={game.available ? "#00A86B" : "#C9D1D9"}
              />
              <Text
                style={[
                  styles.drawerItemText,
                  !game.available && styles.drawerItemTextDisabled
                ]}
              >
                {game.name}
                {!game.available && " (Coming Soon)"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.subWelcomeText}>Select a game from the menu to begin!</Text>
        <Leaderboard />
      </View>

      {/* Welcome Popup */}
      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}

      {/* Bottom Navigation */}
      <BottomNavbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010409',
  },
  drawerMenuButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 1001,
    backgroundColor: '#161B22',
    padding: 10,
    borderRadius: 50,
  },
  leftDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#161B22',
    paddingTop: 80,
    zIndex: 900,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#002D04',
  },
  drawerItemText: {
    color: '#C9D1D9',
    fontSize: 16,
    marginLeft: 15,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 60, // Space for bottom navbar
  },
  welcomeText: {
    fontSize: 24,
    color: '#00A86B',
    textAlign: 'center',
    backgroundColor: '#161B22',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  subWelcomeText: {
    fontSize: 16,
    color: '#C9D1D9',
    textAlign: 'center',
    backgroundColor: '#161B22',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  bottomNavbar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#002D04',
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    fontSize: 10,
    marginTop: 5,
  },
});