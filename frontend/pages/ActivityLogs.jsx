import React, { useState, useEffect } from 'react';
import { getAllUploads } from '../services/uploadService';
import { getAllNotifications } from '../services/notificationService';
import { Clock, Tag, Calendar } from 'lucide-react';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const [uploadsRes, notifsRes] = await Promise.all([
        getAllUploads(),
        getAllNotifications()
      ]);

      const uploadLogs = uploadsRes.data.map(u => ({
        id: `upload-${u.id}`,
        action: `${u.fileType === 'image' ? 'Image' : 'Video'} Uploaded`,
        timestamp: u.uploadedAt,
        type: 'upload'
      }));

      const notifLogs = notifsRes.data.map(n => ({
        id: `notif-${n.id}`,
        action: 'Notification Sent',
        timestamp: n.createdAt,
        type: 'notification'
      }));

      const combined = [...uploadLogs, ...notifLogs].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      setLogs(combined);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">System Activity</h2>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {logs.map((log) => {
              const date = new Date(log.timestamp);
              return (
                <tr key={log.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${log.type === 'upload' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {date.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {date.toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {logs.length === 0 && !loading && (
          <div className="p-10 text-center text-gray-500">No activity recorded yet.</div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
