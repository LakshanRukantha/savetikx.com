import React from "react";
import { Video } from "lucide-react";
import DownloadForm from "../components/download-form";
import { Card } from "@/components/ui/card";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center p-4 mt-20 lg:mt-24">
      <div className="w-full max-w-4xl">
        <Card className="p-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">SaveTikX</h1>
            <p className="text-gray-400">
              Download TikTok videos in HD, SD, or MP3
            </p>
          </div>

          <DownloadForm />
        </Card>
      </div>
    </div>
  );
};

export default Home;
