import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Image, Dimensions, StyleSheet } from 'react-native';
import BackButton from './BackButton';

const { width, height } = Dimensions.get('window'); // Get screen width and height

const Podcastcomp = () => {
  const openSpotifyLink = () => {
    Linking.openURL('https://open.spotify.com/show/4tBispbp2qYjTR3Loan3t5');
  };

  const openApplePodcastLink = () => {
    Linking.openURL('https://podcasts.apple.com/us/podcast/the-anti-doping-podcast/id1456373484');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <BackButton />
          {/* Header with Podcast Image and Title */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://www.dropbox.com/scl/fi/8se9cydiysfa737hqf2yo/podcast.png?rlkey=wz12xu98mejj3r3cjrsmwg7ki&st=72tpm2h0&raw=1' }}
              style={styles.podcastImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.podcastTitle}>Anti-Doping Podcast</Text>
              <Text style={styles.podcastSubtitle}>Championing Clean Sport</Text>
            </View>
          </View>

          {/* Sections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Podcast</Text>
            <Text style={styles.sectionContent}>
              Dive deep into anti-doping research, technology, law, and policy. This podcast, presented by the 
              Partnership for Clean Competition, features expert insights from scientists, sport organizations, 
              athletes, and clean sport champions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mission</Text>
            <View>
              {[ 
                'Increase awareness of anti-doping issues', 
                'Educate on anti-doping science and policies', 
                'Inspire careers in anti-doping professions' 
              ].map((mission, index) => (
                <View key={index} style={styles.missionRow}>
                  <Text style={styles.missionBullet}>●</Text>
                  <Text style={styles.missionText}>{mission}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.sectionContent}>Host: Marie McNeely, PhD</Text>
            <Text style={styles.sectionSubtitle}>Presented by: Partnership for Clean Competition</Text>
          </View>

          {/* Spotify Button */}
          <TouchableOpacity
            onPress={openSpotifyLink}
            style={styles.spotifyButton}
          >
            <Image
              source={{ uri: 'https://www.dropbox.com/scl/fi/n9i6c1c6b8l4pm9bh72al/spotify.jpg?rlkey=5xd4qjz6iiwk7q3od6f1ooz9u&st=k49gsggu&raw=1' }}
              style={styles.spotifyIcon}
            />
            <Text style={styles.spotifyText}>Listen on Spotify</Text>
          </TouchableOpacity>

          {/* Apple Podcasts Button */}
          <TouchableOpacity
            onPress={openApplePodcastLink}
            style={styles.appleButton}
          >
            <Image
              source={{ uri: 'https://www.dropbox.com/scl/fi/nxph234rv955663sdk000/apple.png?rlkey=shtfahd8mhx04wa1r7xeptfl5&st=uzx8w3rn&raw=1' }}
              style={styles.appleIcon}
            />
            <Text style={styles.appleText}>Listen on Apple Podcasts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 25,
    flexDirection: 'column',
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
    maxWidth: width * 0.9, // Responsive width based on screen size
    alignSelf: 'center',
    zIndex: 1, // Ensure the content is above the background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954',
    paddingBottom: 20,
  },
  podcastImage: {
    width: 120,
    height: 120,
    borderRadius: 18,
    marginRight: 25,
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  podcastTitle: {
    color: '#1DB954',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  podcastSubtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#1DB954',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  sectionContent: {
    color: '#D1D5DB',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    fontStyle: 'italic',
  },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  missionBullet: {
    color: '#1DB954',
    marginRight: 15,
  },
  missionText: {
    color: '#D1D5DB',
    fontSize: 16,
    flex: 1,
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    borderRadius: 35,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  spotifyIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  spotifyText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.6,
  },
  appleButton: {
    backgroundColor: '#000000',
    borderRadius: 35,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginTop: 20,
  },
  appleIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  appleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.6,
  },
});

export default Podcastcomp;
