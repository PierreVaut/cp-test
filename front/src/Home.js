import React, { Component } from 'react';
import request from 'superagent';

const urlForTopUsers = `http://localhost:8000/api/rider/loyalty/top-users`;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        topUsers: []
    };
  }
  
  async componentDidMount() {
    request
    .get(urlForTopUsers)
    .then(res => {
      this.setState({
        topUsers: res.body
      });
      console.log(res.body)
    }, (err) => {
      this.setState({
        error: err.toString()
      });
    });
  }

  render() {
      if(this.state.topUsers){
          // TODO : add .map with topUser component
          return <p>{JSON.stringify(this.state.topUsers)}</p>
      }
      return <p>Loading...</p>
  }
}

export default Home