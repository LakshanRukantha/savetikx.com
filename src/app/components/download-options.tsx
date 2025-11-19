"use client";

import React from "react";
import { Download, Video, Music } from "lucide-react";
import Image from "next/image";

interface DownloadLinks {
  hd: string | null;
  sd: string | null;
  mp3: string | null;
}

interface DownloadSizes {
  hd: string | null;
  sd: string | null;
  mp3: string | null;
}

interface DownloadOptionsProps {
  links: DownloadLinks;
  sizes: DownloadSizes;
  thumbnail?: string;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  links,
  sizes,
  thumbnail,
}) => {
  const handleDirectDownload = (downloadUrl: string): void => {
    // Create a link and click it to trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
      {thumbnail && (
        <div className="rounded-xl overflow-hidden w-full sm:max-w-40 border border-gray-700">
          <Image
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-lg font-semibold text-white mb-2">
          Download Options
        </h3>

        {links.hd && (
          <button
            type="button"
            onClick={() => handleDirectDownload(links.hd!)}
            className="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold">HD Quality</div>
                <div className="text-xs text-white/80">Best quality video</div>
              </div>
            </div>
            {sizes.hd}
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        )}

        {links.sd && (
          <button
            type="button"
            onClick={() => handleDirectDownload(links.sd!)}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold">SD Quality</div>
                <div className="text-xs text-white/80">
                  Standard quality video
                </div>
              </div>
            </div>
            {sizes.sd}
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        )}

        {links.mp3 && (
          <button
            type="button"
            onClick={() => handleDirectDownload(links.mp3!)}
            className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold">MP3 Audio</div>
                <div className="text-xs text-white/80">Audio only</div>
              </div>
            </div>
            {sizes.mp3}
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DownloadOptions;
