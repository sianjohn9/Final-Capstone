import React, {useState} from "react";
import FormReservation from "./FormReservation";
import { createReservation } from "../utils/api";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";


function CreateReservation() {
const history = useHistory();
const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [reservation, setReservation] = useState(initialState);
  const [reservationsError, setReservationsError] = useState(null);
  const [error, setError] = useState(null);


function submitHandler(event) {
    event.preventDefault();
      createReservation(reservation)
      .then((createdReservation) => {
        const res_date =
          createdReservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
        history.push(`/dashboard?date=` + res_date);
      })
      .catch(setError);
  }

  return (
    <main>
       <ErrorAlert error={error}/>
      <h1> Create a New Reservation </h1>
      <FormReservation reservation={reservation} setReservation={setReservation} submitHandler={submitHandler}/>
    </main>
  );
}

export default CreateReservation;
