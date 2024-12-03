import React from 'react';
import './App.css';
import PoolMethod from './PoolMethod';

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      poolMethod: '',
      username: '',
    }
  }

  fetchInfo = async (address) => {
    try {
      const response = await fetch(address);
      if (!response?.ok) throw Error('Did not receive expected data');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  setPoolMethod = (method) => {
    this.setState({poolMethod: method});
  }

  componentDidMount = async () => {
    this.setState({
      username: (await this.fetchInfo('http://localhost:5000/initial_info')).username
    })
    console.log(await this.fetchInfo('https://api.getsongbpm.com/search/?api_key=bfafcd1a08c2aef417759a429e83a3ab&type=song&lookup=boulevard+of+broken+dreams'))
  }

  render() {
    const { poolMethod, username } = this.state;
    return (
      <div className="App">
        <h1>HeartBeats</h1>
        <h2>{`Connected to ${username}`}</h2>
        <h2>Select song pool:</h2>
        <PoolMethod poolMethod={poolMethod} setPoolMethod={this.setPoolMethod}
          text="Your Top 100 Favorite Tracks"
          method="favTracks"
        />
        <PoolMethod poolMethod={poolMethod} setPoolMethod={this.setPoolMethod}
          text="Your Top 10 Favorite Artists"
          method="favArtists"
        />
        <PoolMethod poolMethod={poolMethod} setPoolMethod={this.setPoolMethod}
          text="Your Top 3 Genres"
          method="favGenres"
        />
        <p></p>
        <button>BEGIN</button>
      </div>
    );
  }
}

export default App;
