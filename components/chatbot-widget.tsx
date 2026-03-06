"use client";

import { useEffect } from "react";

export function ChatbotWidget() {
  useEffect(() => {
    // Check if script already exists to avoid duplicate loading
    const existingScript = document.querySelector(
      'script[src="https://botza.panscience.xyz/widget/chatbot-widget.js"]'
    );
    
    if (existingScript) {
      return; // Script already loaded
    }
    
    // Create and append the script with the data attribute
    const script = document.createElement("script");
    script.src = "https://botza.panscience.xyz/widget/chatbot-widget.js";
    script.setAttribute("data-chatbot-id", "7ed736a5-667b-47a4-a388-e701d9ffe775");
    script.async = true;
    document.body.appendChild(script);
    
    // No cleanup - widget should persist across navigation
  }, []);

  return null;
}
