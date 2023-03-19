import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

//errors
import ErrorAlert from "../layout/ErrorAlert";
//utils
import { listTables, seatTable } from "../utils/api";

function SeatTable() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const resId = Number(reservation_id);

  const [tableId, setTableId] = useState("");
  const [updateTableError, setUpdateTableError] = useState(null);

  const [tables, setTables] = useState([]);

  useEffect(loadTables, [resId]);

  function loadTables() {
    const abortController = new AbortController();

    setUpdateTableError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setUpdateTableError);

    return () => abortController.abort();
  }

  const rows = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const changeHandler = ({ target }) => {
    setTableId(Number(target.value));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    setUpdateTableError(null);

    //does the table_id in the api.js seatTable need to match this one
    seatTable(reservation_id, tableId, abortController.signal)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(setUpdateTableError);

    return () => abortController.abort();
  };

  return (
    <div>
      <div>Seat Reservation at a table</div>
      <ErrorAlert error={updateTableError} />
      <form onSubmit={submitHandler}>
        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <select
              className="custom-select mr-sm-2"
              required
              name="table_id"
              onChange={changeHandler}
            >
              <option defaultValue={0}>Choose...</option>

              {rows}
            </select>
          </div>

          <div className="col-auto my-1">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={history.goBack}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SeatTable;
