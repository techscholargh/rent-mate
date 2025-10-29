import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Home, FileText, Edit2, Save, X } from 'lucide-react';

export default function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Brother',
      phone: '+1 (555) 876-5432',
    },
    moveInDate: '2024-05-01',
    leaseEndDate: '2026-04-30',
    property: 'Sunset Apartments',
    unit: 'Unit 3B',
    address: '123 Main Street, Apt 3B',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg shadow-green-600/30"
          >
            <Edit2 className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg shadow-green-600/30"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl shadow-green-600/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 text-4xl font-bold shadow-lg">
            {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-green-100">
              <span className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                {profileData.property} - {profileData.unit}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Tenant since {new Date(profileData.moveInDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.firstName}
                    onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.lastName}
                    onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-orange-600" />
            Emergency Contact
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.emergencyContact.name}
                  onChange={(e) => setEditedData({ 
                    ...editedData, 
                    emergencyContact: { ...editedData.emergencyContact, name: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.emergencyContact.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.emergencyContact.relationship}
                  onChange={(e) => setEditedData({ 
                    ...editedData, 
                    emergencyContact: { ...editedData.emergencyContact, relationship: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.emergencyContact.relationship}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.emergencyContact.phone}
                  onChange={(e) => setEditedData({ 
                    ...editedData, 
                    emergencyContact: { ...editedData.emergencyContact, phone: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.emergencyContact.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Residence Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Residence Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property</label>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.property}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.unit}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.address}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.city}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.state}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP</label>
                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">{profileData.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            Lease Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Move-in Date</label>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                {new Date(profileData.moveInDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lease End Date</label>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                {new Date(profileData.leaseEndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Days Remaining</label>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                {Math.ceil((new Date(profileData.leaseEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Contact your property manager if you need to discuss lease renewal or have any questions about your tenancy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="text-lg font-bold mb-2">Need to update your information?</h3>
        <p className="text-gray-300">
          Some information like your property address and lease dates can only be updated by your property manager. 
          If you need to make changes to these details, please contact them directly.
        </p>
      </div>
    </div>
  );
}
