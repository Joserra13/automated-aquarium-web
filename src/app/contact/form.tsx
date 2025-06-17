"use client";

import { useState } from "react";

export default function Form({
  onMessageStatusChange,
}: {
  onMessageStatusChange: (status: "success" | "error" | null) => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorText, setErrorText] = useState(
    "An error occurred. Please try again."
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    onMessageStatusChange(null);

    const form = event.currentTarget; // Save reference before any await
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact-email", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        await onMessageStatusChange("success");
        setStatus("success");
        onMessageStatusChange("success");
        form.reset(); // Use saved reference
      } else {
        await onMessageStatusChange("error");
        setStatus("error");
        setErrorText(result.message || "An error occurred. Please try again.");
        onMessageStatusChange("error");
      }
    } catch (error) {
      console.warn("Error:", error);
      setStatus("error");
      setErrorText(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );

      onMessageStatusChange("error");
    }

    try {
      await fetch("/api/store-email", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.warn("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {status === "success" ? (
        <div className="text-green-600 font-medium py-2">Message sent!</div>
      ) : (
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your Name"
            name="firstName"
            required
            className="p-2 rounded border border-gray-300 text-black bg-gray-100"
            disabled={status === "loading"}
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            required
            className="p-2 rounded border border-gray-300 text-black bg-gray-100"
            disabled={status === "loading"}
          />
          <textarea
            placeholder="Your Message"
            name="body"
            required
            className="p-2 rounded border border-gray-300 text-black bg-gray-100"
            rows={5}
            disabled={status === "loading"}
          />
          <button
            type="submit"
            id="submit"
            disabled={status === "loading"}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-cyan-500 text-black hover:bg-cyan-700 hover:text-white gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50"
          >
            {status === "loading" && (
              <div className="spinner flex justify-center items-center mb-2">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
            )}
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "error" && (
            <div className="text-red-600 text-sm mt-2">{errorText}</div>
          )}
        </form>
      )}
    </div>
  );
}
