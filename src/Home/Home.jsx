/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';

import Form1 from '../Component/Form/Form';
import './Home.css';
import { FormContext } from '../Context';

function Home() {
  const { show, setShow, data, setData } = useContext(FormContext);
  const [see, setSee] = useState({});
  const [see2, setSee2] = useState({});
  const [display, setDisplay] = useState(true);
  const [display2, setDisplay2] = useState(false);

  const popUp = (index) => {
    setDisplay((prev) => !prev);

    const holder = see;
    holder.index = index;
    holder.show = display;

    setSee({ ...holder });
  };

  const update = (index) => {
    console.log(index);
    setDisplay2((prev) => !prev);

    const holder = see2;
    holder.index = index;
    holder.show = display;

    setSee({ ...holder });
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data));
  }, [data]);

  function erase(id) {
    const temp = data.filter((elements, index) => {
      return elements.id !== id;
    });
    setData(temp);
    console.log(temp, data);
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
      {show && <Form1 className="bizarre" />}
      <div className="show">
        {[...data].map((alan, index) => (
          <div className="card" key={index}>
            <div className="card__pic">
              <div className="card__image">
                <img src={alan.image} alt="food" onClick={() => popUp(index)} />
              </div>

              <div className="card__caption">
                <div>
                  <h3>{alan.name}</h3>
                </div>

                <div className="cards__icons">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => update(index)}
                  />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => erase(alan.id)}
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

      {see2.show && (
        <form className="update">
          <div className="categories">
            <p>
              <b>Name</b>
            </p>
            <input type="text" defaultValue={data.name} name="name" />
          </div>
          <div className="categories">
            <p>
              <b>ingridients</b>
            </p>
            <textarea
              type="text"
              defaultValue={data[see2.index].description}
              name="description"
            />
          </div>
          <div className="categories">
            <p>
              <b>Region of origin </b>
            </p>
            <input type="text" defaultValue={data.region} name="region" />
          </div>
          <div className="form__buttons">
            <button type="submit" className="confirm">
              cancel
            </button>
            <button type="button" className="cancel">
              update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Home;
