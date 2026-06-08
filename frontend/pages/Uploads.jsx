import React, { useState, useEffect } from 'react';
import { saveUpload, getAllUploads } from '../services/uploadService';
import { Image, Film, Plus, ExternalLink } from 'lucide-react';

const Uploads = () => {
  const [uploads, setUploads] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('image');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const res = await getAllUploads();
      setUploads(res.data);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileUrl) return;
    try {
      await saveUpload(fileUrl, fileType);
      setFileUrl('');
      fetchUploads();
    } catch (error) {
      console.error('Error saving upload:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Asset Management</h2>
      
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">File URL</label>
            <input 
              type="text" 
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
            <select 
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>
        <button 
          type="submit"
          className="mt-6 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg"
        >
          <Plus size={20} />
          Register Asset
        </button>
      </form>

      {/* Uploads List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.map((upload) => (
          <div key={upload.id} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden group">
            <div className="h-48 bg-gray-900 flex items-center justify-center relative">
              {upload.fileType === 'image' ? (
                <img src={upload.fileUrl} alt="Asset" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-600"><Film size={48} /></div>
              )}
              <a 
                href={upload.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink size={32} className="text-white" />
              </a>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {upload.fileType === 'image' ? <Image size={18} className="text-blue-400" /> : <Film size={18} className="text-purple-400" />}
                <span className="capitalize font-medium">{upload.fileType}</span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(upload.uploadedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;
