import { Search, Filter, Mail, Phone, MapPin, Calendar, Plus, MoreVertical, MessageSquare, Send, X, FileText } from 'lucide-react';
import { useState } from 'react';

const tenants = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '(555) 123-4567',
    property: '123 Maple St, Unit 4B',
    leaseStart: 'Jan 15, 2024',
    leaseEnd: 'Oct 15, 2024',
    rent: 1500,
    status: 'active',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob.williams@email.com',
    phone: '(555) 234-5678',
    property: '789 Oak Ave, Apt 2',
    leaseStart: 'Mar 1, 2024',
    leaseEnd: 'Oct 28, 2024',
    rent: 1200,
    status: 'active',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@email.com',
    phone: '(555) 345-6789',
    property: '456 Pine Ln, House',
    leaseStart: 'Feb 5, 2024',
    leaseEnd: 'Nov 5, 2024',
    rent: 2400,
    status: 'active',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: 4,
    name: 'Diana Miller',
    email: 'diana.miller@email.com',
    phone: '(555) 456-7890',
    property: '321 Birch Rd, Unit 10',
    leaseStart: 'Jan 12, 2024',
    leaseEnd: 'Nov 12, 2024',
    rent: 1800,
    status: 'active',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
];

interface TenantsProps {
  onAddTenant?: () => void;
  onViewTenant?: (tenantId: number) => void;
}

export default function Tenants({ onAddTenant, onViewTenant }: TenantsProps = {}) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState<number | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<typeof tenants[0] | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'whatsapp' | 'both'>('email');

  const handleContactClick = (tenant: typeof tenants[0]) => {
    setSelectedTenant(tenant);
    setShowContactModal(true);
  };

  const handleSendLeaseClick = (tenant: typeof tenants[0]) => {
    setSelectedTenant(tenant);
    setShowLeaseModal(true);
  };

  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove all non-numeric characters
    return phone.replace(/\D/g, '');
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Tenants</h1>
          <p className="text-gray-600">Manage your tenant information</p>
        </div>
        <button
          onClick={onAddTenant}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Tenant</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenants..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors relative"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filters</span>
            
            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                <h3 className="font-semibold text-gray-900 mb-3">Filter by Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm text-gray-700">Pending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm text-gray-700">Overdue</span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={tenant.photo}
                  alt={tenant.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tenant.name}</h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Active Lease
                  </span>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowTenantMenu(showTenantMenu === tenant.id ? null : tenant.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                
                {showTenantMenu === tenant.id && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                    <button 
                      onClick={() => {
                        onViewTenant?.(tenant.id);
                        setShowTenantMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => {
                        handleSendLeaseClick(tenant);
                        setShowTenantMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Send Lease
                    </button>
                    <button 
                      onClick={() => {
                        handleContactClick(tenant);
                        setShowTenantMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Contact
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove ${tenant.name}?`)) {
                          alert('Tenant removed');
                        }
                        setShowTenantMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Remove Tenant
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{tenant.property}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl mb-4">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Lease Period</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{tenant.leaseStart} - {tenant.leaseEnd}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Monthly Rent</p>
                <p className="text-2xl font-bold text-gray-900">${tenant.rent}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => onViewTenant?.(tenant.id)}
                className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
              >
                View Details
              </button>
              <button 
                onClick={() => handleContactClick(tenant)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact {selectedTenant.name}</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Phone */}
              <a
                href={`tel:${selectedTenant.phone}`}
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all border border-blue-200 group"
              >
                <div className="p-3 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Call</p>
                  <p className="text-sm text-gray-600">{selectedTenant.phone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${selectedTenant.email}`}
                className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all border border-purple-200 group"
              >
                <div className="p-3 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{selectedTenant.email}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${formatPhoneForWhatsApp(selectedTenant.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all border border-green-200 group"
              >
                <div className="p-3 bg-green-600 rounded-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-600">Send message via WhatsApp</p>
                </div>
              </a>

              {/* Send Lease Agreement */}
              <button
                onClick={() => {
                  setShowContactModal(false);
                  handleSendLeaseClick(selectedTenant);
                }}
                className="w-full flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all border border-orange-200 group"
              >
                <div className="p-3 bg-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Send Lease Agreement</p>
                  <p className="text-sm text-gray-600">Email lease document</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Lease Agreement Modal */}
      {showLeaseModal && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Send Lease Agreement</h2>
              <button
                onClick={() => setShowLeaseModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <img
                  src={selectedTenant.photo}
                  alt={selectedTenant.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{selectedTenant.name}</p>
                  <p className="text-sm text-gray-600">{selectedTenant.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Template
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Standard Residential Lease</option>
                  <option>Month-to-Month Agreement</option>
                  <option>Commercial Lease</option>
                  <option>Lease Renewal</option>
                  <option>Lease Amendment</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Template will be auto-filled with tenant and property details
                </p>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  How would you like to send?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('email')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      deliveryMethod === 'email'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Mail className={`w-6 h-6 mx-auto mb-2 ${
                      deliveryMethod === 'email' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      deliveryMethod === 'email' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      Email
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('whatsapp')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      deliveryMethod === 'whatsapp'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <MessageSquare className={`w-6 h-6 mx-auto mb-2 ${
                      deliveryMethod === 'whatsapp' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      deliveryMethod === 'whatsapp' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      WhatsApp
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('both')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      deliveryMethod === 'both'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-center gap-1 mb-2">
                      <Mail className={`w-5 h-5 ${
                        deliveryMethod === 'both' ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <MessageSquare className={`w-5 h-5 ${
                        deliveryMethod === 'both' ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <p className={`text-sm font-semibold ${
                      deliveryMethod === 'both' ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      Both
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Add a personal message..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  defaultValue={`Hi ${selectedTenant.name.split(' ')[0]},\n\nPlease find attached your personalized lease agreement for ${selectedTenant.property}. All tenant and property details have been filled in for your convenience.\n\nPlease review and let me know if you have any questions.\n\nBest regards`}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLeaseModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would send the email
                  alert(`Lease agreement sent to ${selectedTenant.email}`);
                  setShowLeaseModal(false);
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Agreement
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
