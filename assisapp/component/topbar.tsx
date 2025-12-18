import React from 'react'
import Link from 'next/link'

const topbar = () => {
  return (
    <nav className='fixed top-0 w-full z-45 flex items-center justify-between px-8 py-4 bg-amber-600 border-b border-gray-200 shadow-sm'>
        <div className='text-xl font-bold text-blue-100'>
            <Link href="/">AssisApp</Link>
        </div>

        <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Login
            </button>
        </div>

    </nav>
  )
}

export default topbar;
