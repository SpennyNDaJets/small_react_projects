import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Settings extends React.Component {
  render() {
    return (
      <Text style={styles.header}>
        Settings
    </Text>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
});

export default Settings;