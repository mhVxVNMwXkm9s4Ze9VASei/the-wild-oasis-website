import ReservationUpdateForm from "@/app/_components/ReservationUpdateForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export const metadata = {
  title: "Updating Reservation",
};

export default async function Page({ params: { reservationId } }) {
  const reservation = await getBooking(reservationId);
  const cabin = await getCabin(reservation.cabin_id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <ReservationUpdateForm
        cabin={cabin}
        reservation={reservation}
      />
    </div>
  );
}
