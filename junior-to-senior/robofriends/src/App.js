import React, { Component } from 'react';
import CardList from './components/CardList';
import { robots } from './robots';
import SearchBox from './components/SearchBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  render() {
    const { robots, searchfield } = this.state; 
    const filterRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
      <div className="tc">
        <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList robots={filterRobots} />
      </div>
    )
  }
}

export default App;