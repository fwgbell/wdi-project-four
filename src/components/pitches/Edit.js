import React from 'react';
import axios from 'axios';
import { authorizationHeader} from '../../lib/auth';

class EditPitch extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    axios.put(`/api/pitches/${this.state._id}`, this.state, authorizationHeader())
      .then(result => {
        this.props.history.push(`/pitches/${ result.data._id }`);
      });
  }
  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }

  componentDidMount() {
    axios.get(`/api/pitches/${this.props.match.params.id}`)
      .then(result => this.setState(result.data ));
  }

  render(){
    return(
      <section>
        <h2 className="subtitle is-2">Upload Your Pitch</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Pitch Name</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.name || ''} name="name" className="input" type="text" required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.image || ''} name="image" className="input" type="text" required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Latitude</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.lat || ''} name="lat" className="input" type="number" required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Longitude</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.lng || ''} name="lng" className="input" type="number" required/>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}


export default EditPitch;
