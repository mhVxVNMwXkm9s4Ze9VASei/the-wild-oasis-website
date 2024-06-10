"use client";

import { useOptimistic } from "react";
import { deleteReservation } from "@/app/_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingID) => {
      return currentBookings.filter((booking) => booking.id !== bookingID);
    }
  );

  async function handleDelete(bookingID) {
    optimisticDelete(bookingID);
    await deleteReservation(bookingID);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
