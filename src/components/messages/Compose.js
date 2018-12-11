import React from 'react';
// import { decodeToken } from '../../lib/auth';

function Compose({ handleChange, handleClick, newMessage }) {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src=""/>
        </p>
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              onChange={handleChange}
              className="textarea"
              name="newMessage"
              value={newMessage}
            />
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <a className="button is-info" onClick={handleClick}>Submit</a>
            </div>
          </div>
        </nav>
      </div>
    </article>
  );
}

export default Compose;
