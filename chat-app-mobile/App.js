import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import Home from './Home';
import Settings from './Settings';
import Profile from './Profile';

class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <View style={styles.nav}>
            <Link
              to="/"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
              <Text>Home</Text>
            </Link>
            <Link
              to="/profile"
              underlayColor='#f0f4f7'
              style={styles.navItem} >
              <Text>Profile</Text>
            </Link>
            <Link
              to="/settings"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
              <Image
                style={{ width: 15, height: 15 }}
                source={{ uri: 'https://nest.com/support/images/misc-assets-icons/settings-icon.png' }}
              />
            </Link>
          </View>

          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/profile" component={Profile} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "lightblue",
    marginBottom: 10,
    borderRadius: 10
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  }
});

export default App;