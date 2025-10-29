import { X, Home, CreditCard, FileText, AlertCircle, User, Settings, LogOut, Building2 } from 'lucide-react';

interface TenantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function TenantSidebar({ isOpen, onClose, currentPage, onNavigate, onLogout }: TenantSidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'lease', name: 'My Lease', icon: FileText },
    { id: 'maintenance', name: 'Maintenance', icon: AlertCircle },
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">
                  RentMate
                </div>
                <p className="text-xs text-gray-500">Tenant Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Tenant Portal</p>
            <p className="text-sm font-bold text-gray-900">Unit 3B</p>
            <p className="text-xs text-gray-600">Sunset Apartments</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
