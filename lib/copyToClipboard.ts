export function copyToClipboard(text: string): void {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");

  // Set the value of the textarea to the provided text
  textarea.value = text;

  // Make the textarea invisible
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";

  // Append the textarea to the document body
  document.body.appendChild(textarea);

  // Select and copy the text inside the textarea
  textarea.select();
  document.execCommand("copy");

  // Remove the textarea from the document body
  document.body.removeChild(textarea);
}

// Example usage:
// copyToClipboard("Hello, world!");
