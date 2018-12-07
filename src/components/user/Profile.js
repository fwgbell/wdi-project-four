import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  componentDidMount() {
    axios.get(`/api/profile/${this.props.match.params.id}`, authorizationHeader())
      .then(result => this.setState({ profile: result.data }));
  }

  render(){
    return (
      <div>
        {this.state.profile && <p>{this.state.profile.username}</p>}
        Profile Page!!!!
      </div>
    );
  }
}

export default Profile;
