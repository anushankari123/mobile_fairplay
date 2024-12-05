import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import NewsDisplay from "./components/News";
import AntiDopingTimeline from "./components/AntiDopingTimeline";
import ReportComponent from "./components/ReportComponent";
import NewsTicker from "./components/NewsTicker";
import CustomDrawer from "./components/CustomDrawer";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [iconScale, setIconScale] = useState({});
  const [showNews, setShowNews] = useState(false);

  // Persistent animated value
  const scanButtonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanButtonAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanButtonAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    return unsubscribe;
  }, [navigation, scanButtonAnim]);

  const scanButtonStyle = {
    opacity: scanButtonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <CustomDrawer />
      <View style={styles.contentContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Mobile-Friendly Navigation */}
          <View style={styles.mobileNavContainer}>
            <Text style={styles.screenTitle}>Home</Text>
            <TouchableOpacity 
              style={styles.profileIcon} 
              //onPress={handleProfilePress}
            >
              <Ionicons name="person-circle" size={40} color="green" />
            </TouchableOpacity>
          </View>

          {showNews && (
            <ScrollView style={styles.newsSection}>
              <NewsDisplay />
            </ScrollView>
          )}

          <View style={styles.timelineContainer}>
            <AntiDopingTimeline />
          </View>
          
          <View style={styles.newsTickerContainer}>
            <NewsTicker />
          </View>
          
          <View style={styles.reportContainer}>
            <ReportComponent />
          </View>

          <StatusBar style="auto" />
        </ScrollView>

        {/* Scan Button */}
        <TouchableOpacity
          style={styles.scanButton}
          //onPress={() => navigation.push("ImageTextExtractor")}
        >
          <Animated.View style={scanButtonStyle}>
            <Ionicons name="scan-outline" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  contentContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  mobileNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#002D04',
  },
  screenTitle: {
    color: '#C9D1D9',
    fontSize: 20,
    fontWeight: '600',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  scanButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#002D04',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsSection: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  timelineContainer: {
    width: '100%',
    marginTop: 30,
  },
  newsTickerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});