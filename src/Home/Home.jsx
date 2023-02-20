/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-brace-presence */

import { useContext, useState } from 'react';
import { Form } from '../Component/Form/Form';
import { FormContext } from '../Context';
import './Home.css';

function Home() {
  const { show, setShow, data } = useContext(FormContext);
  const [see, setSee] = useState({});
  const [display, setDisplay] = useState(true);

  const popUp = (index) => {
    setDisplay((prev) => !prev);

    /*  console.log(index, display); */
    const holder = see;
    holder.index = index;
    holder.show = display;

    setSee({ ...holder });
  };

  function erase(index) {
    const int = data.indexOf(data[index]);
    console.log(int);

    if (int > -1) {
      data.splice(int, 1);
    }

    localStorage.setItem('data_info', JSON.stringify(data));
  }

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
      {show && <Form className="bizarre" />}
      <div className="show">
        {[...data].map((alan, index) => (
          <div className="card" key={index}>
            <div className="card__pic">
              <div className="card__image">
                <img src={alan.image} alt="food" />
              </div>

              <div className="card__caption">
                <div>
                  <h3>{alan.name}</h3>
                </div>

                <div className="cards__icons">
                  <i className="fa-solid fa-eye" onClick={() => popUp(index)} />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => erase(index)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          {see.show && (
            <div>
              <p>
                <b> ingredients: </b>
                {data[see.index].description}
              </p>
              <p>
                <b>origin: </b>
                {data[see.index].region}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
