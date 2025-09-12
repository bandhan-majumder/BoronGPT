import toast from "react-hot-toast";

export const handleCopyEmail = () => {
  const email = "bandhanmajumder16@gmail.com";

  // First try the modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast.success("Email copied to clipboard!");
      })
      .catch((err) => {
        // If Clipboard API fails, fall back to document.execCommand
        fallbackCopyTextToClipboard(email);
      });
  } else {
    // For non-secure contexts or browsers without Clipboard API
    fallbackCopyTextToClipboard(email);
  }
};

// Fallback approach for browsers/devices that don't support Clipboard API
const fallbackCopyTextToClipboard = (text: string) => {
  // Create text area
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Make the textarea out of viewport
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  textArea.style.opacity = "0";
  textArea.style.zIndex = "-999999";

  // For iOS devices
  textArea.contentEditable = "true";
  textArea.readOnly = false;

  document.body.appendChild(textArea);

  // Handle iOS devices specifically
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // Save current selection
    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    // Set editable
    textArea.setSelectionRange(0, 999999);
  } else {
    // For other mobile devices
    textArea.select();
  }

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      toast.success("Email copied to clipboard!");
    } else {
      toast.error("Failed to copy email.");
    }
  } catch (err) {
    toast.error("Failed to copy email.");
    console.error("Unable to copy to clipboard", err);
  }

  document.body.removeChild(textArea);
};
