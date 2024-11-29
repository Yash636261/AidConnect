"use client";

import React, { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { Upload, X, FileUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageCapture() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const cvRouterRef = useRef<Promise<CaptureVisionRouter> | null>(null);

  const processImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const cvRouter = await (cvRouterRef.current =
        cvRouterRef.current || CaptureVisionRouter.createInstance());

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      clearInterval(interval);
      setUploadProgress(100);

      if (resultsRef.current) {
        resultsRef.current.innerText = "";

        let barcodeFound = false;
        for (let item of result.items) {
          if (item.type === EnumCapturedResultItemType.CRIT_BARCODE) {
            const barcodeItem = item as BarcodeResultItem;
            resultsRef.current.innerText += barcodeItem.text + "\n";
            router.push(`/results?barcode=${barcodeItem.text}`);
            barcodeFound = true;
          }
        }

        if (!barcodeFound) {
          resultsRef.current.innerText = "No barcode found in this image.";
        }
      }
    } catch (ex: any) {
      setError(ex.message || "Failed to process image");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processImage(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      processImage(files[0]);
    }
  };

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(urlInput);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      await processImage(file);
    } catch (ex: any) {
      setError("Failed to load image from URL");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div
        ref={dropzoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors duration-200 ease-in-out",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          isUploading
            ? "pointer-events-none opacity-50"
            : "hover:border-blue-500"
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 bg-blue-50 rounded-full">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            ) : (
              <FileUp className="w-8 h-8 text-blue-500" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {isUploading
                ? "Processing image..."
                : "Select an image to upload"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              or drag and drop it here
            </p>
          </div>
          {!isUploading && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Select file
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*"
          />
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <button
            onClick={() => setIsUploading(false)}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm text-gray-500">Or upload from a URL</p>
        <div className="flex space-x-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUrlUpload}
            disabled={isUploading || !urlInput.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-2">
            <X className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div
        ref={resultsRef}
        className="min-h-[100px] p-4 bg-gray-50 rounded-md text-sm text-gray-700 whitespace-pre-wrap"
      />
    </div>
  );
}
