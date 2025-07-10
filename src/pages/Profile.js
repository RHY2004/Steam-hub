import React from 'react';
import { useRouter } from '../components/Router';
import { useAuth } from '../contexts/AuthContext';
import { Eye, User, Settings, Video, Calendar, Users } from 'lucide-react';

const Profile = () => {
  const { routeParams } = useRouter();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    username: '',
    bio: '',
    email: ''
  });

  // Mock data - In a real app, this would come from an API
  const mockUsers = [
    { 
      id: 1, 
      username: 'gamer_pro', 
      email: 'gamer@example.com', 
      role: 'streamer', 
      followers: 15420, 
      following: 234, 
      bio: 'Professional gamer and content creator', 
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      followingUsers: [3, 4],
      streamerInfo: {
        startDate: '2020-05-15',
        totalViews: 1250000
      }
    },
    // ... other mock users
  ];

  const mockStreams = [
    { id: 1, streamerId: 1, title: 'Epic Gaming Session - Battle Royale', category: 'Gaming', viewers: 1234, isLive: true, thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop' },
    { id: 4, streamerId: 1, title: 'Retro Gaming Marathon', category: 'Gaming', viewers: 0, isLive: false, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop' }
  ];

  React.useEffect(() => {
    // In a real app, this would be an API call
    const userId = parseInt(routeParams.userId);
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      setProfileUser(foundUser);
      setEditForm({
        username: foundUser.username,
        bio: foundUser.bio,
        email: foundUser.email
      });
    }
  }, [routeParams.userId]);

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">User not found</div>
      </div>
    );
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to update the user
    setProfileUser(prev => ({
      ...prev,
      ...editForm
    }));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={profileUser.avatar}
                alt={profileUser.username}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{profileUser.username}</h1>
                <div className="flex items-center space-x-4 mt-2 text-gray-400">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {profileUser.followers.toLocaleString()} followers
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {profileUser.following.toLocaleString()} following
                  </span>
                  {profileUser.role === 'streamer' && (
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {new Date(profileUser.streamerInfo.startDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                <Settings className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p className="mt-4 text-gray-300">{profileUser.bio}</p>
          )}
        </div>

        {/* Streams Section */}
        {profileUser.role === 'streamer' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Recent Streams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStreams
                .filter(stream => stream.streamerId === profileUser.id)
                .map(stream => (
                  <div key={stream.id} className="bg-gray-800 rounded-lg overflow-hidden">
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
                      <div className="mt-2 flex items-center justify-between text-gray-400 text-sm">
                        <span>{stream.category}</span>
                        <span>{new Date(stream.id).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 