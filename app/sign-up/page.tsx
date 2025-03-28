"use client";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Input, TextArea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBrowserClient } from "@/libs/supabase/browser";
import twoMenSeated from "@/public/two-men-seated.jpg";
import { Divider } from "@/components/ui/divider";
import Header from "../_components/header";
import apiClient from "@/libs/api";

export default function Page() {
  const router = useRouter();

  const supabase = createBrowserClient();

  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date().toISOString().split("T")[0],
    address: "",
    companyName: "",
    title: "",
    workEmail: "",
    instagram: "",
    facebook: "",
    benefits: "",
    reason: "",
    fashionStyle: "",
  });

  const {
    firstName,
    lastName,
    email,
    address,
    companyName,
    title,
    workEmail,
    instagram,
    facebook,
    benefits,
    reason,
    fashionStyle,
    birthDate,
  } = formValue;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    setIsDisabled(true);

    const formData = {
      ...formValue,
      socials: {
        instagram: formValue.instagram,
        facebook: formValue.facebook,
      },
    };

    // Remove instagram and facebook from formData
    delete formData.instagram;
    delete formData.facebook;

    try {
      await supabase.from("MemberApplication").insert({
        ...formData,
      });

      await apiClient.post("/send-email", {
        to: process.env.NEXT_PUBLIC_FORWARD_REPLIES_TO,
        subject: "New Member Application Received",
        text: `A new member application has been received from ${formData.firstName} ${formData.lastName}.`,
        html: `<p>A new member application has been received from ${formData.firstName} ${formData.lastName}.</p>
              <p>Details:</p>
              <ul>
                <li>First Name: ${formData.firstName}</li>
                <li>Last Name: ${formData.lastName}</li>
                <li>Email: ${formData.email}</li>
                <li>Address: ${formData.address}</li>
                <li>Company Name: ${formData.companyName}</li>
                <li>Title: ${formData.title}</li>
                <li>Work Email: ${formData.workEmail}</li>
                <li>Instagram: ${formData.socials.instagram}</li>
                <li>Facebook: ${formData.socials.facebook}</li>
                <li>Reason: ${formData.reason}</li>
                <li>Fashion Style: ${formData.fashionStyle}</li>
                <li>Benefits: ${formData.benefits}</li>
                <li>Birth Date: ${formData.birthDate}</li>
              </ul>`,
      });

      router.push("/application-success");
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Header noLinks={true} className="bg-transparent" />
      <div className="pt-[150px] max-w-[1240px] mx-auto pb-[80px] px-4 md:px-0">
        <div>
          <h2 className="text-[40px] md:text-[40px]">Members Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between gap-x-10">
              <div className="flex flex-col gap-y-5 w-full md:w-6/12">
                <div className="divider w-full md:w-[120px]"></div>
                <div className="flex justify-center gap-x-3">
                  <div className="flex-1">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    name="birthDate"
                    value={birthDate}
                    onChange={onChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Primary Address</Label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    value={address}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="divider w-full"></div>
                <div className="flex justify-center gap-x-3">
                  <div className="flex-1">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      type="text"
                      name="companyName"
                      value={companyName}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="work-email">Work Email</Label>
                  <Input
                    id="work-email"
                    type="email"
                    name="workEmail"
                    value={workEmail}
                    onChange={onChange}
                    required
                  />
                </div>

                <div>
                  <Label className="text-lg">Socials</Label>
                  <div className="space-y-3">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="ig"
                      type="text"
                      name="instagram"
                      value={instagram}
                      onChange={onChange}
                      required
                    />
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      type="text"
                      name="facebook"
                      value={facebook}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

              </div>
              <div className="h-[1000px] w-[556px] hidden md:block">
                <Image src={twoMenSeated} alt="Two well-dressed men in suits seated on a bench" height="1000"/>
              </div>
            </div>

            <Divider className="my-[50px]" />

            <div className="flex flex-col gap-y-10 pb-[60px]">
              <div className="flex flex-col md:flex-row">
                <Label htmlFor="reason" className="text-lg w-full md:w-[30%]">
                  Please briefly share why you would be a good fit for the Don Marrón Community.
                </Label>
                <TextArea
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={onChange}
                  className="flex-1"
                  placeholder="At Don Marrón, we focus on providing excellent products and services while also fostering a community of like-minded individuals."
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row">
                <Label
                  htmlFor="fashionStyle"
                  className="text-lg w-full md:w-[30%] pr-1"
                >
                  How would you describe your personal style?
                </Label>
                <TextArea
                  id="fashionStyle"
                  name="fashionStyle"
                  value={fashionStyle}
                  onChange={onChange}
                  className="flex-1"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row">
                <Label htmlFor="benefits" className="text-lg w-full md:w-[30%]">Which Don Marrón member benefits are you most interested in?</Label>
                <TextArea
                  id="benefits"
                  name="benefits"
                  value={benefits}
                  onChange={onChange}
                  placeholder="Custom Made Garments, Exclusive Member Events, Personalized Styling Consultation, Personalized Look Book, Personalized Travel Experience"
                  className="flex-1"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <Button
                className="w-full md:w-[150px]"
                type="submit"
                disabled={isDisabled}
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
