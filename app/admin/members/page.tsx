"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { createBrowserClient } from "@/libs/supabase/browser";
import { Label } from "@/components/ui/label";
import { Divider } from "@/components/ui/divider";
import { User } from "@/lib/types/models";
import config from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

type Member = User;

export default function AdminPage() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("Members")
        .select("*")
        .order("dateAccepted", { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setMembers(data);
        const savedMemberId = localStorage.getItem("selectedMemberId");
        if (savedMemberId) {
          const savedMember = data.find(
            (member: Member) => member.id === savedMemberId,
          );
          if (savedMember) {
            setSelectedMember(savedMember);
          }
        }
      }
      setIsLoading(false);
    };

    fetchMembers();
  }, []);

  const handleFileUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    type: "wardrobe" | "contract",
  ) => {
    if (!event.target.files || !selectedMember) return;

    const file = event.target.files[0];
    const filePath = `${selectedMember.id}/${type}.pdf`;

    const { error } = await supabase.storage
      .from("files")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      toast.error(`Error uploading ${file.name}: ${error.message}`);
      console.error("Error uploading file:", error);
    } else {
      toast.success(`${file.name} uploaded successfully`);
      console.log("File uploaded successfully:", filePath);

      // Update the member record to indicate the file has been uploaded
      const updateData =
        type === "wardrobe" ? { hasWardrobe: true } : { hasContract: true };
      const { error: updateError } = await supabase
        .from("Members")
        .update(updateData)
        .eq("id", selectedMember.id);

      if (updateError) {
        toast.error(`Error updating member record: ${updateError.message}`);
        console.error("Error updating member record:", updateError);
      }
    }
  };

  const generateSignedUrl = async (
    memberId: string,
    type: "wardrobe" | "contract",
  ) => {
    const filePath = `${memberId}/${type}.pdf`;
    const { data, error } = await supabase.storage
      .from("files")
      .createSignedUrl(filePath, 86_400); // URL valid for 24 hours

    if (error) {
      toast.error(`Error generating signed URL: ${error.message}`);
      console.error("Error generating signed URL:", error);
    } else {
      window.open(data.signedUrl, "_blank");
    }
  };

  const handleMemberSelection = (member: Member) => {
    setSelectedMember(member);
    localStorage.setItem("selectedMemberId", member.id);
  };

  return (
    <div className="pt-[150px] max-w-[1240px] mx-auto pb-[80px]">
      <h2 className="text-[40px]">Admin - Members</h2>
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
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      onClick={() => handleMemberSelection(member)}
                      className="cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedMember && (
              <div className="w-2/3 p-5 border rounded">
                <p>
                  <Label>First Name:</Label> {selectedMember.firstName}
                </p>
                <p>
                  <Label>Last Name:</Label> {selectedMember.lastName}
                </p>
                <p>
                  <Label>Email:</Label> {selectedMember.email}
                </p>
                <p>
                  <Label>Date Accepted:</Label>{" "}
                  {new Date(selectedMember.dateAccepted).toLocaleString()}
                </p>
                <p>
                  <Label>Payment status:</Label>{" "}
                  {selectedMember.priceId ? "Paid" : "Not Paid"}
                </p>
                <div className="flex flex-col space-y-3 mt-5">
                  <div>
                    <Label>Wardrobe PDF:</Label>
                    {selectedMember.hasWardrobe && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          generateSignedUrl(selectedMember.id, "wardrobe")
                        }
                        className="text-blue-500 underline"
                      >
                        View Wardrobe PDF
                      </Button>
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileUpload(e, "wardrobe")}
                    />
                  </div>
                  <div>
                    <Label>Contract:</Label>
                    {selectedMember.hasContract && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          generateSignedUrl(selectedMember.id, "contract")
                        }
                        className="text-blue-500 underline"
                      >
                        View Contract
                      </Button>
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileUpload(e, "contract")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
