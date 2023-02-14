/* eslint-disable react/jsx-curly-brace-presence */
import { useState } from 'react';
import Form from '../Component/Form/Form';
import './Home.css';

function Home() {
  const [show, setShow] = useState(false);
  return (
    <div className="container">
      <header>
        <h1>Food Recipe App</h1>
        <div className="searchHolder">
          <div className="search">
            <input
              type="search"
              placeholder="search your recipe..."
              className="search__input"
            />
            <span>
              <i className="fa-solid fa-magnifying-glass" />
            </span>
          </div>
          <button type="button" className="add" onClick={() => setShow(!show)}>
            ADD
          </button>
        </div>
      </header>
      {show && <Form />}
    </div>
  );
}

export default Home;
