import React from 'react'

const Dashboard = () => {
  return (
        <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto"></div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="px-4 py-2 bg-[#1d7ed1] text-white rounded-lg hover:bg-[#1666ab] transition-colors">
            New Report
          </button>
        </div>
    </div>
  )
}

export default Dashboard
