"use client";
import React, { useEffect, useState } from "react";
import { createBrowserClient } from "@/libs/supabase/browser";
import { Input, TextArea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import toast from "react-hot-toast";

export default function AdminMemberPageCarousel() {
  const supabase = createBrowserClient();
  const [slides, setSlides] = useState([]);
  const [formValue, setFormValue] = useState({
    id: null,
    title: "",
    description: "",
    buttonLink: "",
    backgroundColor: "",
  });

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("MemberPageCarousel")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setSlides(data);
      }
    };

    fetchSlides();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, title, description, buttonLink, backgroundColor } = formValue;

    if (id) {
      const { data, error } = await supabase
        .from("MemberPageCarousel")
        .update({ title, description, buttonLink, backgroundColor })
        .eq("id", id)
        .single();
      if (error) {
        toast.error("Error updating slide");
        console.error(error);
      } else {
        toast.success("Slide updated successfully");
        setSlides((prev) => prev.map((item) => (item.id === id ? data : item)));
      }
    } else {
      const { data, error } = await supabase
        .from("MemberPageCarousel")
        .insert({ title, description, buttonLink, backgroundColor })
        .single();
      if (error) {
        toast.error("Error adding slide");
        console.error(error);
      } else {
        toast.success("Slide added successfully");
        setSlides((prev) => [...prev, data]);
      }
    }

    setFormValue({
      id: null,
      title: "",
      description: "",
      buttonLink: "",
      backgroundColor: "",
    });
  };

  const handleEdit = (item: any) => {
    setFormValue(item);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("MemberPageCarousel")
      .delete()
      .eq("id", Number(id));
    if (error) {
      toast.error("Error deleting slide");
      console.error(error);
    } else {
      toast.success("Slide deleted successfully");
      setSlides((prev) => prev.filter((item) => item.id !== Number(id)));
    }
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="pt-[150px] max-w-[1240px] mx-auto pb-[80px]">
      <h2 className="text-[40px]">Admin - Manage Member Page Slider</h2>
      <Divider className="my-[50px]" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              value={formValue.title}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={formValue.description}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              type="text"
              name="backgroundColor"
              value={formValue.backgroundColor}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="buttonLink">Button Link</Label>
            <Input
              id="buttonLink"
              type="text"
              name="buttonLink"
              value={formValue.buttonLink}
              onChange={onChange}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Divider className="my-[50px]" />
      <div className="space-y-5">
        {slides.map((item: any) => {
          if (!item) return null;

          return (
            <div key={item.id} className="border p-5 rounded">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.buttonLink} target="_blank">
                {item.buttonLink}
              </a>
              <div className="flex space-x-3 mt-3">
                <Button onClick={() => handleEdit(item)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
