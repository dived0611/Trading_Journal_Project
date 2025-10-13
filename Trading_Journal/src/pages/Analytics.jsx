import React, { useState } from 'react'
import { 
  ArrowUp, 
  ArrowDown, 
  Trophy, 
  Book, 
  Zap, 
  TrendingUp,
  Calendar
} from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [startDate, setStartDate] = useState('2024-11-01');
  const [endDate, setEndDate] = useState('2024-12-15');

  const periodOptions = [
    'Now',
    'Today',
    'This Week',
    'This Month',
    'Last 30 Days',
    'Last 90 Days',
    'Year to Date'
  ];

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
    
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    switch (period) {
      case 'Now':
        const now = new Date();
        setStartDate(formatDate(now));
        setEndDate(formatDate(now));
        break;
      case 'Today':
        setStartDate(formatDate(today));
        setEndDate(formatDate(today));
        break;
      case 'This Week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        setStartDate(formatDate(weekStart));
        setEndDate(formatDate(today));
        break;
      case 'This Month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        setStartDate(formatDate(monthStart));
        setEndDate(formatDate(today));
        break;
      case 'Last 30 Days':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        setStartDate(formatDate(thirtyDaysAgo));
        setEndDate(formatDate(today));
        break;
      case 'Last 90 Days':
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        setStartDate(formatDate(ninetyDaysAgo));
        setEndDate(formatDate(today));
        break;
      case 'Year to Date':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        setStartDate(formatDate(yearStart));
        setEndDate(formatDate(today));
        break;
      default:
        break;
    }
  };

  // Sample Profit & Loss series (USD) by date
  // this is static data for demo purposes
  // in a real app, this would come from an API or database
  // and be filtered based on the selected date range
  const plSeries = [
    { date: '2024-11-01', value: 0 },
    { date: '2024-11-05', value: 250 },
    { date: '2024-11-10', value: 520 },
    { date: '2024-11-14', value: 1120 },
    { date: '2024-11-18', value: 1050 },
    { date: '2024-11-22', value: 980 },
    { date: '2024-11-29', value: 1600 },
    { date: '2024-12-02', value: 1800 },
    { date: '2024-12-06', value: 2000 },
    { date: '2024-12-10', value: 2600 },
    { date: '2024-12-13', value: 3250 }
  ];

  const filteredPl = plSeries.filter(p => p.date >= startDate && p.date <= endDate);
  const chartLabels = filteredPl.map(p => new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
  const chartValues = filteredPl.map(p => p.value);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'P&L',
        data: chartValues,
        borderColor: 'rgb(59, 130, 246)', // tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { intersect: false, mode: 'index' }
    },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#6b7280' }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#6b7280' }
      }
    }
  };
  
  //! End sample chart data
  // Sample metrics data
  // In a real app, this would come from an API or database
  // and be calculated based on the selected date range
  const metrics = [
    {
      title: 'Total P&L',
      value: '$3,247',
      change: '+12.5%',
      icon: <ArrowUp className="w-5 h-5 text-green-500" />,
      trend: 'up',
      color: 'text-green-500'
    },
    {
      title: 'Win Rate',
      value: '73%',
      change: '+2.1%',
      icon: <Trophy className="w-5 h-5 text-blue-500" />,
      trend: 'up',
      color: 'text-green-500'
    },
    {
      title: 'Total Trades',
      value: '247',
      change: '+8 today',
      icon: <Book className="w-5 h-5 text-indigo-500" />,
      trend: 'up',
      color: 'text-green-500'
    },
    {
      title: 'Risk per Trade',
      value: '2.1%',
      change: 'Avg',
      icon: <Zap className="w-5 h-5 text-orange-500" />,
      trend: 'neutral',
      color: 'text-gray-500'
    },
    {
      title: 'Win Streak',
      value: '12',
      change: 'Current',
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      trend: 'up',
      color: 'text-green-500'
    },
    {
      title: 'Max Drawdown',
      value: '-8.5%',
      change: '-1.2%',
      icon: <ArrowDown className="w-5 h-5 text-red-500" />,
      trend: 'down',
      color: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Trading Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive performance metrics and insights</p>
          </div>
          <div className="text-sm text-gray-500">
            <span>Trading Journal</span>
            <span className="mx-2">/</span>
            <span className="font-medium">Analytics</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  {metric.icon}
                  <span className={`text-sm ${metric.color}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
                <div className="text-sm text-gray-500 mt-1">{metric.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Period Selector */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Time Period</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {periodOptions.map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodClick(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profit & Loss Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Profit & Loss Chart</h2>
              </div>
            </div>
            <div className="h-72">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Win Rate Trends */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Win Rate Trends</h2>
              </div>
            </div>
            <div className="h-72">
              <Line
                data={{
                  labels: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'],
                  datasets: [{
                    label: 'Win Rate',
                    data: [68, 72, 74, 71, 78, 75],
                    borderColor: 'rgb(16, 185, 129)', // emerald-500
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    fill: true,
                    tension: 0.35,
                    pointRadius: 0,
                    borderWidth: 3
                  }]
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    x: { ...chartOptions.scales.x },
                    y: {
                      ...chartOptions.scales.y,
                      min: 0,
                      max: 100,
                      ticks: { callback: (v) => `${v}%`, color: '#6b7280' }
                    }
                  },
                  plugins: {
                    ...chartOptions.plugins,
                    legend: { display: false }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;