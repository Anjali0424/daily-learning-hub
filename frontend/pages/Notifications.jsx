import React, { useState, useEffect } from 'react';
import { sendNotification, getAllNotifications } from '../services/notificationService';
import { Send, Bell, Calendar } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getAllNotifications();
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await sendNotification(message);
      setMessage('');
      fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">Broadcast Center</h2>

      {/* Message Form */}
      <form onSubmit={handleSend} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 mb-10">
        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your notification message here..."
          rows="4"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none mb-4"
        />
        <button 
          type="submit"
          className="flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg"
        >
          <Send size={20} />
          Send Broadcast
        </button>
      </form>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-green-400 shrink-0">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <p className="text-gray-100 text-lg mb-2">{notif.message}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>{new Date(notif.createdAt).toLocaleString()}</span>
                <h1>Try to build this notification page</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
