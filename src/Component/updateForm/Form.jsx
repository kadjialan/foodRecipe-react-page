import React, { useContext } from 'react';
import { FormContext } from '../../Context';
import './Form.css';

export default function Form() {
  const { data, setData, info, setview } = useContext(FormContext);

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
  return (
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
          <input type="text" defaultValue={info.image} name="image" disabled />
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
  );
}
