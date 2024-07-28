import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Avatar, List, Card, Divider, Text, IconButton } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Content title="Settings" />
        </Appbar.Header>
        <View style={styles.container}>
          <View style={styles.profileSection}>
            <Avatar.Image size={80} source={{ uri: 'https://example.com/avatar.jpg' }} />
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => console.log('Edit Profile')}
              style={styles.editProfileButton}
            />
          </View>
          <Card style={styles.card}>
            <List.Section>
              <List.Item
                title="Profile Update"
                left={(props) => <List.Icon {...props} icon="account" />}
                onPress={() => console.log('Profile Update')}
              />
              <Divider />
              <List.Item
                title="About"
                left={(props) => <List.Icon {...props} icon="information" />}
                onPress={() => console.log('About')}
              />
              <Divider />
              <List.Item
                title="Help"
                left={(props) => <List.Icon {...props} icon="help" />}
                onPress={() => console.log('Help')}
              />
              <Divider />
              <List.Item
                title="Log Out"
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={() => console.log('Log Out')}
              />
            </List.Section>
          </Card>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
  },
  editProfileButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
});

export default SettingsScreen;
