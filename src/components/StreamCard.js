import React from 'react';
import { Link } from './Router';
import { Eye } from 'lucide-react';

const StreamCard = ({ stream, streamer }) => {
  if (!streamer) return null;

  return (
    <Link to={`/stream/${stream.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
        <div className="relative">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full aspect-video object-cover"
          />
          {stream.isLive && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
              LIVE
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {stream.viewers}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold truncate">{stream.title}</h3>
          <div className="flex items-center mt-2">
            <img
              src={streamer.avatar}
              alt={streamer.username}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-gray-400 text-sm">{streamer.username}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-gray-400 text-sm">{stream.category}</span>
            <span className="text-gray-400 text-sm">{streamer.followers.toLocaleString()} followers</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StreamCard; 