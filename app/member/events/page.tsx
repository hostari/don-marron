import { redirect } from "next/navigation";
export default async function EventsPage() {
  redirect(process.env.NEXT_PUBLIC_EVENTS_URL);
}
