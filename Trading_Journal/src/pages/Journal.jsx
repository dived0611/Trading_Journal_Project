import React from 'react'

const Journal = () => {
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

        <div className='mt-4'>
          {/* Content will go here */}
        </div>
      </div>
    </div>
  )
}

export default Journal
