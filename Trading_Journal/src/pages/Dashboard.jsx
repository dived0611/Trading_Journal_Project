import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Trading Summary</h2>
          <p>Your trading metrics will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
