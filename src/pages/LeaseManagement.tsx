import { FileText, Upload, Download, Edit, Trash2, Eye, Plus, X, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';

interface LeaseTemplate {
  id: number;
  name: string;
  description: string;
  uploadDate: string;
  lastModified: string;
  fileSize: string;
  usageCount: number;
}

export default function LeaseManagement() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<LeaseTemplate | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    file: null as File | null,
  });

  // Mock lease templates - in real app, this would come from API
  const [leaseTemplates, setLeaseTemplates] = useState<LeaseTemplate[]>([
    {
      id: 1,
      name: 'Standard Residential Lease',
      description: 'Standard lease agreement for residential properties',
      uploadDate: '2024-08-15',
      lastModified: '2024-09-20',
      fileSize: '245 KB',
      usageCount: 23,
    },
    {
      id: 2,
      name: 'Month-to-Month Agreement',
      description: 'Flexible month-to-month rental agreement',
      uploadDate: '2024-07-10',
      lastModified: '2024-08-05',
      fileSize: '198 KB',
      usageCount: 12,
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUploadTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.name) {
      alert('Please provide a template name and upload a file');
      return;
    }

    // In real app, this would upload to server
    const newTemplate: LeaseTemplate = {
      id: leaseTemplates.length + 1,
      name: uploadForm.name,
      description: uploadForm.description,
      uploadDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      fileSize: `${Math.round(uploadForm.file.size / 1024)} KB`,
      usageCount: 0,
    };

    setLeaseTemplates([...leaseTemplates, newTemplate]);
    setShowUploadModal(false);
    setUploadForm({ name: '', description: '', file: null });
    alert('Lease template uploaded successfully!');
  };

  const handleDeleteTemplate = (id: number) => {
    if (confirm('Are you sure you want to delete this lease template?')) {
      setLeaseTemplates(leaseTemplates.filter(template => template.id !== id));
    }
  };

  const handlePreview = (template: LeaseTemplate) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  // Available merge fields that will be auto-populated
  const mergeFields = [
    { field: '{{TENANT_NAME}}', description: 'Tenant full name' },
    { field: '{{TENANT_EMAIL}}', description: 'Tenant email address' },
    { field: '{{TENANT_PHONE}}', description: 'Tenant phone number' },
    { field: '{{PROPERTY_ADDRESS}}', description: 'Full property address' },
    { field: '{{UNIT_NUMBER}}', description: 'Unit or apartment number' },
    { field: '{{MONTHLY_RENT}}', description: 'Monthly rent amount' },
    { field: '{{SECURITY_DEPOSIT}}', description: 'Security deposit amount' },
    { field: '{{LEASE_START_DATE}}', description: 'Lease start date' },
    { field: '{{LEASE_END_DATE}}', description: 'Lease end date' },
    { field: '{{LEASE_TERM}}', description: 'Lease term (e.g., 12 months)' },
    { field: '{{LANDLORD_NAME}}', description: 'Landlord/Owner name' },
    { field: '{{LANDLORD_PHONE}}', description: 'Landlord contact phone' },
    { field: '{{LANDLORD_EMAIL}}', description: 'Landlord contact email' },
    { field: '{{CURRENT_DATE}}', description: 'Current date' },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Lease Management</h1>
            <p className="text-gray-600">Manage and customize lease agreement templates</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Upload Template</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">How Lease Templates Work</h3>
              <p className="text-sm text-blue-700">
                Upload your lease agreement template with merge fields (like <code className="bg-blue-100 px-1 rounded">{'{{TENANT_NAME}}'}</code>). 
                When you send a lease to a tenant, we'll automatically replace these fields with their actual information.
              </p>
            </div>
          </div>
        </div>

        {/* When to Send Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">When to Send Lease Agreements</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>During Onboarding</strong> - Primary time (before move-in)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Lease Renewal</strong> - 60-90 days before expiration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Manual Resend</strong> - From Tenants page anytime</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Amendments</strong> - When terms change mid-lease</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leaseTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 mb-1">File Size</p>
                  <p className="text-sm font-semibold text-gray-900">{template.fileSize}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Modified</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(template.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Times Used</p>
                  <p className="text-sm font-semibold text-gray-900">{template.usageCount}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(template)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => {
                    // In production, this would download the template
                    alert(`Downloading ${template.name}...`);
                    console.log('Download template:', template);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Merge Fields Reference */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Edit className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Available Merge Fields</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Use these merge fields in your lease template. They will be automatically replaced with actual tenant and property data when you send the lease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mergeFields.map((field, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <code className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-mono">
                  {field.field}
                </code>
                <span className="text-sm text-gray-600">{field.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Template Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upload Lease Template</h2>
                  <p className="text-sm text-gray-600">Add a new customizable lease agreement</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUploadTemplate} className="p-6 space-y-5">
              {/* Template Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="e.g., Standard Residential Lease"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Brief description of this lease template..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Document *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {uploadForm.file ? uploadForm.file.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 10MB)</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Important Instructions
                </h3>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">•</span>
                    Include merge fields in your template (e.g., <code className="bg-yellow-100 px-1 rounded">{'{{TENANT_NAME}}'}</code>)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">•</span>
                    Supported formats: PDF, DOC, DOCX
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">•</span>
                    Fields will be automatically replaced when sending to tenants
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">•</span>
                    Review the merge fields list below for available options
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Upload Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                  <p className="text-sm text-gray-600">Template Preview</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-8 min-h-[400px]">
                <div className="max-w-3xl mx-auto bg-white p-8 shadow-sm">
                  <h1 className="text-2xl font-bold text-center mb-6">RESIDENTIAL LEASE AGREEMENT</h1>
                  
                  <p className="mb-4">
                    This Lease Agreement ("Agreement") is entered into on <span className="bg-yellow-100 px-1">{'{{CURRENT_DATE}}'}</span> between:
                  </p>
                  
                  <div className="mb-4">
                    <p className="font-semibold">LANDLORD:</p>
                    <p><span className="bg-yellow-100 px-1">{'{{LANDLORD_NAME}}'}</span></p>
                    <p>Phone: <span className="bg-yellow-100 px-1">{'{{LANDLORD_PHONE}}'}</span></p>
                    <p>Email: <span className="bg-yellow-100 px-1">{'{{LANDLORD_EMAIL}}'}</span></p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold">TENANT:</p>
                    <p><span className="bg-yellow-100 px-1">{'{{TENANT_NAME}}'}</span></p>
                    <p>Phone: <span className="bg-yellow-100 px-1">{'{{TENANT_PHONE}}'}</span></p>
                    <p>Email: <span className="bg-yellow-100 px-1">{'{{TENANT_EMAIL}}'}</span></p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold">PROPERTY:</p>
                    <p><span className="bg-yellow-100 px-1">{'{{PROPERTY_ADDRESS}}'}</span></p>
                    <p>Unit: <span className="bg-yellow-100 px-1">{'{{UNIT_NUMBER}}'}</span></p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold">LEASE TERMS:</p>
                    <p>Term: <span className="bg-yellow-100 px-1">{'{{LEASE_TERM}}'}</span></p>
                    <p>Start Date: <span className="bg-yellow-100 px-1">{'{{LEASE_START_DATE}}'}</span></p>
                    <p>End Date: <span className="bg-yellow-100 px-1">{'{{LEASE_END_DATE}}'}</span></p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold">FINANCIAL TERMS:</p>
                    <p>Monthly Rent: <span className="bg-yellow-100 px-1">{'{{MONTHLY_RENT}}'}</span></p>
                    <p>Security Deposit: <span className="bg-yellow-100 px-1">{'{{SECURITY_DEPOSIT}}'}</span></p>
                  </div>

                  <p className="text-sm text-gray-500 mt-6 italic">
                    * Yellow highlighted fields will be automatically filled with tenant and property data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
