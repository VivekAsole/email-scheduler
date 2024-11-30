import React from 'react'
import Header from './components/header/Header'
// import Form from './components/Form'
import { useStore } from './store/StoreContext'
import Login from './components/login/Login'
import ActionContainer from './components/flowChart/ActionContainer'
import FlowContainer from './components/flowChart/FlowContainer'
import Loader from './components/Loader'

function App() {
  const { isAuthenticated, loader_msg } = useStore()

  return (
    <div className='flex flex-col h-screen'>
      { (loader_msg !== null) && <Loader msg={loader_msg} />}
      <div className=''>
        <Header />
      </div>
      {
        isAuthenticated ?
          <div className='flex flex-grow h-4 '>
            <div className='w-1/4 h-full'>
              <ActionContainer />
            </div>
            <div className='w-full h-full'>
              <FlowContainer />
            </div>
          </div>
          :
          <div className='h-full'>
            <Login />
          </div>
      }
    </div>
  )
}

export default App