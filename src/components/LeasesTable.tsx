const leases = [
  {
    tenantName: 'Alice Johnson',
    property: '123 Maple St, Unit 4B',
    leaseEndDate: 'October 15, 2024',
    status: 'Expiring Soon',
  },
  {
    tenantName: 'Bob Williams',
    property: '789 Oak Ave, Apt 2',
    leaseEndDate: 'October 28, 2024',
    status: 'Expiring Soon',
  },
  {
    tenantName: 'Charlie Brown',
    property: '456 Pine Ln, House',
    leaseEndDate: 'November 5, 2024',
    status: 'Contacted',
  },
  {
    tenantName: 'Diana Miller',
    property: '321 Birch Rd, Unit 10',
    leaseEndDate: 'November 12, 2024',
    status: 'Renewed',
  },
];

interface LeasesTableProps {
  onNavigateToTenants?: () => void;
}

export default function LeasesTable({ onNavigateToTenants }: LeasesTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Leases Expiring in Next 60 Days</h2>
        {onNavigateToTenants && (
          <button
            onClick={onNavigateToTenants}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All Tenants →
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tenant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Lease End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leases.map((lease, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{lease.tenantName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{lease.property}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{lease.leaseEndDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex px-3 py-1 text-xs font-semibold rounded-full
                    ${lease.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                      lease.status === 'Contacted' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }
                  `}>
                    {lease.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
