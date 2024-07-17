import Link from "next/link";

export default async function AppointmentPage() {
  return (
    <div className="p-4 max-w-[1240px] mx-auto">
      <div className="text-left my-4">
        <Link href="/member">Back to dashboard</Link>
      </div>
      <div
        className="calendly-inline-widget"
        data-url={`${process.env.NEXT_PUBLIC_CALENDLY_URL}?hide_gdpr_banner=1&primary_color=3f2212`}
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </div>
  );
}
