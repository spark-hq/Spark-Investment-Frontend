// src/pages/Settings.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Bell,
  Link as LinkIcon,
  Shield,
  Settings as SettingsIcon,
  Palette,
} from 'lucide-react';

// Import Settings Components
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PlatformConnections from '../components/settings/PlatformConnections';
import SecuritySettings from '../components/settings/SecuritySettings';
import PreferenceSettings from '../components/settings/PreferenceSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';

// Import Settings Data
import {
  userProfile,
  notificationSettings,
  connectedPlatforms,
  securitySettings,
  preferenceSettings,
  appearanceSettings,
  availableOptions,
} from '../data/settingsData';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // State for each settings section
  const [profile, setProfile] = useState(userProfile);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [platforms, setPlatforms] = useState(connectedPlatforms);
  const [security, setSecurity] = useState(securitySettings);
  const [preferences, setPreferences] = useState(preferenceSettings);
  const [appearance, setAppearance] = useState(appearanceSettings);

  // Tab configuration
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User, color: 'indigo' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'blue' },
    { id: 'platforms', name: 'Platforms', icon: LinkIcon, color: 'green' },
    { id: 'security', name: 'Security', icon: Shield, color: 'red' },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon, color: 'teal' },
    { id: 'appearance', name: 'Appearance', icon: Palette, color: 'purple' },
  ];

  // Handler functions
  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    console.log('Profile updated:', updatedProfile);
    // Here you would typically make an API call to save the data
  };

  const handleNotificationsSave = (updatedNotifications) => {
    setNotifications(updatedNotifications);
    console.log('Notifications updated:', updatedNotifications);
  };

  const handlePlatformConnect = (platformId) => {
    console.log('Connecting platform:', platformId);
    // Logic to connect a new platform
  };

  const handlePlatformDisconnect = (platformId) => {
    console.log('Disconnecting platform:', platformId);
    setPlatforms(
      platforms.map((p) =>
        p.id === platformId ? { ...p, status: 'Disconnected' } : p
      )
    );
  };

  const handlePlatformSync = async (platformId) => {
    console.log('Syncing platform:', platformId);
    // Logic to sync platform data
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleSecuritySave = (updatedSecurity) => {
    setSecurity(updatedSecurity);
    console.log('Security settings updated:', updatedSecurity);
  };

  const handlePreferencesSave = (updatedPreferences) => {
    setPreferences(updatedPreferences);
    console.log('Preferences updated:', updatedPreferences);
  };

  const handleAppearanceSave = (updatedAppearance) => {
    setAppearance(updatedAppearance);
    console.log('Appearance updated:', updatedAppearance);
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings profile={profile} onSave={handleProfileSave} />;
      case 'notifications':
        return <NotificationSettings settings={notifications} onSave={handleNotificationsSave} />;
      case 'platforms':
        return (
          <PlatformConnections
            platforms={platforms}
            onConnect={handlePlatformConnect}
            onDisconnect={handlePlatformDisconnect}
            onSync={handlePlatformSync}
          />
        );
      case 'security':
        return <SecuritySettings settings={security} onSave={handleSecuritySave} />;
      case 'preferences':
        return (
          <PreferenceSettings
            settings={preferences}
            availableOptions={availableOptions}
            onSave={handlePreferencesSave}
          />
        );
      case 'appearance':
        return <AppearanceSettings settings={appearance} onSave={handleAppearanceSave} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>

          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600">Manage your account and preferences</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;

                  // Color mapping for active tabs
                  const activeColorClasses = {
                    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300',
                    blue: 'bg-blue-100 text-blue-700 border-blue-300',
                    green: 'bg-green-100 text-green-700 border-green-300',
                    red: 'bg-red-100 text-red-700 border-red-300',
                    teal: 'bg-teal-100 text-teal-700 border-teal-300',
                    purple: 'bg-purple-100 text-purple-700 border-purple-300',
                  };

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                        isActive
                          ? `${activeColorClasses[tab.color]} border-2`
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <IconComponent size={20} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* User Info Card */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg font-bold backdrop-blur-sm">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-xs text-indigo-100">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                    ✓ KYC {profile.kycStatus}
                  </span>
                  <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                    Member since {new Date(profile.memberSince).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
