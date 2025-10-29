import { Menu, Bell, User } from 'lucide-react';

interface TenantHeaderProps {
  onMenuClick: () => void;
  onNotificationClick: () => void;
}

export default function TenantHeader({ onMenuClick, onNotificationClick }: TenantHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="text-lg font-bold text-gray-900">Sarah Johnson</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notification Button */}
            <button
              onClick={onNotificationClick}
              className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700 group-hover:text-green-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Profile Button */}
            <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg shadow-green-600/30">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">Sarah J.</p>
                <p className="text-xs text-gray-500">Tenant</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
