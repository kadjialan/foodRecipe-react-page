import { useContext, useEffect, useState } from 'react';

import Form1 from '../Component/Form/Form';
import './Home.css';
import { FormContext } from '../Context';
import Modal from '../Component/deleteModal/Modal';

function Home() {
  const { show, setShow, data, setData, deleteIdem, setDeleteIdem, setNumb } =
    useContext(FormContext);
  const [see, setSee] = useState({});
  const [display, setDisplay] = useState(true);
  const [favorite, setFavorite] = useState(true);
  const [view, setview] = useState(false);
  const [info, setinfo] = useState();
  const [showIcons, setShowIcons] = useState({});
  const [search, setSearch] = useState('');

  const handleFilter = (event) => {
    event.preventDefault();
    const { target } = event;
    setSearch(target.name.value);
  };

  const handleClick = (id) => {
    const findOdj = data.find((index) => {
      return index.id === id;
    });

    if (findOdj.favorite === true) {
      findOdj.favorite = false;
    } else {
      findOdj.favorite = true;
    }
    setFavorite(findOdj.favorite);

    const filtered = data.filter((value) => {
      return value.id !== id;
    });

    const update = [...filtered, findOdj];

    localStorage.setItem('items', JSON.stringify(update));

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

    const operation = data.filter((elements) => {
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
  }, [data, favorite]);

  return (
    <div className="container">
      {deleteIdem && <Modal />}
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
                <div className="card" key={alan.id}>
                  <div className="card__pic">
                    <div className="card__image">
                      <img
                        role="presentation"
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
                          aria-hidden
                        />

                        <div onClick={() => handleClick(alan.id)} aria-hidden>
                          {showIcons[`${alan.id}`] ? (
                            <i className="fa-solid fa-heart" />
                          ) : (
                            <i className="fa-regular fa-heart" />
                          )}
                        </div>

                        <i
                          className="fa-solid fa-trash-can"
                          /* onClick={() => erase(alan.id)} */
                          onClick={() => {
                            setDeleteIdem(!deleteIdem);
                            setNumb(alan.id);
                          }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          : [...data].map((alan, index) => (
              <div className="card" key={alan.id}>
                <div className="card__pic">
                  <div className="card__image">
                    <img
                      role="presentation"
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
                        aria-hidden
                      />

                      <div onClick={() => handleClick(alan.id)} aria-hidden>
                        {showIcons[`${alan.id}`] || alan.favorite === true ? (
                          <i className="fa-solid fa-heart" />
                        ) : (
                          <i className="fa-regular fa-heart" />
                        )}
                      </div>

                      <i
                        className="fa-solid fa-trash-can"
                        /* onClick={() => erase(alan.id)} */
                        onClick={() => {
                          setDeleteIdem(!deleteIdem);
                          setNumb(alan.id);
                        }}
                        aria-hidden
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
