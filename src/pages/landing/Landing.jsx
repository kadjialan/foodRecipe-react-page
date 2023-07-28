import React from 'react';
import './Landing.css';

function landing() {
  return (
    <div className="landing-container">
      <h1>welcome to your recipe</h1>
      <p>Guide lines</p>
      <ul>
        <li>Press the get started button to navigate to the main page</li>
        <li>
          Press the Add bottom at the top right side of the page to add a meal
        </li>
        <li>A recipe should contain</li>
      </ul>
    </div>
  );
}

export default landing;
