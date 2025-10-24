import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  ArrowUp, 
  ArrowDown, 
  Trophy, 
  Book, 
  Zap, 
  TrendingUp,
  Calendar
} from 'lucide-react'
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, BarElement, ArcElement } from 'chart.js'
// import metaData from '../data/meta.json';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, BarElement, ArcElement)

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [startDate, setStartDate] = useState('2024-11-01');
  const [endDate, setEndDate] = useState('2024-12-15');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/analytics');
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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
      case 'Now': {
        const now = new Date();
        setStartDate(formatDate(now));
        setEndDate(formatDate(now));
        break;
      }
      case 'Today': {
        setStartDate(formatDate(today));
        setEndDate(formatDate(today));
        break;
      }
      case 'This Week': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        setStartDate(formatDate(weekStart));
        setEndDate(formatDate(today));
        break;
      }
      case 'This Month': {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        setStartDate(formatDate(monthStart));
        setEndDate(formatDate(today));
        break;
      }
      case 'Last 30 Days': {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        setStartDate(formatDate(thirtyDaysAgo));
        setEndDate(formatDate(today));
        break;
      }
      case 'Last 90 Days': {
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        setStartDate(formatDate(ninetyDaysAgo));
        setEndDate(formatDate(today));
        break;
      }
      case 'Year to Date': {
        const yearStart = new Date(today.getFullYear(), 0, 1);
        setStartDate(formatDate(yearStart));
        setEndDate(formatDate(today));
        break;
      }
      default:
        break;
    }
  };

  const plSeries = analyticsData?.profitLoss || [];

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
  // Additional demo datasets for the other cards (static)
  const monthlyPerformanceData = {
    labels: analyticsData?.monthlyPerformance?.map(item => item.month) || [],
    datasets: [
      {
        label: 'Monthly P&L',
        data: analyticsData?.monthlyPerformance?.map(item => item.value) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.9)'
      }
    ]
  };

  const monthlyPerformanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280' }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#6b7280' }
      }
    }
  };

  const strategyPerformanceData = {
    labels: analyticsData?.strategyPerformance?.map(item => item.strategy) || [],
    datasets: [
      {
        data: analyticsData?.strategyPerformance?.map(item => item.pnl) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',
          'rgba(45, 212, 191, 0.9)',
          'rgba(250, 204, 21, 0.9)',
          'rgba(248, 113, 113, 0.9)'
        ],
        borderWidth: 0
      }
    ]
  };

  const strategyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#6b7280', boxWidth: 12 }
      }
    }
  };

  const riskScatterData = {
    datasets: [
      {
        label: 'Risk vs Reward',
        data: analyticsData?.riskReward?.map(item => ({ x: item.risk, y: item.reward })) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.9)'
      }
    ]
  };

  const riskScatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        title: { display: true, text: 'Risk %' },
        min: 0,
        max: 3.2,
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#6b7280' }
      },
      y: {
        title: { display: true, text: 'Reward %' },
        min: 0,
        max: 7,
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#6b7280' }
      }
    }
  };
  
  const drawdownSeries = analyticsData?.drawdown || [];

  const drawdownData = {
    labels: drawdownSeries.map(p => new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Drawdown %',
        data: drawdownSeries.map(p => p.value),
        borderColor: 'rgba(248, 113, 113, 1)',
        backgroundColor: 'rgba(248, 113, 113, 0.18)',
        fill: 'origin',
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 3
      }
    ]
  };

  const drawdownOptions = {
    ...chartOptions,
    scales: {
      x: { ...chartOptions.scales.x },
      y: {
        ...chartOptions.scales.y,
        min: -15,
        max: 0,
        ticks: { color: '#6b7280', callback: (v) => `${v}%` }
      }
    }
  };

  // Session performance (horizontal bars)
  const sessionBarData = {
    labels: analyticsData?.sessionPerformance?.map(item => item.session) || [],
    datasets: [
      {
        label: 'P&L ($)',
        data: analyticsData?.sessionPerformance?.map(item => item.pnl) || [],
        backgroundColor: ['#f59e0b', '#10b981', '#60a5fa']
      }
    ]
  };

  const sessionBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#6b7280' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#6b7280' }
      }
    }
  };

  // Heatmap data from API
  const heatmapWeeks = analyticsData?.weeklyHeatmap?.weeks || [];
  const heatmapDays = analyticsData?.weeklyHeatmap?.days || [];
  const heatmapValues = analyticsData?.weeklyHeatmap?.values || [];

  const getHeatColor = (value) => {
    // map -1..1 to red..blue using simple interpolation
    const v = Math.max(-1, Math.min(1, value));
    const r = v < 0 ? 245 : 59; // red for negative, blue for positive
    const g = v < 0 ? 113 : 130;
    const b = v < 0 ? 113 : 246;
    const alpha = 0.15 + Math.abs(v) * 0.75; // stronger with magnitude
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Using metrics from API response (analyticsData.metrics)

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
          {loading ? (
            <div>Loading...</div>
          ) : analyticsData?.metrics?.map((metric, index) => {
            // Determine icon and color based on metric title and trend
            let icon;
            let color;
            
            switch (metric.title) {
              case 'Total P&L':
                icon = <ArrowUp className="w-5 h-5 text-green-500" />;
                break;
              case 'Win Rate':
                icon = <Trophy className="w-5 h-5 text-blue-500" />;
                break;
              case 'Total Trades':
                icon = <Book className="w-5 h-5 text-indigo-500" />;
                break;
              case 'Risk per Trade':
                icon = <Zap className="w-5 h-5 text-orange-500" />;
                break;
              case 'Win Streak':
                icon = <TrendingUp className="w-5 h-5 text-purple-500" />;
                break;
              case 'Max Drawdown':
                icon = <ArrowDown className="w-5 h-5 text-red-500" />;
                break;
              default:
                icon = <TrendingUp className="w-5 h-5 text-blue-500" />;
            }

            // Set color based on trend
            if (metric.trend === 'up') {
              color = 'text-green-500';
            } else if (metric.trend === 'down') {
              color = 'text-red-500';
            } else {
              color = 'text-gray-500';
            }

            // Format the value based on metric type
            let formattedValue = metric.value;
            let formattedChange = metric.change;

            if (metric.title === 'Total P&L') {
              formattedValue = `$${metric.value.toLocaleString()}`;
              formattedChange = `${metric.change > 0 ? '+' : ''}${metric.change}%`;
            } else if (metric.title === 'Win Rate') {
              formattedValue = `${metric.value}%`;
              formattedChange = `${metric.change > 0 ? '+' : ''}${metric.change}%`;
            } else if (metric.title === 'Total Trades') {
              formattedValue = metric.value.toString();
              formattedChange = `${metric.change > 0 ? '+' : ''}${metric.change} today`;
            } else if (metric.title === 'Risk per Trade') {
              formattedValue = `${metric.value}%`;
              formattedChange = 'Avg';
            } else if (metric.title === 'Win Streak') {
              formattedValue = metric.value.toString();
              formattedChange = 'Current';
            } else if (metric.title === 'Max Drawdown') {
              formattedValue = `${metric.value}%`;
              formattedChange = `${metric.change}%`;
            }

            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    {icon}
                    <span className={`text-sm ${color}`}>
                      {formattedChange}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-gray-800">{formattedValue}</div>
                  <div className="text-sm text-gray-500 mt-1">{metric.title}</div>
                </div>
              </div>
            );
          })}
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
        
        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Monthly Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Monthly Performance</h2>
              </div>
            </div>
            <div className="h-72">
              <Bar data={monthlyPerformanceData} options={monthlyPerformanceOptions} />
            </div>
          </div>

          {/* Strategy Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h2 className="text-xl font-semibold text-gray-800">Strategy Performance</h2>
              </div>
            </div>
            <div className="h-72">
              <Doughnut data={strategyPerformanceData} options={strategyOptions} />
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <h2 className="text-xl font-semibold text-gray-800">Risk Analysis</h2>
              </div>
            </div>
            <div className="h-72">
              <Scatter data={riskScatterData} options={riskScatterOptions} />
            </div>
          </div>
        </div>

        {/* Tertiary Charts/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Drawdown Analysis */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <h2 className="text-xl font-semibold text-gray-800">Drawdown Analysis</h2>
              </div>
            </div>
            <div className="h-72">
              <Line data={drawdownData} options={drawdownOptions} />
            </div>
          </div>

          {/* Weekly Heatmap */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="text-xl font-semibold text-gray-800">Weekly Heatmap</h2>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3 text-xs text-gray-500">
                <div className="h-2 w-16 rounded-l bg-rose-300" />
                <div className="h-2 w-16 bg-rose-200" />
                <div className="h-2 w-16 bg-gray-100" />
                <div className="h-2 w-16 bg-blue-200" />
                <div className="h-2 w-16 rounded-r bg-blue-400" />
                <span className="ml-2">-1 to +1</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="text-xs text-gray-500" />
                {heatmapDays.map((d) => (
                  <div key={d} className="text-xs text-gray-500 text-center">{d}</div>
                ))}
                {heatmapWeeks.map((w, wi) => (
                  <React.Fragment key={w}>
                    <div className="text-xs text-gray-500 flex items-center">{w}</div>
                    {heatmapDays.map((d, di) => (
                      <div
                        key={`${w}-${d}`}
                        className="h-8 rounded flex items-center justify-center text-[10px] text-gray-600"
                        style={{ backgroundColor: getHeatColor(heatmapValues[wi][di]) }}
                      >
                        
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Session Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h2 className="text-xl font-semibold text-gray-800">Session Performance</h2>
              </div>
            </div>
            <div className="h-72">
              <Bar data={sessionBarData} options={sessionBarOptions} />
            </div>
          </div>
        </div>

        {/* Performance Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Strategy Performance Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Strategy Performance</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2 pr-4 font-medium">Strategy</th>
                    <th className="py-2 pr-4 font-medium">Trades</th>
                    <th className="py-2 pr-4 font-medium">Win Rate</th>
                    <th className="py-2 pr-4 font-medium">Avg P&L</th>
                    <th className="py-2 pr-0 font-medium">Sharpe</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 ">
                  {analyticsData?.strategyPerformance?.map((row) => (
                    <tr key={row.name} className="border-t border-gray-100 hover:bg-blue-50 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                      <td className="py-3 pr-4">{row.strategy}</td>
                      <td className="py-3 pr-4">{row.trades}</td>
                      <td className="py-3 pr-4"><span className="text-green-600">{row.winRate}%</span></td>
                      <td className="py-3 pr-4"><span className="text-green-600">+${row.avgPL.toFixed(2)}</span></td>
                      <td className="py-3 pr-0">{row.sharpe.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Symbol Performance Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="text-xl font-semibold text-gray-800">Symbol Performance</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2 pr-4 font-medium">Symbol</th>
                    <th className="py-2 pr-4 font-medium">Trades</th>
                    <th className="py-2 pr-4 font-medium">Win Rate</th>
                    <th className="py-2 pr-4 font-medium">Total P&L</th>
                    <th className="py-2 pr-0 font-medium">Max Loss</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {analyticsData?.symbolPerformance?.map((row) => (
                    <tr key={row.symbol} className="border-t border-gray-100">
                      <td className="py-3 pr-4">{row.symbol}</td>
                      <td className="py-3 pr-4">{row.trades}</td>
                      <td className="py-3 pr-4"><span className="text-green-600">{row.winRate}%</span></td>
                      <td className="py-3 pr-4"><span className="text-green-600">+${row.pnl.toLocaleString()}</span></td>
                      <td className="py-3 pr-0"><span className="text-red-600">${row.maxLoss}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;