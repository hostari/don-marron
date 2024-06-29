"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/libs/supabase/browser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Divider } from "@/components/ui/divider";
import { MemberApplication } from "@/lib/types/models";
import config from "@/config";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [selectedApplication, setSelectedApplication] =
    useState<MemberApplication | null>(null);
  const [applications, setApplications] = useState<MemberApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async (page: number) => {
      const { data, error } = await supabase
        .from("MemberApplication")
        .select("*")
        .eq("status", "pending")
        .range((page - 1) * 20, page * 20 - 1);
      if (error) {
        console.error(error);
      } else {
        setApplications(data);
      }
      setIsLoading(false);
    };

    fetchApplications(1); // Fetch the first page initially
  }, []);

  useEffect(() => {
    const validateAdmin = async () => {
      const { data: userData, error } = await supabase.auth.getUser();

      if (error) {
        router.push(config.auth.loginUrl);
      }

      const { data: memberData } = await supabase
        .from("Members")
        .select("role")
        .eq("email", userData?.user?.email)
        .single();

      if (memberData?.role !== "admin") {
        router.push("/member");
      }
    };

    validateAdmin();
  }, []);

  const handleApplicationStatusChange = async (
    id: string,
    status: "approved" | "rejected",
  ) => {
    try {
      const confirm = window.confirm(
        `Are you sure you want to ${status === "approved" ? "approve" : "reject"} this application?`,
      );
      if (!confirm) return;

      const { email, firstName, lastName } = applications.find(
        (app) => app.id === id,
      );
      console.log({ email });

      if (status === "approved") {
        const { error: signUpError } =
          await supabase.auth.admin.inviteUserByEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/register`,
          });

        if (signUpError) {
          console.error("Error creating Supabase auth user:", signUpError);
          return;
        }

        const { error: memberError } = await supabase
          .from("Members")
          .insert({
            email,
            firstName,
            lastName,
            dateAccepted: new Date(),
          });

        if (memberError) {
          console.error(
            "Error inserting record into member table:",
            memberError,
          );
          return;
        }
      }
      await supabase.from("MemberApplication").update({ status }).eq("id", id);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-[150px] max-w-[1240px] mx-auto pb-[80px]">
      <h2 className="text-[40px]">Admin - Approve or Reject Applications</h2>
      <Divider className="my-[50px]" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-5">
          <div className="flex">
            <div className="w-1/3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApplication(app)}
                      className="cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedApplication && (
              <div className="w-2/3 p-5 border rounded">
                <p>
                  <Label>First Name:</Label> {selectedApplication.firstName}
                </p>
                <p>
                  <Label>Last Name:</Label> {selectedApplication.lastName}
                </p>
                <p>
                  <Label>Email:</Label> {selectedApplication.email}
                </p>
                <p>
                  <Label>Reason:</Label> {selectedApplication.reason}
                </p>
                <p>
                  <Label>Address:</Label> {selectedApplication.address}
                </p>
                <p>
                  <Label>Birth Date:</Label> {selectedApplication.birthDate}
                </p>
                <p>
                  <Label>Company Name:</Label> {selectedApplication.companyName}
                </p>
                <p>
                  <Label>Created At:</Label> {selectedApplication.createdAt}
                </p>
                <p>
                  <Label>Fashion Style:</Label>{" "}
                  {selectedApplication.fashionStyle}
                </p>
                <p>
                  <Label>Lifestyle:</Label> {selectedApplication.lifestyle}
                </p>
                <p>
                  <Label>Socials:</Label>{" "}
                  {JSON.stringify(selectedApplication.socials)}
                </p>
                <p>
                  <Label>Title:</Label> {selectedApplication.title}
                </p>
                <p>
                  <Label>Work Email:</Label> {selectedApplication.workEmail}
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() =>
                      handleApplicationStatusChange(
                        selectedApplication.id,
                        "approved",
                      )
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() =>
                      handleApplicationStatusChange(
                        selectedApplication.id,
                        "rejected",
                      )
                    }
                    variant="destructive"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
