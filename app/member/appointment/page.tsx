import { redirect } from "next/navigation";
export default async function AppointmentPage() {
  redirect(process.env.NEXT_PUBLIC_CALENDLY_URL);
}
