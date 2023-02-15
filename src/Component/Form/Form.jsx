import { useEffect, useContext } from 'react';
import { FormContext } from '../../Context';
import './Form.css';

function Form() {
  const { data, setData } = useContext(FormContext);
  const addItems = (e) => {
    e.preventDefault();

    const change = new FormData(e.currentTarget);
    const images = Object.fromEntries(change.entries());
    setData((prev) => [...prev, images]);
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data));
  }, [data]);

  return (
    <div>
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
          <input type="url" placeholder="image" name="image" />
        </div>
        <div className="categories">
          <p>
            <b>Image description</b>
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
          <button type="submit">confirm</button>
          <button type="button">cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
