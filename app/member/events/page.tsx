import Image from "next/image";
import dayjs from "dayjs";
import { eventbrite } from "@/libs/eventbrite";
import Link from "next/link";

type Event = {
  id: string;
  name: { text: string };
  start: { utc: string };
  logo: { url: string };
};

export default async function EventsPage() {
  const { data } = await eventbrite.get("/users/me/organizations");
  const organizationId = data.organizations[0].id;
  const { data: events } = await eventbrite.get(
    `/organizations/${organizationId}/events`,
  );

  return (
    <div className="max-w-[1240px] p-4 mx-auto">
      <div className="text-left my-4">
        <Link href="/member">Back to dashboard</Link>
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Events
      </h1>
      {events.events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          {events.events.map((event: Event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              <Image
                src={event.logo.url}
                alt={event.name.text}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {event.name.text}
                </h2>
                <p className="text-gray-600">
                  {dayjs(event.start.utc).format("MMMM DD, YYYY h:mm A")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No events for now</p>
          <Link href="/member" className="text-blue-500 hover:text-blue-700">
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}
