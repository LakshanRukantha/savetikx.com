"use client";

import React, { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import DownloadOptions from "./download-options";
import { DownloadResult, getDownloadLinks } from "../lib/download";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const DownloadForm: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DownloadResult | null>(null);

  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const downloadResult = await getDownloadLinks(url);
    setResult(downloadResult);
    setLoading(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <Input
            type="text"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            placeholder="Paste TikTok URL here..."
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleSubmit(e)
            }
            className="w-full"
          />
        </div>

        {result && !result.success && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400 text-sm">{result.error}</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download
            </>
          )}
        </Button>
      </div>

      {result && result.success && result.links && result.sizes && (
        <DownloadOptions
          links={result.links}
          sizes={result.sizes}
          thumbnail={result.thumbnail}
        />
      )}
    </>
  );
};

export default DownloadForm;
