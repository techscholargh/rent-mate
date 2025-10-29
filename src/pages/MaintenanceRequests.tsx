import { useState } from 'react';
import { Plus, AlertCircle, Clock, CheckCircle, X, Image as ImageIcon, Send } from 'lucide-react';

interface Update {
  date: string;
  message: string;
  user: string;
}

interface MaintenanceRequest {
  id: number;
  title: string;
  category: string;
  status: string;
  priority: string;
  date: string;
  description: string;
  updates: Update[];
}

export default function MaintenanceRequests() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    images: [] as File[],
  });

  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: 1,
      title: 'Leaking faucet in kitchen',
      category: 'Plumbing',
      status: 'in-progress',
      priority: 'medium',
      date: '2025-10-20',
      description: 'The kitchen sink faucet has been leaking constantly for the past two days.',
      updates: [
        { date: '2025-10-21', message: 'Plumber assigned to your request', user: 'System' },
        { date: '2025-10-22', message: 'Scheduled for tomorrow at 2 PM', user: 'John Property Manager' },
      ],
    },
    {
      id: 2,
      title: 'AC not cooling properly',
      category: 'HVAC',
      status: 'completed',
      priority: 'high',
      date: '2025-10-15',
      description: 'Air conditioning unit is running but not cooling the apartment effectively.',
      updates: [
        { date: '2025-10-16', message: 'Technician inspected the unit', user: 'HVAC Tech' },
        { date: '2025-10-17', message: 'Compressor replaced. Issue resolved.', user: 'HVAC Tech' },
      ],
    },
    {
      id: 3,
      title: 'Broken window lock',
      category: 'Security',
      status: 'pending',
      priority: 'high',
      date: '2025-10-25',
      description: 'Window lock in bedroom is broken and won\'t secure properly.',
      updates: [],
    },
  ]);

  const categories = ['Plumbing', 'Electrical', 'HVAC', 'Appliances', 'Security', 'Structural', 'Other'];

  const handleAddComment = (requestId: number) => {
    const comment = newComment[requestId]?.trim();
    if (!comment) return;

    const updatedRequests = requests.map(req => {
      if (req.id === requestId) {
        const newUpdate: Update = {
          date: new Date().toISOString().split('T')[0],
          message: comment,
          user: 'Sarah Johnson (Tenant)',
        };
        return {
          ...req,
          updates: [...req.updates, newUpdate],
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setNewComment({ ...newComment, [requestId]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New request:', formData);
    setShowNewRequest(false);
    setFormData({
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      images: [],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-gray-600 mt-1">Submit and track your maintenance requests</p>
        </div>
        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'in-progress').length}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'completed').length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{request.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md">{request.category}</span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(request.status)}`}>
                {request.status.replace('-', ' ')}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{request.description}</p>

            {/* Updates/Comments Section */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Updates & Comments</p>
              
              {request.updates.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {request.updates.map((update, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{update.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {update.user} • {new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">No updates yet</p>
              )}

              {/* Add Comment Form */}
              {request.status !== 'completed' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(request.id);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newComment[request.id] || ''}
                    onChange={(e) => setNewComment({ ...newComment, [request.id]: e.target.value })}
                    placeholder="Add a comment or update..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newComment[request.id]?.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900">New Maintenance Request</h2>
              <button
                onClick={() => setShowNewRequest(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Request Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief description of the issue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Category and Priority */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    id="images"
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Click to upload photos</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                  {formData.images.length > 0 && (
                    <p className="mt-3 text-sm text-green-600">{formData.images.length} file(s) selected</p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequest(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/30"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
