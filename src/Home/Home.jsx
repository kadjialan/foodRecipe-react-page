import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <header>
        <h1>Food Recipe App</h1>
        <div className="searchHolder">
          <div className="search">
            <input type="search" placeholder="search your recipe..." />
            <span>
              <i className="fa-solid fa-magnifying-glass" />
            </span>
          </div>
          <button type="button" className="add">
            ADD
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
