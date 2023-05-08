/* eslint-disable no-use-before-define */
import { useContext } from 'react';
import { FormContext } from '../../Context';
import './Form.css';

export default function Form1() {
  const { show, setShow, setData } = useContext(FormContext);

  function addItems(e) {
    e.preventDefault();

    const change = new FormData(e.currentTarget);
    const images = Object.fromEntries(change.entries());
    const kadji = { ...images, id: Date.now() };
    setData((prev) => [...prev, kadji]);
  }

  return (
    <div className="formBackground">
      <form onSubmit={addItems}>
        <div className="categories">
          <p>
            <b>Image name</b>
          </p>
          <input type="text" placeholder="name" name="name" />
        </div>
        <div className="categories">
          <p>
            <b>Image url </b>
          </p>
          <input type="text" placeholder="image" name="image" />
        </div>
        <div className="categories">
          <p>
            <b>Image ingridients</b>
          </p>
          <textarea type="text" placeholder="description" name="description" />
        </div>
        <div className="categories">
          <p>
            <b>Region of origin </b>
          </p>
          <input type="text" placeholder="region" name="region" />
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
