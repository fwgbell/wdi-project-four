import React from 'react';

function Compose({ handleChange, handleClick, newMessage }) {
  return (
    <article className="media">
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
          <div className="level-item">
            <a className="button is-rounded" onClick={handleClick}>Submit</a>
          </div>
        </nav>
      </div>
    </article>
  );
}

export default Compose;
