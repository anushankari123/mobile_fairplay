// LoginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.53.37.95:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(responseData));
        navigation.navigate('Home'), { 
          updateProfile: true 
        };
      } else {
        Alert.alert('Login Failed', responseData.detail || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.formContainer}
          >
            <Text style={styles.title}>Sign In</Text>

            <View style={styles.inputWrapper}>
              <Mail width={20} height={20} color="#00A86B" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock width={20} height={20} color="#00A86B" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Logging in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToSignup} style={styles.signupLink}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupTextt}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000', // Black background for the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginContainer: {
    width: '80%', // Adjusted to be more mobile-friendly
    maxWidth: 400, // Maximum width for large screens
    backdropFilter: 'blur(10px)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly dark background to make the form pop
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,26,26,0.8)',
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 48,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 47,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#666666',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signupTextt: {
    color: '#00A86B',
    fontSize: 16,
  },
});

export default LoginScreen;
