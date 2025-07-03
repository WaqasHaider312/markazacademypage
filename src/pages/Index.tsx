import React, { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";
import { fetchYouTubeVideos, getVideosBySection } from "@/services/youtubeService";

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');

  const sections = [
    { id: 'all', name: 'All' },
    { id: 'basics', name: 'Basics' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  // Fetch videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const fetchedVideos = await fetchYouTubeVideos();
        setVideos(fetchedVideos);
        setError(null);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Filter videos by section and search query
  const filteredVideos = useMemo(() => {
    let sectionVideos = getVideosBySection(videos, activeSection);
    
    if (!searchQuery.trim()) return sectionVideos;
    
    const query = searchQuery.toLowerCase();
    return sectionVideos.filter(video => 
      video.title.toLowerCase().includes(query)
    );
  }, [searchQuery, videos, activeSection]);

  const handleVideoClick = (video: Video) => {
    window.open(video.url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-green-600" />
          <span className="text-lg text-gray-700">Loading videos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Header with Logo and Brand */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Logo and Brand Name */}
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/15f35f2a-b037-46ed-bfd5-6bdbd64e8490.png" 
              alt="Markaz Academy Logo" 
              className="h-12 w-auto mr-3"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Markaz Academy
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-center mb-4">
            <p className="text-lg text-gray-600 font-medium">Baycho Asani Se</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search videos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 border-green-200 focus:border-green-500 focus:ring-green-500 text-sm"
            />
          </div>

          {/* Section Navigation - Horizontal Scrollable */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 hover:from-green-200 hover:to-blue-200'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Video Grid */}
        <section>
          <VideoGrid videos={filteredVideos} onVideoSelect={handleVideoClick} />
          
          {filteredVideos.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tutorials found matching "{searchQuery}"</p>
            </div>
          )}
          
          {filteredVideos.length === 0 && !searchQuery && activeSection !== 'all' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tutorials available in this section</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
