"use client";
import { FAQ as FAQType } from "@/lib/types/models";

interface FAQProps {  
  faqData: FAQType[];
}

export const FAQ = ({ faqData }: FAQProps) => {
  const toggleAnswer = (index: number) => {
    const answerElement = document.getElementById(`answer-${index}`);
    if (answerElement) {
      answerElement.classList.toggle('hidden');
    }
  };

  return (
    <section className="bg-[#ececeb] py-20 text-center">
      <h3 className="text-4xl text-black font-serif tracking-widest">
        Frequently Asked Questions
      </h3>
      <div className="max-w-[1240px] mx-auto pt-10">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-8">
            <button
              className="text-left w-full text-2xl font-semibold bg-white bg-opacity-50 py-4 px-6 rounded-lg mb-2"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </button>
            <div
              id={`answer-${index}`}
              className="text-left bg-white bg-opacity-50 py-4 px-6 rounded-lg hidden text-2xl whitespace-pre-line"
            >
              {faq.answer || ""}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
