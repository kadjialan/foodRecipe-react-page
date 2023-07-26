import React, { useContext, useState } from 'react';
import './Modal.css';
import { FormContext } from '../../Context';

export default function Modal() {
  const { data, setData, setDeleteIdem, numb } = useContext(FormContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function erase(id) {
    setButtonDisabled(true);
    const temp = data.filter((elements) => {
      return elements.id !== id;
    });
    setTimeout(setData(temp), 3000);

    setTimeout(() => {
      setDeleteIdem(false);
    }, 1000);
  }
  return (
    <div className="delete-form">
      <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <div className="icon-box">
                <i className="material-icons">&#10005; </i>
              </div>
              <h4 className="modal-title w-100">Are you sure?</h4>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete these recipe? This process cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setDeleteIdem(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => erase(numb)}
                disabled={buttonDisabled}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
