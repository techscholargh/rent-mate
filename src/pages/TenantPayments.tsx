import { CreditCard, Calendar, Download, CheckCircle, Clock, DollarSign, Phone, Mail, AlertCircle } from 'lucide-react';

export default function TenantPayments() {
  const mockRentalInfo = {
    landlord: {
      name: 'John Smith',
      email: 'john@rentmate.com',
      phone: '+1 (555) 123-4567',
    },
  };

  const currentBalance = {
    amount: 1500,
    dueDate: '2025-11-01',
    status: 'pending',
  };

  const paymentHistory = [
    { id: 1, date: '2025-10-01', amount: 1500, status: 'paid', method: 'Credit Card', reference: 'PAY-10251', receipt: true },
    { id: 2, date: '2025-09-01', amount: 1500, status: 'paid', method: 'Bank Transfer', reference: 'PAY-09251', receipt: true },
    { id: 3, date: '2025-08-01', amount: 1500, status: 'paid', method: 'Credit Card', reference: 'PAY-08251', receipt: true },
    { id: 4, date: '2025-07-01', amount: 1500, status: 'paid', method: 'Credit Card', reference: 'PAY-07251', receipt: true },
    { id: 5, date: '2025-06-01', amount: 1500, status: 'paid', method: 'Bank Transfer', reference: 'PAY-06251', receipt: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">Manage your rent payments and view history</p>
      </div>

      {/* Current Balance Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl shadow-green-600/20">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-green-100 text-sm mb-2">Current Balance</p>
            <p className="text-5xl font-bold mb-4">${currentBalance.amount.toLocaleString()}</p>
            <div className="flex items-center gap-2 text-green-100">
              <Calendar className="w-4 h-4" />
              <span>Due: {new Date(currentBalance.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Manual Payment Processing</h3>
              <p className="text-gray-700 mb-4">
                Rent payments are processed manually by your property manager. Please contact them to arrange payment using one of the following methods:
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{mockRentalInfo.landlord.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-900">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{mockRentalInfo.landlord.email}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Your property manager will record your payment once received and it will appear in your payment history below.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.href = `mailto:${mockRentalInfo.landlord.email}?subject=Rent%20Payment%20for%20${new Date(currentBalance.dueDate).toLocaleDateString()}`}
          className="w-full sm:w-auto px-8 py-3.5 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Contact Property Manager
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Paid</p>
          <p className="text-3xl font-bold text-gray-900">
            ${(paymentHistory.reduce((sum, p) => sum + p.amount, 0)).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Payments Made</p>
          <p className="text-3xl font-bold text-gray-900">{paymentHistory.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Days Until Due</p>
          <p className="text-3xl font-bold text-gray-900">
            {Math.ceil((new Date(currentBalance.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reference</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-gray-900 font-medium">
                      {new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900 font-semibold">${payment.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{payment.method}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 font-mono text-sm">{payment.reference}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {payment.receipt && (
                      <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
