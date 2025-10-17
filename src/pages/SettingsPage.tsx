import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Settings</h1>
        <p className="text-lg text-gray-600">Customize your experience</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
        <Settings className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings Coming Soon!</h2>
        <p className="text-gray-600">
          Theme customization, notifications, data export, and more
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
