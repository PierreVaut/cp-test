import React, { Component } from 'react';
import request from 'superagent';
import {LoyaltyIcon, LoyaltyProgressBar} from './common'

const urlForRider = (id) =>
  `http://localhost:8000/api/rider/loyalty/${id}`;

class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
  }
  
  async componentDidMount() {
    request
    .get(urlForRider(this.state.id))
    .then(res => {
      this.setState({
        rider: res.body
      });
    }, (err) => {
      this.setState({
        error: err.toString()
      });
    });
  }
  
  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (!this.state.rider) {
      return <p>Loading...</p>;
    }
    const { name, id, status, loyalty_points, ride_count} = this.state.rider
    return (
      <div>
        <h2>Bienvenue {name || "invité"}</h2>
        <p>Votre statut: {status}</p>
        <LoyaltyIcon status={status} />
        <p>Vos points de fidélité: {loyalty_points} (<a href="https://www.chauffeur-prive.com/fr/fidelite.html">convertibles en couses gratuites</a>)</p>
        <p>Courses effectuées: {ride_count}</p>
        <LoyaltyProgressBar rideCount= {ride_count} status={status} />
      </div>
    );
  }
}

export default Rider;

