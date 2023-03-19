import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//utils
import { listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
//Layout
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import Tables from "./Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

// determine the date from the parameters if provided

function Dashboard({ date }) {
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const tableList = tables.map((table) => (
    <Tables loadDashboard={loadDashboard} key={table.table_id} table={table} />
  ));

  const reservationList = reservations.map((reservation) => (
    <Reservations
      loadDashboard={loadDashboard}
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ));

  const handlePrevious = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(date)}`);
  };

  const handleNext = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(date)}`);
  };

  const handleToday = (event) => {
    event.preventDefault();

    history.push(`/dashboard?date=${today()}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col">DATE</th>
            <th scope="col">TIME</th>
            <th scope="col">PEOPLE</th>
            <th scope="col">STATUS</th>
            <th scope="col">CHANGE THE STATUS</th>
          </tr>
        </thead>
        <tbody>{reservationList}</tbody>
      </table>

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>

      <main>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Is Occupied?</th>
              <th scope="col">Finished</th>
            </tr>
          </thead>
          <tbody>{tableList}</tbody>
        </table>
      </main>

      <div className="row">
        <div className="btn-group col d-md-flex mb-3" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-info"
            onClick={handlePrevious}
          >
            <span className="oi oi-chevron-left"></span>
            &nbsp;Previous
          </button>
          <button type="button" className="btn btn-info" onClick={handleToday}>
            Today
          </button>
          <button type="button" className="btn btn-info" onClick={handleNext}>
            Next&nbsp;
            <span className="oi oi-chevron-right"></span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
