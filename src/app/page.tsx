import React from "react";
import { Video } from "lucide-react";
import DownloadForm from "./components/download-form";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">SaveTikX</h1>
            <p className="text-gray-400">
              Download TikTok videos in HD, SD, or MP3
            </p>
          </div>

          <DownloadForm />
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Paste any TikTok video URL to download
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
