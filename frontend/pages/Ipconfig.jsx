import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Play, Search, Trash2, Upload } from 'lucide-react';
import { deleteVideo, getVideoSubjects, getVideos } from '../services/videoService';
import { uploadVideoToSupabase } from "../src/services/videoUpload";
import axios from 'axios';

const today = new Date().toISOString().slice(0, 10);

const Ipconfig = () => {
  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
    uploadDate: today,
    file: null,
  });

  const activePrompt = useMemo(() => {
    if (searchDate) return `find --date ${searchDate}`;
    if (searchSubject) return `find --subject "${searchSubject}"`;
    return 'video-library --history';
  }, [searchDate, searchSubject]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [videosRes, subjectsRes] = await Promise.all([
        getVideos(),
        getVideoSubjects(),
      ]);
      setVideos(videosRes.data);
      setSubjects(subjectsRes.data);
      setError('');
    } catch (err) {
      console.error('Error loading videos:', err);
      setError('Unable to load video library.');
    } finally {
      setLoading(false);
    }
  };

  const loadVideos = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getVideos(filters);
      setVideos(response.data);
      setError('');
    } catch (err) {
      console.error('Error searching videos:', err);
      setError('Unable to search videos.');
    } finally {
      setLoading(false);
    }
  };

  const refreshSubjects = async () => {
    try {
      const response = await getVideoSubjects();
      setSubjects(response.data);
    } catch (err) {
      console.error('Error loading subjects:', err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

const handleUpload = async (event) => {
  event.preventDefault();

  setUploading(true);
  setMessage('');
  setError('');

  try {
    // Step 1: Upload directly to Supabase Storage
    const videoUrl = await uploadVideoToSupabase(form.file);

    // Step 2: Save metadata in backend
    const response = await axios.post(
      "http://localhost:2404/api/videos",
      {
        title: form.title,
        subject: form.subject,
        description: form.description,
        uploadDate: form.uploadDate,
        videoUrl: videoUrl,
      }
    );

    setSelectedVideo(response.data.data);

    setForm({
      title: '',
      subject: '',
      description: '',
      uploadDate: today,
      file: null,
    });

    event.target.reset();

    setMessage("Video uploaded successfully.");

    setSearchDate('');
    setSearchSubject('');

    await Promise.all([
      loadVideos(),
      refreshSubjects(),
    ]);

  } catch (err) {

    console.error(err);

    setError(
      err.response?.data?.message ||
      err.message ||
      "Upload failed"
    );

  } finally {

    setUploading(false);

  }
};

  const handleDateSearch = async (event) => {
    const value = event.target.value;
    setSearchDate(value);
    setSearchSubject('');
    await loadVideos(value ? { date: value } : {});
  };

  const handleSubjectSearch = async (event) => {
    const value = event.target.value;
    setSearchSubject(value);
    setSearchDate('');
    await loadVideos(value ? { subject: value } : {});
  };

  const handleDelete = async (video) => {
    try {
      await deleteVideo(video.id);
      if (selectedVideo?.id === video.id) {
        setSelectedVideo(null);
      }
      setMessage('Video deleted.');
      await Promise.all([
        loadVideos(searchDate ? { date: searchDate } : searchSubject ? { subject: searchSubject } : {}),
        refreshSubjects(),
      ]);
    } catch (err) {
      console.error('Error deleting video:', err);
      setError(err.response?.data?.message || 'Unable to delete video.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-12 font-mono">
      <div className="max-w-6xl mx-auto bg-black border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-xs ml-2">Terminal</span>
        </div>
        <div className="p-8 space-y-8">
          <h1 className="text-2xl font-bold border-b border-green-900 pb-2 uppercase tracking-widest text-green-500">
            Video Library
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">user@daily-hub:~$</span>
            <span>{activePrompt}</span>
            <span className="animate-pulse">_</span>
          </div>

          {(message || error) && (
            <div className={`bg-gray-900/50 p-4 rounded border ${error ? 'border-red-900 text-red-300' : 'border-green-900 text-green-300'}`}>
              {error || message}
            </div>
          )}

          <form onSubmit={handleUpload} className="bg-gray-900/50 p-6 rounded border border-gray-800 space-y-5">
            <div className="flex items-center gap-2 text-green-500 uppercase tracking-widest font-bold">
              <Upload size={18} />
              <span>Upload Video</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="block text-gray-400 text-sm">Title</span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 outline-none focus:border-green-500"
                />
              </label>
              <label className="space-y-2">
                <span className="block text-gray-400 text-sm">Subject</span>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleInputChange}
                  list="video-subjects"
                  required
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 outline-none focus:border-green-500"
                />
                <datalist id="video-subjects">
                  {subjects.map((subject) => (
                    <option key={subject} value={subject} />
                  ))}
                </datalist>
              </label>
              <label className="space-y-2">
                <span className="block text-gray-400 text-sm">Upload Date</span>
                <input
                  type="date"
                  name="uploadDate"
                  value={form.uploadDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 outline-none focus:border-green-500"
                />
              </label>
              <label className="space-y-2">
                <span className="block text-gray-400 text-sm">Video File</span>
                <input
                  type="file"
                  name="file"
                  accept="video/*"
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 file:mr-4 file:bg-gray-800 file:border-0 file:text-green-300 file:px-3 file:py-1 file:rounded"
                />
              </label>
            </div>
            <label className="space-y-2 block">
              <span className="block text-gray-400 text-sm">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 outline-none focus:border-green-500"
              />
            </label>
            <button
              type="submit"
              disabled={uploading}
              className="bg-green-900/60 border border-green-700 text-green-200 px-5 py-2 rounded hover:bg-green-800 disabled:opacity-50 transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload Button'}
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="bg-gray-900/50 p-5 rounded border border-gray-800 space-y-3">
              <span className="flex items-center gap-2 text-green-500 uppercase tracking-widest font-bold">
                <Calendar size={18} />
                Search by Date
              </span>
              <input
                type="date"
                value={searchDate}
                onChange={handleDateSearch}
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 outline-none focus:border-green-500"
              />
            </label>

            <label className="bg-gray-900/50 p-5 rounded border border-gray-800 space-y-3">
              <span className="flex items-center gap-2 text-green-500 uppercase tracking-widest font-bold">
                <Search size={18} />
                Search by Subject
              </span>
              <select
                value={searchSubject}
                onChange={handleSubjectSearch}
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-green-300 outline-none focus:border-green-500"
              >
                <option value="">All subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedVideo && (
            <div className="bg-gray-900/50 p-5 rounded border border-gray-800 space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Now Playing</p>
                <h2 className="text-xl text-green-300 font-bold">{selectedVideo.title}</h2>
                <p className="text-gray-500">{selectedVideo.subject} | {selectedVideo.uploadDate}</p>
              </div>
              <video
                src={selectedVideo.fileUrl}
                controls
                className="w-full bg-black border border-gray-700 rounded max-h-[520px]"
              />
              {selectedVideo.description && (
                <p className="text-gray-400 leading-relaxed">{selectedVideo.description}</p>
              )}
            </div>
          )}

          <div className="bg-gray-900/50 rounded border border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-800 text-green-500 uppercase tracking-widest font-bold">
              History Table
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black text-gray-400">
                  <tr>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Subject</th>
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Play</th>
                    <th className="p-4 font-medium">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="p-4 text-gray-500" colSpan="5">Loading videos...</td>
                    </tr>
                  ) : videos.length === 0 ? (
                    <tr>
                      <td className="p-4 text-gray-500" colSpan="5">No videos found.</td>
                    </tr>
                  ) : (
                    videos.map((video) => (
                      <tr key={video.id} className="border-t border-gray-800 hover:bg-black/50">
                        <td className="p-4 text-gray-300">{video.uploadDate}</td>
                        <td className="p-4 text-green-300">{video.subject}</td>
                        <td className="p-4 text-gray-300">{video.title}</td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => setSelectedVideo(video)}
                            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                          >
                            <Play size={16} />
                            Play
                          </button>
                        </td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => handleDelete(video)}
                            className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.history.back()}
              className="text-green-500 hover:text-green-300 transition-colors flex items-center gap-2"
            >
              <span>[</span>
              <span className="underline">Back to Hub</span>
              <span>]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ipconfig;
