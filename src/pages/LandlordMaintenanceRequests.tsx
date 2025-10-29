import { useState } from 'react';
import { AlertCircle, Clock, CheckCircle, Search, Filter, MessageSquare, Send, User } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  role: 'landlord' | 'tenant';
  message: string;
  date: string;
}

interface MaintenanceRequest {
  id: number;
  title: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  description: string;
  tenant: {
    name: string;
    unit: string;
    property: string;
  };
  comments: Comment[];
}

export default function LandlordMaintenanceRequests() {
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [newComment, setNewComment] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: 1,
      title: 'Leaking faucet in kitchen',
      category: 'Plumbing',
      status: 'in-progress',
      priority: 'medium',
      date: '2025-10-20',
      description: 'The kitchen sink faucet has been leaking constantly for the past two days.',
      tenant: {
        name: 'Sarah Johnson',
        unit: 'Unit 3B',
        property: '123 Maple St',
      },
      comments: [
        {
          id: 1,
          user: 'Sarah Johnson',
          role: 'tenant',
          message: 'The leak is getting worse. It\'s now dripping every few seconds.',
          date: '2025-10-21T10:30:00',
        },
        {
          id: 2,
          user: 'John Doe',
          role: 'landlord',
          message: 'I\'ve contacted our plumber. They will visit tomorrow at 2 PM.',
          date: '2025-10-22T09:15:00',
        },
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
      tenant: {
        name: 'Mike Chen',
        unit: 'Unit 2A',
        property: '123 Maple St',
      },
      comments: [
        {
          id: 1,
          user: 'John Doe',
          role: 'landlord',
          message: 'HVAC technician scheduled for tomorrow morning.',
          date: '2025-10-16T08:00:00',
        },
        {
          id: 2,
          user: 'Mike Chen',
          role: 'tenant',
          message: 'Thank you! I\'ll be home in the morning.',
          date: '2025-10-16T08:30:00',
        },
        {
          id: 3,
          user: 'John Doe',
          role: 'landlord',
          message: 'Compressor replaced. Issue resolved. Please let me know if you have any other problems.',
          date: '2025-10-17T14:00:00',
        },
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
      tenant: {
        name: 'Emily Davis',
        unit: 'Unit 5C',
        property: '123 Maple St',
      },
      comments: [],
    },
    {
      id: 4,
      title: 'Garbage disposal not working',
      category: 'Appliances',
      status: 'pending',
      priority: 'low',
      date: '2025-10-26',
      description: 'The garbage disposal makes a humming sound but doesn\'t grind.',
      tenant: {
        name: 'Sarah Johnson',
        unit: 'Unit 3B',
        property: '123 Maple St',
      },
      comments: [],
    },
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newComment.trim()) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        const newCommentObj: Comment = {
          id: req.comments.length + 1,
          user: 'John Doe',
          role: 'landlord',
          message: newComment,
          date: new Date().toISOString(),
        };
        return {
          ...req,
          comments: [...req.comments, newCommentObj],
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setSelectedRequest(updatedRequests.find(r => r.id === selectedRequest.id) || null);
    setNewComment('');
  };

  const handleStatusChange = (requestId: number, newStatus: 'pending' | 'in-progress' | 'completed') => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    if (selectedRequest?.id === requestId) {
      setSelectedRequest(updatedRequests.find(r => r.id === requestId) || null);
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

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.tenant.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
        <p className="text-gray-600 mt-1">View and manage all tenant maintenance requests</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, tenant, or unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No maintenance requests found</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className={`bg-white rounded-xl p-5 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedRequest?.id === request.id ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{request.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{request.tenant.name}</span>
                      <span>•</span>
                      <span>{request.tenant.unit}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{request.category}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(request.status)}`}>
                    {request.status.replace('-', ' ')}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{request.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{request.comments.length} comment{request.comments.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Request Details */}
        <div className="lg:sticky lg:top-6 h-fit">
          {selectedRequest ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedRequest.title}</h2>
                    <div className="flex items-center gap-2 text-blue-100">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{selectedRequest.tenant.name}</span>
                      <span>•</span>
                      <span>{selectedRequest.tenant.unit}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getPriorityColor(selectedRequest.priority)}`}>
                    {selectedRequest.priority}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(selectedRequest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="px-2 py-1 bg-white/20 rounded">{selectedRequest.category}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Status Update */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Update Status</label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRequest.description}</p>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Comments ({selectedRequest.comments.length})</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {selectedRequest.comments.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No comments yet</p>
                    ) : (
                      selectedRequest.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`p-4 rounded-lg ${
                            comment.role === 'landlord' ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                              comment.role === 'landlord' ? 'bg-blue-600' : 'bg-green-600'
                            }`}>
                              {comment.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{comment.user}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(comment.date).toLocaleString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  hour: 'numeric', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              comment.role === 'landlord' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {comment.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Select a request to view details and add comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
