import React from 'react';

function Form2() {
  return (
    <div>
      <form>
        <div className="categories">
          <p>
            <b>Name</b>
          </p>
          <input type="text" placeholder="name" name="name" />
        </div>
        <div className="categories">
          <p>
            <b>ingridients</b>
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
            cancel
          </button>
          <button type="button" className="cancel">
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form2;
