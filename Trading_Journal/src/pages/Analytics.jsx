import React from 'react'

const Analytics = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Analytics content will go here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Performance Metrics</h2>
          <p>Your analytics data will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
