
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  views: number;
  publishedAt: string;
  duration: string;
  url: string;
  section: 'basics' | 'intermediate' | 'advanced';
}

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoSelect }) => {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Card 
          key={video.id} 
          className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-green-100 hover:border-green-300 bg-white"
          onClick={() => onVideoSelect(video)}
        >
          <CardContent className="p-4">
            {/* Horizontal layout: thumbnail left, content right */}
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-20 sm:w-40 sm:h-24 bg-gray-200 relative overflow-hidden rounded-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
              </div>
              
              {/* Content - Title Only, Center-aligned */}
              <div className="flex-1 min-w-0 flex items-center justify-center">
                <h3 className="font-medium text-gray-900 line-clamp-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300 text-sm sm:text-base text-center">
                  {video.title}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoGrid;
