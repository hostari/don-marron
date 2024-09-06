"use client";
import React, { useEffect, useState } from "react";
import { createBrowserClient } from "@/libs/supabase/browser";
import { Input, TextArea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import toast from "react-hot-toast";

export default function Form() {
  const supabase = createBrowserClient();
  const [content, setContent] = useState([]);
  const [formValue, setFormValue] = useState({
    id: null,
    section: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("LearnMoreContent").select("*");
      if (error) {
        console.error(error);
      } else {
        setContent(data);
      }
    };

    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, section, title, content, imageUrl } = formValue;

    if (id) {
      const { data, error } = await supabase
        .from("LearnMoreContent")
        .update({ section, title, content, imageUrl })
        .eq("id", id)
        .single();
      if (error) {
        toast.error("Error updating content");
        console.error(error);
      } else {
        toast.success("Content updated successfully");
        // setContent((prev) =>
        //   prev.map((item) => (item.id === id ? data : item))
        // );
      }
    } else {
      const { data, error } = await supabase
        .from("LearnMoreContent")
        .insert({ section, title, content, imageUrl })
        .single();
      if (error) {
        toast.error("Error adding content");
        console.error(error);
      } else {
        toast.success("Content added successfully");
        setContent((prev) => [...prev, data]);
      }
    }

    setFormValue({
      id: null,
      section: "",
      title: "",
      content: "",
      imageUrl: "",
    });
  };

  const handleEdit = (item: any) => {
    setFormValue(item);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("LearnMoreContent").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting content");
      console.error(error);
    } else {
      toast.success("Content deleted successfully");
      setContent((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="pt-[150px] max-w-[1240px] mx-auto pb-[80px]">
      <h2 className="text-[40px]">Admin - Manage Learn More Content</h2>
      <Divider className="my-[50px]" />
      <div className="mb-10">
        <h3 className="text-2xl font-bold">Legend</h3>
        <ul className="list-disc pl-5">
          {/* <li><strong>hero</strong>: The hero section at the top of the page.</li> */}
          <li><strong>brand</strong>: The &quot;Our Brand&quot; section.</li>
          <li><strong>membership</strong>: The &quot;Our Membership&quot; section.</li>
          {/* <li><strong>benefits</strong>: The &quot;Member Benefits&quot; section.</li> */}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-5">
          <div>
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              type="text"
              name="section"
              value={formValue.section}
              onChange={onChange}
              required
            />
          </div>
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
            <Label htmlFor="content">Content</Label>
            <TextArea
              id="content"
              name="content"
              value={formValue.content}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="text"
              name="imageUrl"
              value={formValue.imageUrl}
              onChange={onChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Divider className="my-[50px]" />
      <div className="space-y-5">
        {content.map((item) => {
          if (!item) return null;

          return (
          <div key={item.id} className="border p-5 rounded">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p>{item.content}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <div className="flex space-x-3 mt-3">
              <Button onClick={() => handleEdit(item)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  );
}