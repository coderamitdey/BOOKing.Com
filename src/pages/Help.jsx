import React from "react";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router";

const FAQS = [
  {
    question: "How do I book a hotel?",
    answer:
      "Browse hotels on the home page, click 'Book Now' on your preferred hotel, and confirm your booking.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, go to your booked hotels cart and click the 'Cancel Booking' button.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Yes, login or register to book hotels. You can explore hotels without an account.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach out via the Contact form or email us at support@booking.com.",
  },
];

const Help = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
          Help & Support
        </h1>
        <p className="text-gray-700 text-sm md:text-base">
          Find answers to common questions and get assistance quickly.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="grid gap-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="font-semibold text-blue-600 mb-1">{faq.question}</h3>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="mt-10 p-4 bg-blue-50 rounded-lg text-center">
        <h2 className="text-xl font-bold text-blue-600 mb-2">
          Still need help?
        </h2>
        <p className="text-gray-500 text-sm">
          Please email at <Link className="underline text-red-500">booking@gmail.com</Link>
        </p>
        <p>or</p>
        <button className="btn btn-accent">Contact Us <IoCall></IoCall></button>
        
      </section>
    </div>
  );
};

export default Help;
