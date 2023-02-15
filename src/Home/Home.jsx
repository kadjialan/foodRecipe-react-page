/* eslint-disable react/jsx-curly-brace-presence */

import { useContext, useState, useEffect } from 'react';
import Form from '../Component/Form/Form';
import { FormContext } from '../Context';
import './Home.css';

function Home() {
  const { show, setShow } = useContext(FormContext);
  const [myLocalStorageData, setMyLocalStorageData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem('key');
    if (data === !null) setMyLocalStorageData(JSON.parse(data));
  }, []);
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
      <div className="show">{myLocalStorageData}</div>
    </div>
  );
}

export default Home;
