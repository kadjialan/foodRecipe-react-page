import { useContext } from 'react';
import { FormContext } from '../../Context';
import './Form.css';

export default function Form1() {
  const { show, setShow, setData } = useContext(FormContext);
  function addItems(e) {
    e.preventDefault();
    const favorite = false;
    const id = Date.now();

    const change = new FormData(e.currentTarget);
    const images = Object.fromEntries(change.entries());
    const imagesInfo = { ...images, id, favorite };
    setData((prev) => [...prev, imagesInfo]);
    setShow(false);
  }

  return (
    <div className="formBackground">
      <form onSubmit={addItems}>
        <div className="categories">
          <p>
            <b>Meal name</b>
          </p>
          <input
            type="text"
            placeholder="name"
            name="name"
            autoComplete="off"
            required
          />
        </div>
        <div className="categories">
          <p>
            <b>Meal url </b>
          </p>
          <input
            type="text"
            placeholder="image"
            name="image"
            autoComplete="off"
            required
          />
        </div>
        <div className="categories">
          <p>
            <b>Meal recipe</b>
          </p>
          <textarea type="text" placeholder="recipe" name="recipe" required />
        </div>
        <div className="categories">
          <p>
            <b>Meal origin </b>
          </p>
          <input
            type="text"
            placeholder="region"
            name="region"
            autoComplete="off"
            required
          />
        </div>
        <div className="form__buttons">
          <button type="submit" className="confirm">
            confirm
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => setShow(!show)}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
