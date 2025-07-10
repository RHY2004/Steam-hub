import React from 'react';
import { useRouter } from '../components/Router';
import { useAuth } from '../contexts/AuthContext';
import { Eye, User, Settings, Video, Calendar, Users } from 'lucide-react';
import StreamCard from '../components/StreamCard';
import LiveChat from '../components/LiveChat';

// Mock data
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
  { 
    id: 2, 
    username: 'art_master', 
    email: 'artist@example.com', 
    role: 'streamer', 
    followers: 8900, 
    following: 156, 
    bio: 'Digital artist creating amazing content', 
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c35b?w=150&h=150&fit=crop&crop=face',
    followingUsers: [1],
    streamerInfo: {
      startDate: '2021-02-10',
      totalViews: 420000
    }
  },
  { 
    id: 3, 
    username: 'music_lover', 
    email: 'music@example.com', 
    role: 'streamer', 
    followers: 22100, 
    following: 89, 
    bio: 'Music producer and DJ', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followingUsers: [1, 2],
    streamerInfo: {
      startDate: '2019-11-22',
      totalViews: 890000
    }
  },
  { 
    id: 4, 
    username: 'viewer123', 
    email: 'viewer@example.com', 
    role: 'viewer', 
    followers: 45, 
    following: 312, 
    bio: 'Love watching streams!', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followingUsers: [1, 2, 3]
  }
];

const mockStreams = [
  { id: 1, streamerId: 1, title: 'Epic Gaming Session - Battle Royale', category: 'Gaming', viewers: 1234, isLive: true, thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop' },
  { id: 2, streamerId: 2, title: 'Digital Art Creation Live', category: 'Art', viewers: 567, isLive: true, thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=225&fit=crop' },
  { id: 3, streamerId: 3, title: 'Chill Music Production Stream', category: 'Music', viewers: 890, isLive: true, thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop' },
  { id: 4, streamerId: 1, title: 'Retro Gaming Marathon', category: 'Gaming', viewers: 0, isLive: false, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop' }
];

const categories = ['All', 'Gaming', 'Art', 'Music', 'Talk Shows', 'IRL', 'Sports'];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [streams, setStreams] = React.useState(mockStreams);

  const filteredStreams = selectedCategory === 'All' 
    ? streams.filter(s => s.isLive)
    : streams.filter(s => s.isLive && s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Live Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStreams.map(stream => {
              const streamer = mockUsers.find(u => u.id === stream.streamerId);
              return <StreamCard key={stream.id} stream={stream} streamer={streamer} />;
            })}
          </div>
        </div>

        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No live streams in this category</div>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginPage = () => {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(formData.email, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-600 text-white p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-300">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const { navigate } = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer',
    bio: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = signup(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-600 text-white p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-gray-300">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-300">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Create a password"
                minLength="6"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
                minLength="6"
              />
            </div>
            <div>
              <label htmlFor="role" className="text-gray-300">Account Type</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="viewer">Viewer</option>
                <option value="streamer">Streamer</option>
              </select>
            </div>
            <div>
              <label htmlFor="bio" className="text-gray-300">Bio (Optional)</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Create Account
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-purple-400 hover:text-purple-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StreamPage = () => {
  const { routeParams } = useRouter();
  const { user: currentUser } = useAuth();
  const [stream, setStream] = React.useState(null);
  const [streamer, setStreamer] = React.useState(null);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  React.useEffect(() => {
    const foundStream = mockStreams.find(s => s.id === parseInt(routeParams.streamId));
    if (foundStream) {
      setStream(foundStream);
      const foundStreamer = mockUsers.find(u => u.id === foundStream.streamerId);
      setStreamer(foundStreamer);
    }
  }, [routeParams.streamId]);

  if (!stream || !streamer) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Stream not found</div>
    </div>;
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-xl">Live Stream Player</p>
                  <p className="text-sm opacity-75 mt-2">Video player would be integrated here</p>
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{stream.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {stream.viewers} viewers
                    </span>
                    <span>{stream.category}</span>
                    {stream.isLive && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">LIVE</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={streamer.avatar} alt={streamer.username} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="text-white font-semibold">{streamer.username}</h3>
                    <p className="text-gray-400 text-sm">{streamer.followers.toLocaleString()} followers</p>
                  </div>
                </div>

                {currentUser && currentUser.id !== streamer.id && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleFollow}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        isFollowing
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                    </button>
                    
                    {isFollowing && (
                      <button
                        onClick={toggleNotifications}
                        className={`p-2 rounded-md ${
                          notifications ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
                        }`}
                        title={notifications ? 'Disable notifications' : 'Enable notifications'}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor"/>
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {streamer.bio && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-300">{streamer.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="h-96 lg:h-[600px]">
              <LiveChat streamId={routeParams.streamId} currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  React.useEffect(() => {
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

const DevelopedBy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Developed By Team 11</h1>
        
        <div className="space-y-8">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-600 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Team Leader</h3>
                <p className="text-gray-300">Rajhans Yadav</p>
              </div>
              <div className="bg-gray-600 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Team Members</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Rudram Pandey</li>
                  <li>Vikas Kushwaha</li>
                  <li>Pranjal Rastogi</li>
                  <li>Suyash Pandey</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🔧 Project Overview</h2>
            <p className="text-gray-300 mb-4">
              This project is a <strong>full-stack Twitch Clone Web Application</strong> built using <strong>React.js</strong> and designed to deliver a real-time, interactive live-streaming experience similar to Twitch. The application provides both viewers and streamers with essential features such as live video streaming, real-time chat, user authentication, profile management, and a dynamic dashboard for content creators.
            </p>
            <p className="text-gray-300">
              The platform enables streamers to broadcast their video feed in real-time while allowing viewers to watch, chat, and interact with them simultaneously. Streamers can manage their stream title, thumbnail, and category, while viewers can follow their favorite creators, explore trending categories, and receive notifications when a stream goes live.
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🛠️ Technologies Used</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <li>• Frontend: React.js, Tailwind CSS, React Router</li>
              <li>• Authentication: Firebase Authentication</li>
              <li>• Database: Firebase Firestore / MongoDB</li>
              <li>• Live Streaming: WebRTC / MUX Integration</li>
              <li>• Real-Time Chat: Socket.IO</li>
              <li>• Backend: Node.js & Express</li>
              <li>• Deployment: Vercel / Netlify (Frontend)</li>
              <li>• Deployment: Render / Heroku (Backend)</li>
            </ul>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <li>• User Authentication & Protected Routes</li>
              <li>• Streamer Dashboard & Analytics</li>
              <li>• Live Video Streaming</li>
              <li>• Real-Time Chat with Moderation</li>
              <li>• Explore & Discover Streams</li>
              <li>• Follow System</li>
              <li>• Responsive UI Design</li>
              <li>• Role-Based Access Control</li>
              <li>• Push Notifications</li>
            </ul>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">📂 Project Structure</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <li>• components/ – Reusable UI components</li>
              <li>• pages/ – Page-level components</li>
              <li>• services/ – API functions</li>
              <li>• contexts/ – Global state management</li>
              <li>• utils/ – Helper functions</li>
              <li>• assets/ – Static files</li>
            </ul>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <p className="text-gray-300 italic">
              🚀 This project is a demonstration of modern web development capabilities combining <strong>React</strong>, <strong>real-time communication</strong>, <strong>authentication</strong>, and <strong>video streaming</strong>, aimed to give users an immersive experience in content creation and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage, LoginPage, SignupPage, StreamPage, Profile, DevelopedBy }; 