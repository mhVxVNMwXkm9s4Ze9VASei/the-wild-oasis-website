"use client";

import { updateReservation } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

export default function ReservationUpdateForm({ cabin, reservation }) {
  const { max_capacity } = cabin;
  const { id, num_guests, observations } = reservation;

  return (
    <form
      action={updateReservation}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="num_guests">How many guests?</label>
        <select
          name="num_guests"
          id="num_guests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
          defaultValue={num_guests}
        >
          <option
            value=""
            key=""
          >
            Select number of guests...
          </option>
          {Array.from({ length: max_capacity }, (_, i) => i + 1).map((x) => (
            <option
              value={x}
              key={x}
            >
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={observations}
          name="observations"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <input
          type="hidden"
          name="id"
          value={id}
        />
        <SubmitButton text="reservation" />
      </div>
    </form>
  );
}
