
import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const IconImg = () => (
	<img
		className="iconImage"
		src="https://sd.keepcalm-o-matic.co.uk/i/keep-calm-and-just-fucking-do-it-17.png"
		alt="Keep Calm"
	/>
);

const AppBarExampleIcon = () => (
  <AppBar
    title="Great Fucking Advice"
	iconElementLeft={<IconImg/>}
	style={{
      backgroundColor: '#000000',
    }}
  />
);

class App extends React.Component {
	state = {
		clicks: 0,
		nextQuote: 0
	}

	nextQuote = () => {
		this.setState({
			clicks: this.state.clicks + 1,
			nextQuote: this.state.nextQuote + 1
		});
	}

	randomQuote = (quotes) => {
		this.setState({
			clicks: this.state.clicks + 1,
			nextQuote: Math.floor(Math.random() * quotes.length)
		});
	}

	render() {
		const advice = ['Fake it till you make it', 'Hire Spencer', 'Watch Silicon Valley', 'Hire Melissa', 'Read up on Bernie Madoff', 'Take a leap'];
		return (
			
			<MuiThemeProvider>
				<div>
				{this.state.clicks < 10 &&
				<div>
				<AppBarExampleIcon></AppBarExampleIcon>
				<div className='program'>
					<div className='container'>
						<div>
							<h1 className='quote'>
								{advice[this.state.nextQuote % advice.length]}
							</h1>
							<div className='ButtonPanel'>
								<button
									className='button'
									onClick={(e) => this.nextQuote(e)}>
									In Order
								</button>
								<button
									className='button'
									onClick={(e) => this.randomQuote(advice, e)}>
									Random
								</button>
							</div>
						<img className='image'
							src="https://i.ytimg.com/vi/Alt0SKEL84M/maxresdefault.jpg"
							alt="Just Do It" />
							</div>
					</div>
					<h2 className='clicks'>
						You have completed {this.state.clicks} clicks!
				</h2>
				</div>
				
				</div>
				}
				{this.state.clicks >= 10 &&
				<div>
					 <img
					 	className="surprise"
						alt="surprise"
						src="https://i.ytimg.com/vi/4rEikKJKfos/maxresdefault.jpg"
					 />
				</div>
				}
				</div>
			</MuiThemeProvider>
			
		)
	}
}

export default App;