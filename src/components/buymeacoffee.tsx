"use client";
import React, { useEffect } from "react";

export default function Buymeacoffee() {
  useEffect(() => {
    const script = document.createElement("script");
    const div = document.getElementById("supportByBMC");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "automatedaquarium");
    script.setAttribute("data-description", "Feed the fish and support the project!");
    script.setAttribute(
      "data-message",
      "Feed the fish and support the project!"
    );
    script.setAttribute("data-slug", "automatedaquarium");
    script.setAttribute("data-color", "#06b6d4");
    script.setAttribute("data-emoji", "🐠");
    script.setAttribute("data-font", "Lato");
    script.setAttribute("data-text", "Feed the fish");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#ffffff");
    script.setAttribute("data-coffee-color", "#FFDD00");
	script.setAttribute("data-position", "Right");
	script.setAttribute("data-x_margin", "18");
	script.setAttribute("data-y_margin", "18");
    script.async = true;
    document.head.appendChild(script);
    script.onload = function () {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };

    if (div) {
      div.appendChild(script);
    }
  }, []);

  return <div id="supportByBMC"></div>;
}
