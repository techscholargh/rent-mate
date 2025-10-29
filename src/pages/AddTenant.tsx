import { ArrowLeft, Mail, Phone, MapPin, Calendar, Home, Send, User, FileText } from 'lucide-react';
import { useState } from 'react';

interface AddTenantProps {
  onBack: () => void;
  onSave: () => void;
}

export default function AddTenant({ onBack, onSave }: AddTenantProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    unitType: '',
    leaseStart: '',
    leaseEnd: '',
    rent: '',
    deposit: '',
    sendInvitation: true,
    sendLeaseAgreement: true,
  });

  // Mock properties with units - in real app, this would come from API/state
  const properties = [
    {
      id: '123-maple',
      name: '123 Maple Street',
      units: [
        { id: 'unit-1', number: 'Unit 4B', type: '2 Bedroom (1 Bathroom)', rent: '1500', available: true },
        { id: 'unit-2', number: 'Unit 2A', type: 'Single Self-Contain (Private Bathroom)', rent: '800', available: true },
        { id: 'unit-3', number: 'Unit 5C', type: '1 Bedroom Self-Contain (Chamber & Hall)', rent: '1200', available: false },
      ],
    },
    {
      id: '789-oak',
      name: '789 Oak Avenue',
      units: [
        { id: 'unit-4', number: 'Apt 101', type: '3 Bedroom (2 Bathrooms)', rent: '2000', available: true },
        { id: 'unit-5', number: 'Apt 205', type: '2 Bedroom (2 Bathrooms)', rent: '1800', available: true },
      ],
    },
    {
      id: '456-pine',
      name: '456 Pine Lane',
      units: [
        { id: 'unit-6', number: 'House', type: '4+ Bedroom', rent: '2400', available: true },
      ],
    },
  ];

  const selectedProperty = properties.find(p => p.id === formData.property);
  const availableUnits = selectedProperty?.units.filter(u => u.available) || [];
  const selectedUnit = availableUnits.find(u => u.id === formData.unit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tenant data:', formData);
    onSave();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Add New Tenant</h1>
          <p className="text-gray-600">Invite a tenant and assign them to a property</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tenant@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Assignment */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Property Assignment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="property"
                  value={formData.property}
                  onChange={(e) => {
                    handleChange(e);
                    // Reset unit when property changes
                    setFormData(prev => ({ ...prev, unit: '', unitType: '', rent: '' }));
                  }}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Select a property</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} ({property.units.filter(u => u.available).length} available units)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unit/Apartment *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={(e) => {
                  handleChange(e);
                  const unit = availableUnits.find(u => u.id === e.target.value);
                  if (unit) {
                    setFormData(prev => ({
                      ...prev,
                      unitType: unit.type,
                      rent: unit.rent,
                    }));
                  }
                }}
                required
                disabled={!formData.property}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {formData.property ? 'Select a unit' : 'Select property first'}
                </option>
                {availableUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.number} - {unit.type} (${unit.rent}/mo)
                  </option>
                ))}
              </select>
              {selectedUnit && (
                <p className="mt-2 text-sm text-green-600 font-medium">
                  ✓ {selectedUnit.type} • ${selectedUnit.rent}/month
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lease Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Lease Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lease Start Date *
              </label>
              <input
                type="date"
                name="leaseStart"
                value={formData.leaseStart}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lease End Date *
              </label>
              <input
                type="date"
                name="leaseEnd"
                value={formData.leaseEnd}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Rent *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  required
                  readOnly={!!selectedUnit}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 read-only:bg-gray-50"
                  placeholder="Auto-filled from unit"
                />
              </div>
              {selectedUnit && (
                <p className="mt-1 text-xs text-gray-500">
                  Rent amount is set by the selected unit
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Deposit *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invitation Option */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="sendInvitation"
                checked={formData.sendInvitation}
                onChange={(e) => setFormData((prev) => ({ ...prev, sendInvitation: e.target.checked }))}
                className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="sendInvitation" className="flex items-center gap-2 cursor-pointer">
                  <Send className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Send Invitation Email</span>
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  The tenant will receive an email with login credentials and instructions to access their portal.
                  They can view their lease, make payments, and submit maintenance requests.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-blue-200">
              <input
                type="checkbox"
                id="sendLeaseAgreement"
                checked={formData.sendLeaseAgreement}
                onChange={(e) => setFormData((prev) => ({ ...prev, sendLeaseAgreement: e.target.checked }))}
                className="w-5 h-5 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <label htmlFor="sendLeaseAgreement" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Send Lease Agreement</span>
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Automatically send a personalized lease agreement to the tenant's email. The template will be auto-filled with tenant and property details.
                </p>
                
                {formData.sendLeaseAgreement && (
                  <div className="mt-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Lease Template
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                      <option>Standard Residential Lease</option>
                      <option>Month-to-Month Agreement</option>
                      <option>Commercial Lease</option>
                      <option>Student Housing Lease</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Template will be customized with tenant details automatically
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Add Tenant & Send Invitation
          </button>
        </div>
      </form>
    </div>
  );
}
