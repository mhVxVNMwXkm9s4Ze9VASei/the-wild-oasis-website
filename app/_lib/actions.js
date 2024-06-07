"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function deleteReservation(bookingID) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to perform that action.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIDs = guestBookings.map((booking) => booking.id);

  if (!guestBookingIDs.includes(bookingID))
    throw new Error("You are not allowed to delete this booking.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingID);

  if (error) throw new Error("Booking could not be deleted.");

  revalidatePath("/account/reservations");
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to perform that action.");

  const national_id = formData.get("national_id");
  const [nationality, country_flag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z\d]{6,12}$/.test(national_id))
    throw new Error("National ID length is too long.");

  const updatedData = { nationality, country_flag, national_id };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
