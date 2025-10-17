import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, Heart, TrendingUp } from 'lucide-react';
import { useWorkbookStore } from '../store/workbookStore';
import { saveWorkbook } from '../utils/database';

const ManifestationHub = () => {
  const navigate = useNavigate();
  const { loadWorkbooks, loadWorkbook, workbooks } = useWorkbookStore();

  const openManifestationWorkbook = async () => {
    try {
      const response = await fetch('/workbooks/manifestation-master.workbook');
      const content = await response.text();
      
      const workbook = {
        id: 'example-manifestation',
        name: '🌟 Manifestation Master',
        content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const exists = workbooks.some(wb => wb.id === workbook.id);
      if (!exists) {
        await saveWorkbook(workbook);
        await loadWorkbooks();
      }
      await loadWorkbook(workbook.id);
      navigate('/workbook/example-manifestation');
    } catch (error) {
      console.error('Failed to load Manifestation workbook:', error);
      alert('Failed to load workbook. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Manifestation Hub
        </h1>
        <p className="text-lg text-gray-600">Create your reality through focused intention & action</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
          <Sparkles size={40} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2">Vision Board</h2>
          <p className="mb-4 opacity-90">Visualize your dreams and goals</p>
          <button 
            onClick={openManifestationWorkbook}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Create Vision
          </button>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-yellow-500 rounded-2xl p-8 text-white">
          <Target size={40} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2">Goal Setting</h2>
          <p className="mb-4 opacity-90">Turn dreams into actionable plans</p>
          <button 
            onClick={openManifestationWorkbook}
            className="bg-white text-accent-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Set Goals
          </button>
        </div>

        <div className="bg-gradient-to-br from-success-500 to-green-600 rounded-2xl p-8 text-white">
          <Heart size={40} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2">Affirmations</h2>
          <p className="mb-4 opacity-90">Daily positive declarations</p>
          <button 
            onClick={openManifestationWorkbook}
            className="bg-white text-success-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            View Affirmations
          </button>
        </div>

        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
          <TrendingUp size={40} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2">Progress Tracker</h2>
          <p className="mb-4 opacity-90">Monitor your manifestation journey</p>
          <button 
            onClick={() => navigate('/analytics')}
            className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            View Progress
          </button>
        </div>
      </div>

      {/* Quick Access to Manifestation Workbook */}
      <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">📚 Manifestation Master Workbook</h3>
        <p className="text-gray-600 mb-6">
          Access the complete manifestation system with vision board templates, goal tracking, affirmations, and the 90-day challenge.
        </p>
        <button 
          onClick={openManifestationWorkbook}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Open Manifestation Workbook →
        </button>
      </div>
    </div>
  );
};

export default ManifestationHub;
