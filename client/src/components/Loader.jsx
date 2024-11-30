import React from 'react'

function Loader({msg}) {

  return (
    <div className='z-10 absolute flex flex-col gap-4 items-center justify-center h-screen w-full bg-slate-900 bg-opacity-80 font-bold'>
        <img className='w-20' src="/loader.gif" alt="Loading..." />
        <div>{msg}</div>
    </div>
  )
}

export default Loader