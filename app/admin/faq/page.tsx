"use client";
import React, { useEffect, useState } from "react";
import { createBrowserClient } from "@/libs/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divider } from "@/components/ui/divider";
import toast from "react-hot-toast";

export default function AdminFAQPage() {
  const supabase = createBrowserClient();
  const [faqItems, setFaqItems] = useState([]);
  const [formValue, setFormValue] = useState({
    id: null,
    question: "",
    answer: "",
  });
  const [processing, setProcessing] = useState(false);

  console.log({ faqItems });

  useEffect(() => {
    const fetchFAQItems = async () => {
      const { data, error } = await supabase
        .from("FrequentlyAskedQuestions")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setFaqItems(data);
      }
    };

    fetchFAQItems();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    const { id, question, answer } = formValue;

    if (id) {
      const { data, error } = await supabase
        .from("FrequentlyAskedQuestions")
        .update({ question, answer })
        .eq("id", id)
        .select()
        .single();
      if (error) {
        toast.error("Error updating FAQ item");
        console.error(error);
      } else {
        toast.success("FAQ item updated successfully");
        setFaqItems(prev => prev.map(item => item.id === id ? data : item));
      }
    } else {
      const { data, error } = await supabase
        .from("FrequentlyAskedQuestions")
        .insert({ question, answer })
        .select()
        .single();
      if (error) {
        toast.error("Error adding FAQ item");
        console.error(error);
      } else {
        toast.success("FAQ item added successfully");
        setFaqItems((prev) => [...prev, data]);
      }
    }

    setFormValue({
      id: null,
      question: "",
      answer: "",
    });
    setProcessing(false);
  };

  const handleEdit = (item: any) => {
    setFormValue(item);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("FrequentlyAskedQuestions")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Error deleting FAQ item");
      console.error(error);
    } else {
      toast.success("FAQ item deleted successfully");
      setFaqItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="pt-[150px] max-w-[1240px] mx-auto pb-[80px]">
      <h2 className="text-[40px]">Admin - Manage FAQ Items</h2>
      <Divider className="my-[50px]" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-5">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              type="text"
              name="question"
              value={formValue.question}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="answer">Answer</Label>
            <TextArea
              id="answer"
              name="answer"
              value={formValue.answer}
              onChange={onChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <Button type="submit" disabled={processing}>Submit</Button>
        </div>
      </form>

      <Divider className="my-[50px]" />
      <div className="space-y-5">
        {faqItems.map((item) => (
          <div key={item.id} className="border p-5 rounded">
            <h3 className="text-xl font-bold">{item.question}</h3>
            <p>{item.answer}</p>
            <div className="flex space-x-3 mt-3">
              <Button onClick={() => handleEdit(item)} disabled={processing}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(item.id)} disabled={processing}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}