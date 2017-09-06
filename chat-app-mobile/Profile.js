import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Profile extends React.Component {
  render() {
    return (
      <Text style={styles.header}>
        Profile
    </Text>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
});

export default Profile;