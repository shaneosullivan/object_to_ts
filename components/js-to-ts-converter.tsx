"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/SQQAtBxoYlC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DragEvent, useState } from "react";
import { convertToTs } from "@/lib/convertObjectToTs";
import JSON5 from "json5";
import { copyToClipboard } from "@/lib/copyToClipboard";

import { ToastContainer, toast } from "react-toastify";
import ExternalLinkIcon from "./ui/ExternalLinkIcon";

export function JsToTsConverter() {
  const [sourceValue, setSourceValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [isDropOver, setIsDropOver] = useState(false);

  function doConversion(source: string) {
    if (!source || !source.trim()) {
      setResultValue("");
      return;
    }
    try {
      // A more relaxed version of JSON parsing, doesn't require quotes around keys.
      const value = JSON5.parse(source);
      const tsValue = convertToTs(value);
      setResultValue(tsValue);
      return tsValue;
    } catch (err) {
      toast.error("Error: Invalid JSON", {});
    }
    return null;
  }

  function doCopy(value: string) {
    copyToClipboard(value);
    toast.success("Copied to clipboard!");
  }

  function handleDragOver(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault();

    if (!isDropOver) {
      setIsDropOver(true);
    }
  }

  function handleDragExit(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    setIsDropOver(false);
  }

  function handleDrop(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    setIsDropOver(false);

    const textFiles = getValidFiles(evt);

    if (textFiles.length > 0) {
      const reader = new FileReader();
      reader.readAsText(textFiles[0]);
      reader.addEventListener("load", () => {
        const value = reader.result ? reader.result.toString() : "";
        setSourceValue(value);
        const tsValue = doConversion(value);

        if (tsValue) {
          doCopy(tsValue);
        }
      });
    } else {
      toast.info("File drop failed");
    }
  }

  function handlePaste(evt: any) {
    evt.preventDefault();
    const value = evt.clipboardData.getData("text/plain") || "";
    setSourceValue(value);
    const tsValue = doConversion(value);
    if (tsValue) {
      doCopy(tsValue);
    }
  }

  function getValidFiles(evt: DragEvent<HTMLDivElement>) {
    const files = Array.from(evt.dataTransfer?.files || []);
    const textFiles = files.filter((file) => {
      return (
        file.type === "text/plain" ||
        file.type === "text/json" ||
        file.type === "application/json"
      );
    });
    return textFiles;
  }

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] p-4 max-h-dvh"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragExit}
    >
      <header className="flex items-center">
        <div className="p-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">
            JSON to TypeScript Converter
          </h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="fixed top-1 right-1 flex items-center gap-4">
          <a
            href="https://chofter.com"
            target="_blank"
            className="hidden sm:inline-flex inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#9333ea] px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:from-[#4f46e5] hover:to-[#7e22ce] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Built by me
            <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </a>
          <a
            href="https://github.com/shaneosullivan/object_to_ts"
            target="_blank"
          >
            <img src="/github-mark.svg" style={{ height: "36px" }} />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row w-full h-full gap-2">
          <div className="flex flex-col flex-1">
            <Textarea
              className="flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Paste your JSON here or drop a .json file"
              onChange={(evt) => setSourceValue(evt.target.value)}
              onPaste={handlePaste}
              style={
                isDropOver
                  ? {
                      backgroundImage: `url(/drop_icon.webp)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100px",
                    }
                  : undefined
              }
              value={sourceValue}
            />
          </div>
          <div className="flex justify-center sm:items-center">
            <div className="flex flex-row sm:flex-col gap-2">
              <Button
                className="bg-yellow-400 text-zinc-500 hover:bg-yellow-500 dark:bg-yellow-600 dark:text-gray-900 dark:hover:bg-yellow-700"
                onClick={() => doConversion(sourceValue)}
                disabled={!(sourceValue || "").trim()}
              >
                Convert
              </Button>
              <Button
                className="bg-gray-400 text-white hover:bg-yellow-500 dark:bg-yellow-600 dark:text-gray-900 dark:hover:bg-yellow-700"
                onClick={() => {
                  setSourceValue("");
                  setResultValue("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col flex-1 relative">
            <Textarea
              className="flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Your TypeScript will appear here."
              disabled={true}
              value={resultValue}
            />
            {resultValue ? (
              <Button
                className="absolute top-1 right-1"
                onClick={() => doCopy(resultValue)}
              >
                Copy
              </Button>
            ) : null}
          </div>
        </div>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
      />
    </div>
  );
}
