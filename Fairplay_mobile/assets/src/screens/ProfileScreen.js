import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const colors = {
  background: '#010409',
  cardBackground: '#000000',
  primary: '#00A86B',
  text: '#C9D1D9',
  secondaryText: '#C9D1D9',
  border: '#002D04',
  promoBackground: '#161B22',
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100');
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    dp_url: '',
    id: null,
    email: '',
    phone_number: ''
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          await fetchProfileDetails(parsedUserData);
        }
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchProfileDetails = async (baseUserData) => {
    try {
      if (!baseUserData?.id) return;
  
      const response = await axios.get(`http://192.168.118.149:8000/users/${baseUserData.id}`);
      if (response.data) {
        const updatedUserData = {
          ...baseUserData,
          first_name: response.data.first_name || baseUserData.first_name,
          last_name: response.data.last_name || baseUserData.last_name,
          bio: response.data.bio || "",
          dp_url: response.data.dp_url || baseUserData.dp_url,
          state: response.data.state || '',
          country: response.data.country || '',
          email: response.data.email || '',
          phone_number: response.data.phone_number || ''
        };
        
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        
        if (updatedUserData.dp_url) {
          const imageUrl = `http://192.168.118.149:8000/images/${updatedUserData.dp_url.split('/').pop()}`;
          setProfilePicture(imageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const handleEditPress = () => {
    navigation.navigate('EditProfile');
  };

  const pickProfilePicture = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Sorry, we need media library permissions.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await uploadProfilePicture(result.assets[0]);
      }
    } catch (err) {
      console.error("Profile picture pick error: " + err.message);
      Alert.alert('Error', 'Could not pick profile picture');
    }
  };

  const uploadProfilePicture = async (mediaFile) => {
    try {
      const formData = new FormData();
      const fileExtension = mediaFile.uri.split('.').pop();
      
      formData.append('file', {
        uri: mediaFile.uri,
        type: `image/${fileExtension}`,
        name: `profile_picture.${fileExtension}`,
      });

      const uploadResponse = await axios.post('http://192.168.118.149:8000/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = uploadResponse.data.image_url;

      const updateResponse = await axios.patch(`http://192.168.118.149:8000/users/${userData.id}`, 
        { dp_url: imageUrl },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (updateResponse.status === 200) {
        const updatedUserData = {
          ...userData,
          dp_url: imageUrl
        };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        
        const profileImageUrl = `http://192.168.118.149:/images/${imageUrl.split('/').pop()}`;
        setProfilePicture(profileImageUrl);
        
        Alert.alert('Success', 'Profile picture updated successfully.');
      }
    } catch (error) {
      console.error('Profile picture upload error:', error);
      Alert.alert('Error', 'Could not upload profile picture');
    }
  };

  const handleContactInfoPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditPress}>
          <Feather name="edit-2" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickProfilePicture} style={styles.profileImageContainer}>
            <Image
              source={{ uri: profilePicture }}
              style={styles.profileImage}
            />
            <View style={styles.editProfilePictureOverlay}>
              <Feather name="camera" size={16} color="white" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {userData.first_name} {userData.last_name}
            </Text>
            <Text style={styles.bio}>
              {userData.bio}
            </Text>
            <Text style={styles.location}>
              {userData.state}, {userData.country}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.contactInfoButton} 
            onPress={handleContactInfoPress}
          >
            <Text style={styles.contactInfoButtonText}>Contact Info</Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Available</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Add Certification</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Working Languages</Text>
          <Text style={styles.sectionContent}>English, French</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>WADA Profile</Text>
          <Text style={styles.sectionLink}>
            www.wada-ama.org/profile/emma-wilson
          </Text>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Information</Text>
            <Text style={styles.modalText}>Email: {userData.email}</Text>
            <Text style={styles.modalText}>Phone: {userData.phone_number}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  sectionCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  contactInfoButton: {
    marginBottom: 15,
  },
  contactInfoButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    marginTop: 10,
  },
  sectionLink: {
    fontSize: 14,
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.secondaryText,
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ProfileScreen;