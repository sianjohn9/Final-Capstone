import React, {useState, useEffect} from "react";
import FormReservation from "./FormReservation";
import {updateReservation} from "../utils/api";
import {readReservation} from "../utils/api"
import {useParams, useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";




function EditReservation() {

const history = useHistory();
const {reservation_id} = useParams();

//this is the formData
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



  useEffect(loadDashboard, [reservation_id]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationsError);

    return () => abortController.abort();
  }




  async function submitHandler(event) {
    event.preventDefault(); 
    try {
        const abortController = new AbortController();
    await updateReservation(reservation_id, reservation, abortController.signal)
    setReservation(initialState)
    const res_date =
          reservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
        history.push(`/dashboard?date=` + res_date);
      
    // history.push(`/dashboard?date=${formatAsDate(reservation.reservation_id)}`)

    } catch (error) {
        setError(error);
    }
    }
     
  

  return (
    <main>
        <ErrorAlert error={error}/>
      <h1> Edit a New Reservation </h1>
      <FormReservation reservation={reservation} setReservation={setReservation} submitHandler={submitHandler}/>
    </main>
  );

}

export default EditReservation;