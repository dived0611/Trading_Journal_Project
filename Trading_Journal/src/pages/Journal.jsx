import React, { useState } from 'react'

const Journal = () => {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState('Today')
  const [selectedTrades, setSelectedTrades] = useState([])
  const [selectedTradeDetail, setSelectedTradeDetail] = useState(null)

  const metrics = [
    {
      icon: "📊",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      value: "247",
      label: "Total Trades",
      color: "text-gray-900"
    },
    {
      icon: "🏆",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      value: "73%",
      label: "Win Rate",
      color: "text-gray-900"
    },
    {
      icon: "💰",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      value: "+$3,247",
      label: "Total P&L",
      color: "text-green-600"
    },
    {
      icon: "⚡",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      value: "2.1%",
      label: "Avg Risk",
      color: "text-gray-900"
    }
  ]

  const dateRanges = ['Today', 'This Week', 'This Month', 'Last 30 Days']

  // Sample trade data
  const trades = [
    {
      id: 1,
      date: '2024-12-15',
      time: '14:30 EST',
      symbol: 'EURUSD',
      session: 'NY',
      type: 'Buy',
      entry: '1.08450',
      exit: '1.08720',
      pnl: '+$27.00',
      status: 'Closed',
      tags: ['Breakout', 'Trending']
    },
    {
      id: 2,
      date: '2024-12-14',
      time: '09:15 EST',
      symbol: 'GBPUSD',
      session: 'London',
      type: 'Sell',
      entry: '1.26580',
      exit: '1.26320',
      pnl: '+$52.40',
      status: 'Closed',
      tags: ['Retest']
    }
  ]

  const handleTradeSelect = (tradeId) => {
    const newSelectedTrades = selectedTrades.includes(tradeId) 
      ? selectedTrades.filter(id => id !== tradeId)
      : [...selectedTrades, tradeId]
    
    setSelectedTrades(newSelectedTrades)
    setSelectAll(newSelectedTrades.length === trades.length)
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setSelectedTrades(newSelectAll ? trades.map(trade => trade.id) : [])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="shadow-lg p-4 rounded-lg flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Hey, John Doe</h1>
              <p className="text-gray-600">Welcome to your trading journal</p>
            </div>
          </div>
          <button className='px-4 py-2 bg-[#1d7ed1] text-white rounded-lg hover:bg-[#1666ab] transition-colors flex items-center gap-2'>
            Add Trade
          </button>
        </div>
        
        <div className='w-full p-4 mt-4 bg-white rounded-lg shadow-sm'>
          <h1 className='text-[30px]'>Trading Journal</h1>
          <p>Manage and analyze your detailed trade entries</p>
        </div>

        {/* Metrics Cards */}
        <div className='mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {metrics.map((metric, index) => (
              <div key={index} className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex items-center gap-4 mb-3'>
                  <div className={`w-12 h-12 rounded-full ${metric.iconBg} flex items-center justify-center`}>
                    <span className={`text-xl ${metric.iconColor}`}>{metric.icon}</span>
                  </div>
                  <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                </div>
                <p className='text-gray-600 text-sm'>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className='mt-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            {/* Header with Filter Icon and Refresh */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                  </svg>
                </div>
                <h2 className='text-lg font-semibold text-gray-900'>Search & Filter</h2>
              </div>
              <button className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
                <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                </svg>
              </button>
            </div>
            
            {/* Search Bar */}
            <div className='mb-4'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search trades...'
                  className='w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
                <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </div>
            </div>
            
            {/* Filter Row */}
            <div className='flex flex-col lg:flex-row gap-4 mb-4'>
              {/* Dropdowns */}
              <select className='px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500'>
                <option>All Symbols</option>
              </select>
              <select className='px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500'>
                <option>All Sessions</option>
              </select>
              <select className='px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500'>
                <option>All Status</option>
              </select>
              
              {/* Date Inputs */}
              <div className='relative'>
                <input
                  type='text'
                  placeholder='jj/mm/aaaa'
                  className='px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500'
                />
                <svg className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='jj/mm/aaaa'
                  className='px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500'
                />
                <svg className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
            </div>
            
            {/* Date Range Buttons */}
            <div className='flex flex-wrap gap-2'>
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedDateRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDateRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trade Table */}
        <div className='mt-6'>
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-4 py-3 text-left'>
                      <input
                        type='checkbox'
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500'
                      />
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                      <div className='flex items-center gap-1'>
                        Date
                        <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' />
                        </svg>
                      </div>
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                      <div className='flex items-center gap-1'>
                        Symbol
                        <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' />
                        </svg>
                      </div>
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Type</th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Entry</th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Exit</th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                      <div className='flex items-center gap-1'>
                        P&L
                        <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' />
                        </svg>
                      </div>
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Status</th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Tags</th>
                    <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {trades.map((trade) => (
                    <tr key={trade.id} className='hover:bg-gray-50 cursor-pointer' onClick={() => setSelectedTradeDetail(trade)}>
                      <td className='px-4 py-4' onClick={(e) => e.stopPropagation()}>
                        <input
                          type='checkbox'
                          checked={selectedTrades.includes(trade.id)}
                          onChange={() => handleTradeSelect(trade.id)}
                          className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500'
                        />
                      </td>
                      <td className='px-4 py-4'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>{trade.date}</div>
                          <div className='text-sm text-gray-500'>{trade.time}</div>
                        </div>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-semibold text-gray-900'>{trade.symbol}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            trade.session === 'NY' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {trade.session}
                          </span>
                        </div>
                      </td>
                      <td className='px-4 py-4'>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          trade.type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-900'>{trade.entry}</td>
                      <td className='px-4 py-4 text-sm text-gray-900'>{trade.exit}</td>
                      <td className='px-4 py-4'>
                        <span className='text-sm font-medium text-green-600'>{trade.pnl}</span>
                      </td>
                      <td className='px-4 py-4'>
                        <span className='px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'>
                          {trade.status}
                        </span>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='flex gap-1 flex-wrap'>
                          {trade.tags.map((tag, index) => (
                            <span key={index} className={`px-2 py-1 text-xs font-medium rounded-full ${
                              tag === 'Breakout' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className='px-4 py-4' onClick={(e) => e.stopPropagation()}>
                        <div className='flex items-center gap-2'>
                          <button className='p-1 text-gray-400 hover:text-gray-600 transition-colors'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                            </svg>
                          </button>
                          <button className='p-1 text-gray-400 hover:text-red-600 transition-colors'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                            </svg>
                          </button>
                          <button className='p-1 text-gray-400 hover:text-gray-600 transition-colors'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Trade View */}
        {selectedTradeDetail && (
          <div className='mt-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold text-gray-900'>
                Trade Details - {selectedTradeDetail.symbol} ({selectedTradeDetail.date})
              </h2>
              <button 
                onClick={() => setSelectedTradeDetail(null)}
                className='p-2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            {/* 2x2 Grid Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Top Row */}
              
              {/* Trade Notes - Top Left */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex items-center gap-2 mb-4'>
                  <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z' />
                  </svg>
                  <h3 className='text-lg font-semibold text-gray-900'>Trade Notes</h3>
                </div>
                
                {/* Notes Sections */}
                <div className='space-y-4'>
                  <div className='flex gap-3'>
                    <div className='w-1 bg-blue-500 rounded-full'></div>
                    <div>
                      <h4 className='font-medium text-gray-900 mb-1'>Entry Analysis</h4>
                      <p className='text-sm text-gray-600'>Perfect breakout setup on EURUSD during NY session. Price broke above key resistance at 1.08400 with strong volume.</p>
                    </div>
                  </div>
                  
                  <div className='flex gap-3'>
                    <div className='w-1 bg-green-500 rounded-full'></div>
                    <div>
                      <h4 className='font-medium text-gray-900 mb-1'>Trade Management</h4>
                      <p className='text-sm text-gray-600'>Entry was clean with tight stop loss below the breakout level. Moved stop to breakeven after 50 pips profit.</p>
                    </div>
                  </div>
                  
                  <div className='flex gap-3'>
                    <div className='w-1 bg-purple-500 rounded-full'></div>
                    <div>
                      <h4 className='font-medium text-gray-900 mb-1'>Exit Strategy</h4>
                      <p className='text-sm text-gray-600'>Target hit within 2 hours as expected. Closed at 1.08720 for +270 pips profit.</p>
                    </div>
                  </div>
                  
                  <div className='flex gap-3'>
                    <div className='w-1 bg-orange-500 rounded-full'></div>
                    <div>
                      <h4 className='font-medium text-gray-900 mb-1'>Lessons Learned</h4>
                      <p className='text-sm text-gray-600'>Patience paid off waiting for the perfect setup. High volume breakout confirmed the move.</p>
                    </div>
                  </div>
                </div>
                
                {/* Interactive Elements */}
                <div className='mt-6 pt-4 border-t border-gray-200 flex items-center justify-between'>
                  <div className='flex gap-4'>
                    <button className='flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                      </svg>
                      <span className='text-sm font-medium'>Edit Notes</span>
                    </button>
                    <div className='flex items-center gap-2 text-gray-500'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      <span className='text-sm'>Confident</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-500'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' />
                      </svg>
                      <span className='text-sm'>Excellent</span>
                    </div>
                  </div>
                  <span className='text-xs text-gray-400'>Updated 2 hours ago</span>
                </div>
              </div>

              {/* Screenshots - Top Right */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Screenshots</h3>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer'>
                  <svg className='w-12 h-12 text-gray-400 mx-auto mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  <p className='text-gray-600 mb-2'>Drag & drop images or click to upload</p>
                  <button className='text-blue-600 hover:text-blue-700 font-medium'>Browse Files</button>
                </div>
                
                {/* Image Placeholders */}
                <div className='grid grid-cols-3 gap-3 mt-4'>
                  <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200'>
                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative'>
                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <button className='absolute bottom-1 right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                      </svg>
                    </button>
                  </div>
                  <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200'>
                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
              {/* Risk Management - Bottom Left */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Risk Management</h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-white p-4 rounded-lg border border-gray-200'>
                    <label className='text-sm text-gray-600 block mb-1'>Position Size</label>
                    <span className='text-lg font-bold text-gray-900'>0.10 lots</span>
                  </div>
                  <div className='bg-white p-4 rounded-lg border border-gray-200'>
                    <label className='text-sm text-gray-600 block mb-1'>Risk %</label>
                    <span className='text-lg font-bold text-gray-900'>2.0%</span>
                  </div>
                  <div className='bg-white p-4 rounded-lg border border-gray-200'>
                    <label className='text-sm text-gray-600 block mb-1'>Stop Loss</label>
                    <span className='text-lg font-bold text-gray-900'>1.08200</span>
                  </div>
                  <div className='bg-white p-4 rounded-lg border border-gray-200'>
                    <label className='text-sm text-gray-600 block mb-1'>Take Profit</label>
                    <span className='text-lg font-bold text-gray-900'>1.08750</span>
                  </div>
                </div>
              </div>
              
              {/* Trade Timeline - Bottom Right */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Trade Timeline</h3>
                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <div className='w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0'></div>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>Trade Opened</div>
                      <div className='text-sm text-gray-600'>14:30 EST - Entry at 1.08450</div>
                    </div>
                  </div>
                  
                  <div className='flex items-start gap-3'>
                    <div className='w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0'></div>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>Price Movement</div>
                      <div className='text-sm text-gray-600'>15:45 EST - Hit target at 1.08720</div>
                    </div>
                  </div>
                  
                  <div className='flex items-start gap-3'>
                    <div className='w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0'></div>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>Trade Closed</div>
                      <div className='text-sm text-gray-600'>16:30 EST - Profit +$27.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Action Section */}
        <div className='mt-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500'
                  />
                  <span className='text-gray-900 font-medium'>Select All</span>
                </label>
                <span className='text-gray-600 text-sm'>{trades.length} trades found</span>
              </div>
              
              <div className='flex gap-3'>
                <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                  </svg>
                  Delete Selected
                </button>
                
                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  Export Selected
                </button>
                
                <button className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                  </svg>
                  Tag Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journal;