/* eslint-disable no-shadow */
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
  const [display, setDisplay] = useState(true);
  const [view, setview] = useState(false);
  const [info, setinfo] = useState();

  const popUp = (index) => {
    setDisplay((prev) => !prev);

    const holder = see;
    holder.index = index;
    holder.show = display;

    setSee({ ...holder });
  };

  const update = (e) => {
    e.preventDefault();
    const change = new FormData(e.currentTarget);
    const images = Object.fromEntries(change.entries());
    console.log(images);
    setinfo(images);
  };
  console.log(info);

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
      {show && <Form1 className="bizarre" />}
      <div className="head">
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
      </div>

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
                    onClick={() => {
                      setview(!view);
                      setinfo(alan);
                    }}
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
                <b> recipe: </b>
                {data[see.index].recipe}
              </p>
              <p>
                <b>origin: </b>
                {data[see.index].region}
              </p>
            </div>
          )}
        </div>
      </div>

      {view && (
        <form className="update" onSubmit={update}>
          <div className="categories">
            <p>
              <b>Name</b>
            </p>
            <input type="text" defaultValue={info.name} name="name" />
          </div>

          <div className="categories">
            <p>
              <b>image</b>
            </p>
            <input
              type="text"
              defaultValue={info.image}
              name="image"
              disabled
            />
          </div>

          <div className="categories">
            <p>
              <b>recipe</b>
            </p>
            <textarea type="text" defaultValue={info.recipe} name="recipe" />
          </div>
          <div className="categories">
            <p>
              <b>Region of origin </b>
            </p>
            <input type="text" defaultValue={info.region} name="region" />
          </div>
          <div className="form__buttons">
            <button type="submit" className="confirm">
              update
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => setview(false)}
            >
              cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Home;
