import { useState } from 'react';
import { ArrowLeft, Upload, ChevronDown, Plus, Trash2, Home, DollarSign } from 'lucide-react';

interface AddPropertyProps {
  onBack: () => void;
  onSave: (property: PropertyData) => void;
  initialData?: PropertyData;
  isEditMode?: boolean;
}

export interface Unit {
  id: string | number;
  unitNumber: string;
  apartmentType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: string | number;
  monthlyRent: string | number;
  securityDeposit: string | number;
  isAvailable: boolean;
}

export interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  description: string;
  photos: File[] | string[];
  units: Unit[];
}

const propertyTypes = ['Apartment Building', 'House', 'Condo', 'Townhouse', 'Commercial', 'Other'];

const apartmentTypes = [
  'Single Room (Shared Bathroom)',
  'Single Self-Contain (Private Bathroom)',
  '1 Bedroom Self-Contain (Chamber & Hall)',
  '2 Bedroom (1 Bathroom)',
  '2 Bedroom (2 Bathrooms)',
  '3 Bedroom (1 Bathroom)',
  '3 Bedroom (2 Bathrooms)',
  '4+ Bedroom',
  'Studio',
  'Penthouse',
  'Other',
];

export default function AddProperty({ onBack, onSave, initialData, isEditMode = false }: AddPropertyProps) {
  const [formData, setFormData] = useState<PropertyData>(initialData || {
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'Apartment Building',
    description: '',
    photos: [],
    units: [],
  });

  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);

  const handleInputChange = (field: keyof PropertyData, value: string | Unit[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddUnit = (unit: Unit) => {
    setFormData(prev => ({
      ...prev,
      units: [...prev.units, unit],
    }));
    setShowAddUnitModal(false);
  };

  const handleDeleteUnit = (unitId: string) => {
    setFormData(prev => ({
      ...prev,
      units: prev.units.filter(u => u.id !== unitId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.units.length === 0) {
      alert('Please add at least one unit/apartment to the property');
      return;
    }
    onSave(formData);
  };

  const totalMonthlyIncome = formData.units.reduce((sum, unit) => 
    sum + (parseFloat(String(unit.monthlyRent)) || 0), 0
  );

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-gray-600">
            {isEditMode ? 'Update property details and manage rental units' : 'Add property details and define rental units'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Property Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Property Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Boston"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="MA"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="02101"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Type *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPropertyTypeDropdown(!showPropertyTypeDropdown)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-gray-900">{formData.propertyType}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {showPropertyTypeDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          handleInputChange('propertyType', type);
                          setShowPropertyTypeDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description & Amenities
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the property, parking, security, nearby facilities, etc."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Units/Apartments Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Units / Apartments</h2>
              <p className="text-sm text-gray-600 mt-1">
                Add all rental units in this property
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddUnitModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Unit
            </button>
          </div>

          {formData.units.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No units added yet</p>
              <button
                type="button"
                onClick={() => setShowAddUnitModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Add Your First Unit
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.units.map((unit) => (
                <div
                  key={unit.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">{unit.unitNumber}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          unit.isAvailable 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {unit.isAvailable ? 'Available' : 'Occupied'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{unit.apartmentType}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Bedrooms:</span>
                          <span className="ml-1 font-semibold text-gray-900">{unit.bedrooms}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Bathrooms:</span>
                          <span className="ml-1 font-semibold text-gray-900">{unit.bathrooms}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <span className="ml-1 font-semibold text-gray-900">{unit.squareFootage} sqft</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Rent:</span>
                          <span className="ml-1 font-bold text-green-600">${parseFloat(String(unit.monthlyRent)).toLocaleString()}/mo</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteUnit(String(unit.id))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Summary Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Total Units</p>
                    <p className="text-2xl font-bold text-blue-900">{formData.units.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Total Monthly Income</p>
                    <p className="text-2xl font-bold text-blue-900">${totalMonthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Available Units</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {formData.units.filter(u => u.isAvailable).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Photos */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Property Photos</h2>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">
              Click to upload <span className="text-gray-500">or drag and drop</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              PNG, JPG or JPEG (MAX. 5MB each)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="inline-block px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Save Property
          </button>
        </div>
      </form>

      {/* Add Unit Modal */}
      {showAddUnitModal && (
        <AddUnitModal
          onClose={() => setShowAddUnitModal(false)}
          onAdd={handleAddUnit}
        />
      )}
    </div>
  );
}

// Add Unit Modal Component
interface AddUnitModalProps {
  onClose: () => void;
  onAdd: (unit: Unit) => void;
}

function AddUnitModal({ onClose, onAdd }: AddUnitModalProps) {
  const [unitData, setUnitData] = useState<Partial<Unit>>({
    unitNumber: '',
    apartmentType: apartmentTypes[0],
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: '',
    monthlyRent: '',
    securityDeposit: '',
    isAvailable: true,
  });

  const [showApartmentTypeDropdown, setShowApartmentTypeDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUnit: Unit = {
      id: Date.now().toString(),
      unitNumber: unitData.unitNumber!,
      apartmentType: unitData.apartmentType!,
      bedrooms: unitData.bedrooms!,
      bathrooms: unitData.bathrooms!,
      squareFootage: unitData.squareFootage!,
      monthlyRent: unitData.monthlyRent!,
      securityDeposit: unitData.securityDeposit!,
      isAvailable: unitData.isAvailable!,
    };
    onAdd(newUnit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Unit / Apartment</h2>
          <p className="text-sm text-gray-600 mt-1">Enter the details for this rental unit</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unit Number / Name *
              </label>
              <input
                type="text"
                value={unitData.unitNumber}
                onChange={(e) => setUnitData(prev => ({ ...prev, unitNumber: e.target.value }))}
                placeholder="e.g., Unit 4B, Apt 101, Room 5"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Apartment Type *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowApartmentTypeDropdown(!showApartmentTypeDropdown)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-gray-900 text-sm">{unitData.apartmentType}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {showApartmentTypeDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {apartmentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setUnitData(prev => ({ ...prev, apartmentType: type }));
                          setShowApartmentTypeDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bedrooms *
              </label>
              <input
                type="number"
                value={unitData.bedrooms}
                onChange={(e) => setUnitData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
                min="0"
                max="10"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bathrooms *
              </label>
              <input
                type="number"
                value={unitData.bathrooms}
                onChange={(e) => setUnitData(prev => ({ ...prev, bathrooms: parseFloat(e.target.value) }))}
                min="0"
                max="5"
                step="0.5"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Square Footage *
              </label>
              <input
                type="number"
                value={unitData.squareFootage}
                onChange={(e) => setUnitData(prev => ({ ...prev, squareFootage: e.target.value }))}
                placeholder="800"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Rent *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={unitData.monthlyRent}
                  onChange={(e) => setUnitData(prev => ({ ...prev, monthlyRent: e.target.value }))}
                  placeholder="1500"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Deposit *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={unitData.securityDeposit}
                  onChange={(e) => setUnitData(prev => ({ ...prev, securityDeposit: e.target.value }))}
                  placeholder="3000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Availability Status *
              </label>
              <select
                value={unitData.isAvailable ? 'available' : 'occupied'}
                onChange={(e) => setUnitData(prev => ({ ...prev, isAvailable: e.target.value === 'available' }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">Available for Rent</option>
                <option value="occupied">Currently Occupied</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30"
            >
              Add Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
