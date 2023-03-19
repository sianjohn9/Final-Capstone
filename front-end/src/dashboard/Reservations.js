import React from "react";
import { useHistory } from "react-router";
import { cancelReservation } from "../utils/api";

function Reservations({ reservation, loadDashboard }) {
  const history = useHistory();
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;


 const handleCancel = () => {
    const confirmBox = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmBox === true) {
      cancelReservation( reservation, reservation_id)
        .then(() => history.go())
     
        .catch((error) => console.log("error", error));
    }
    return null;
  };

  return (
    <>
      <tr key={reservation_id}>
        <td className="rowBorder">{reservation_id}</td>
        <td className="rowBorder">
          {last_name}, {first_name}
        </td>
        <td className="rowBorder">{mobile_number}</td>
        <td className="rowBorder">{reservation_date}</td>
        <td className="rowBorder">{reservation_time}</td>
        <td className="rowBorder">{people}</td>
        <td data-reservation-id-status={reservation_id} className="rowBorder">
        Currently:  {status}
        </td>
        <td>
          {status === "booked" ?  
          <div>
            <a
              href={`/reservations/${reservation_id}/seat`}
              type="button"
              className="btn btn-primary mx-2"
            >
              Seat
            </a>
            <a
              href={`/reservations/${reservation_id}/edit`}
              type="button"
              className="btn btn-secondary mx-2"
            >
              Edit
            </a>
            <button type="button" className="btn btn-warning mx-2" data-reservation-id-cancel={reservation.reservation_id}
            onClick={handleCancel}
            >Cancel</button>
          </div>: null  
            
          }
        </td>
      </tr>
    </>
  );
}

export default Reservations;
