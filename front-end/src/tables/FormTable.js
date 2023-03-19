import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

//utils
import { createTable } from "../utils/api";

//errors
import ErrorAlert from "../layout/ErrorAlert";

function FormTable() {
  const history = useHistory();
  const [error, setError] = useState(null);

  const initialState = {
    table_name: "",
    capacity: 0,
  };

  const [table, setTable] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  //for capacity
  function changeHandlerNum({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    createTable(table)
      .then(() => {
        history.push("/");
      })
      .catch(setError);
  }

  return (
    <main>
      <ErrorAlert error={error} />
      <p>This is my pretty table for you to sit at</p>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label className="form-label" htmlFor="table_name">
              Table Name
            </label>
            <input
              className="form-control"
              id="table_name"
              name="table_name"
              type="text"
              min="2"
              value={table.table_name}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">
              Table Name must have at least two characters.
            </small>
          </div>

          <div>
            <label className="form-label" htmlFor="capacity">
              Capacity
            </label>
            <input
              className="form-control"
              id="capacity"
              name="capacity"
              type="number"
              value={table.capacity}
              onChange={changeHandlerNum}
              required={true}
            />
            <small className="form-text text-muted">
              Table must have a capacity of at least one person.
            </small>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={history.goBack}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default FormTable;
