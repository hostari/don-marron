import Link from "next/link";
import { Divider } from "@/components/ui/divider";
import "./page.css";

const ApplicationSuccessPage = () => {
  return (
    <div className="bg-image h-screen mx-0 flex">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl text-white">
          Your Application was Successfully Received
        </h1>
        <Divider className="w-[100px] bg-white" />
        <p className="pt-10 text-white">
          We will contact you via email shortly.
        </p>
        <Link href="/" className="text-white uppercase pt-20 tracking-widest">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSuccessPage;
