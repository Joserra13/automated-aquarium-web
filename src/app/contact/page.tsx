/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useCallback } from "react";
import Form from "./form";

export default function Contact() {
  const [messageStatus, setMessageStatus] = useState<
    "success" | "error" | null
  >(null);

  const handleMessageStatusChange = useCallback((status: "success" | "error" | null) => {
    setMessageStatus(status);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-items-center p-4 sm:p-8 pb-12 sm:pb-20 gap-8 sm:gap-16 pt-16 sm:pt-32 px-4 sm:px-12 md:px-32">
      {/* Hero Section with Background Image */}
      <main className="w-full sm:w-1/2 flex items-center justify-center relative h-64 sm:h-[500px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/contact.webp')" }}
        />

        {/* Content Centered */}
        <div
          className="relative z-10 text-white text-center p-4 sm:p-8 rounded-lg"
          style={{ backgroundColor: "rgba(17, 24, 39, 0.75)" }}
        >
          <h1 className="text-xl sm:text-4xl font-semibold">Contact Us</h1>
        </div>
      </main>

      {/* Form Section */}
      <main className="w-full sm:w-1/2 flex flex-col gap-4 sm:gap-8 items-center sm:items-start">
        <div className="flex flex-col gap-4 items-center sm:items-center w-full px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
            We'd love to hear from you!
          </h2>
          {/* Show message based on state */}
          <h3
            className={`text-green-600 ${
              messageStatus === "success" ? "block" : "hidden"
            }`}
          >
            Message sent!
          </h3>
          <h3
            className={`text-red-600 ${
              messageStatus === "error" ? "block" : "hidden"
            }`}
          >
            Error sending message!
          </h3>
          <Form onMessageStatusChange={handleMessageStatusChange} />
        </div>
      </main>
    </div>
  );
}