/* eslint-disable no-console */
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
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [showIcons, setShowIcons] = useState({});
  const [search, setSearch] = useState('');

  const handleFilter = (event) => {
    event.preventDefault();
    const { target } = event;
    setSearch(target.name.value);
  };

  const handleClick = (id) => {
    const iconData = showIcons;
    iconData[`${id}`] = !iconData[`${id}`];

    setShowIcons({ ...iconData });
  };

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
    const food = data.find((item) => item.id === info.id);
    const newFood = { ...food, ...images };

    const operation = data.filter((elements, index) => {
      return elements.id !== newFood.id;
    });

    operation.unshift(newFood);
    setData(operation);

    setTimeout(() => setview((prev) => !prev), 300);
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data));
    const iconData = {};
    data.forEach(({ id }) => {
      iconData[`${id}`] = false;
    });

    setShowIcons(iconData);
  }, [data]);
  // console.log(showIcons);

  function erase(id) {
    const temp = data.filter((elements, index) => {
      return elements.id !== id;
    });
    setData(temp);
    console.log(temp, data);
  }

  return (
    <div className="container">
      {/* form to add recipe */}
      {show && <Form1 className="bizarre" />}
      <div className="head">
        <h1>Food Recipe App</h1>
        <div className="searchHolder">
          <form className="search" onSubmit={handleFilter}>
            <input
              type="search"
              placeholder="search your recipe..."
              className="search__input"
              name="name"
            />
            <button className="search-btn" type="submit">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>
          <button type="button" className="add" onClick={() => setShow(!show)}>
            ADD
          </button>
        </div>
      </div>
      <div className="show">
        {search !== ''
          ? data
              .filter((list) => list.name === search)
              .map((alan, index) => (
                <div className="card" key={index}>
                  <div className="card__pic">
                    <div className="card__image">
                      <img
                        src={alan.image}
                        alt="food"
                        onClick={() => popUp(index)}
                      />
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

                        <div onClick={() => handleClick(alan.id)}>
                          {showIcons[`${alan.id}`] ? (
                            <i className="fa-solid fa-heart" />
                          ) : (
                            <i className="fa-regular fa-heart" />
                          )}
                        </div>

                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => erase(alan.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          : [...data].map((alan, index) => (
              <div className="card" key={index}>
                <div className="card__pic">
                  <div className="card__image">
                    <img
                      src={alan.image}
                      alt="food"
                      onClick={() => popUp(index)}
                    />
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

                      <div onClick={() => handleClick(alan.id)}>
                        {showIcons[`${alan.id}`] ? (
                          <i className="fa-solid fa-heart" />
                        ) : (
                          <i className="fa-regular fa-heart" />
                        )}
                      </div>

                      <i
                        className="fa-solid fa-trash-can"
                        onClick={() => erase(alan.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

        <div className="details__holder">
          {see.show && (
            <div className="details">
              <div>
                <p>
                  <b> Name:</b>
                </p>
                <p>{data[see.index].name}</p>
              </div>
              <div>
                <p>
                  <b> recipe: </b>
                </p>
                <p className="details__recipe">{data[see.index].recipe}</p>
              </div>
              <div>
                <p>
                  <b>origin: </b>
                </p>
                <p>{data[see.index].region}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* form to update */}
      {view && (
        <div className="Bg">
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
        </div>
      )}
    </div>
  );
}

export default Home;
