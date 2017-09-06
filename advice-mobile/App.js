import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: ["Hire Spencer", "Stop crying", "Nobody owes you a thing", "Take a leap of faith"],
      inputQuote: "",
      clicks: 0
    }
  }

  _nextQuote = () => {
    this.setState({
      ...this.state,
      clicks: this.state.clicks + 1
    });
  }

  _updateText = (text) => {
    this.setState({
      ...this.state,
      inputQuote: text
    });
  }

  _addQuote = () => {
    newQuoteList = this.state.quotes;
    newQuoteList.push(this.state.inputQuote);

    //this.refs.newQuoteInput.clear();

    this.setState({
      ...this.state,
      quotes: newQuoteList,
      inputQuote: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Fucking Advice</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.inputLabel}>Tap Below to Enter New Quote</Text>
          <TextInput style={styles.quoteInput}
            ref="newQuoteInput"
            value={this.state.inputQuote}
            onChangeText={(text) => this._updateText(text)}
            onSubmitEditing={this._addQuote}
          />
          <TouchableOpacity onPress={this._nextQuote}>
            <Text style={styles.quote}>{this.state.quotes[this.state.clicks % this.state.quotes.length]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  topContainer: {
    flex: 1,
  },

  bottomContainer: {
    flex: 2,
  },

  title: {
    color: 'yellow',
    fontSize: 45,
    fontWeight: 'bold',
    margin: 20,
  },

  quote: {
    color: 'yellow',
    fontSize: 45,
    textAlign: 'center',
    margin: 30
  },

  inputLabel: {
    height: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  quoteInput: {
    color: 'white',
    textAlign: 'center',
    height: 25
  }
});

export default App;