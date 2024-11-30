import React from 'react';
import { useStore } from '../../store/StoreContext';
const Header = () => {

  const { isAuthenticated, setisAuthenticated, user, setUser, setLoader_msg, setNodes, initialNode, setEdges } = useStore()

  const handleLogout = () => {
    setLoader_msg("Logging out...")
    setisAuthenticated(false)
    setUser({})
    setEdges([])
    setNodes([initialNode])
    setTimeout(() => {
      setLoader_msg(null)
    }, 1000);
  }

  return (
    <header className="p-1 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Email Scheduler</div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <div className='flex gap-2 font-bold'>
                  <img className='w-6 h-6' src="/user.png" alt="username" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 font-bold hover:bg-red-900 text-white px-4 rounded-lg"
                >Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
