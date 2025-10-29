const stats = [
  {
    title: 'Total Properties',
    value: '12',
    change: '+1 this month',
    changeType: 'positive',
    action: 'properties',
  },
  {
    title: 'Occupancy Rate',
    value: '83%',
    change: '-2% vs last month',
    changeType: 'negative',
    action: 'properties',
  },
  {
    title: 'Monthly Income',
    value: '$15,200',
    change: '+$500 vs last month',
    changeType: 'positive',
    action: 'payments',
  },
  {
    title: 'Overdue Rent',
    value: '$1,800',
    change: '2 tenants',
    changeType: 'warning',
    action: 'payments',
  },
];

interface StatsCardsProps {
  onNavigate?: (page: string) => void;
}

export default function StatsCards({ onNavigate }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          onClick={() => onNavigate && onNavigate(stat.action)}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2 group-hover:text-gray-700 transition-colors">{stat.title}</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
          <div className={`text-sm font-semibold flex items-center gap-1 ${
            stat.changeType === 'positive' ? 'text-green-600' :
            stat.changeType === 'negative' ? 'text-red-600' :
            'text-red-600'
          }`}>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
