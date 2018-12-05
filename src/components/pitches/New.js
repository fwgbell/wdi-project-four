import React from 'react';
import axios from 'axios';

class NewPitch extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    axios.post('/api/pitches', this.state)
      .then(result => {
        this.props.history.push(`/pitches/${ result.data._id }`);
      });
  }
  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }
  render(){
    return(
      <section>
        <h2 className="subtitle is-2">Upload Your Pitch</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Pitch Name</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.name || ''} name="name" className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.image || ''} name="image" className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Latitude</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.lat || ''} name="lat" className="input" type="number" />
            </div>
          </div>
          <div className="field">
            <label className="label">Longitude</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.lng || ''} name="lng" className="input" type="number" />
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


export default NewPitch;
