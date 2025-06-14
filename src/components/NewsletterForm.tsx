"use client";

import { useState } from "react";

interface NewsletterFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  errorMessage?: string;
  successMessage?: string;
  inputPlaceholder?: string;
}

export default function NewsletterForm({
  title = "Subscribe to the newsletter",
  description = "Get notified when new content is published",
  buttonText = "Subscribe",
  errorMessage = "An error occurred. Please try again.",
  successMessage = "Thanks for subscribing!",
  inputPlaceholder = "Enter your email",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorText, setErrorText] = useState(errorMessage);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("email", email);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });      

      const result = await response.json();

      if (!result.success) {
        throw new Error("Subscription failed");
      } else  {
        setStatus("success");
        setEmail("");
      }

    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold text-gray-100 mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-center mb-4">{description}</p>

      {status === "success" ? (
        <div className="text-green-500 font-medium py-2">{successMessage}</div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder={inputPlaceholder}
              className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : buttonText}
            </button>
          </div>
          {status === "error" && (
            <div className="text-red-500 text-sm mt-2">{errorText}</div>
          )}
        </form>
      )}
    </div>
  );
}
