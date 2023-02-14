import './Form.css';

function Form() {
  return (
    <div>
      <form>
        <div className="categories">
          <p>
            <b>Image name</b>
          </p>
          <input type="text" placeholder="description" />
        </div>
        <div className="categories">
          <p>
            <b>Image url </b>
          </p>
          <input type="url" placeholder="image" />
        </div>
        <div className="categories">
          <p>
            <b>Image description</b>
          </p>
          <textarea type="text" placeholder="description" />
        </div>
        <div className="categories">
          <p>
            <b>Region of origin </b>
          </p>
          <input type="text" placeholder="region" />
        </div>
        <div className="form__buttons">
          <button type="button">confirm</button>
          <button type="button">cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
