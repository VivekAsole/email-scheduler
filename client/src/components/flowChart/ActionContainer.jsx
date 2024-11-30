import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/StoreContext'

function ActionContainer() {
  const [name, setName] = useState('untitled')
  const { nodes, setNodes, edges, setEdges, initialNode, user, setUser, setLoader_msg } = useStore()
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(Object.keys(user.flow_container))
  }, [user])

  const handleSave = async () => {
    setLoader_msg("Saving...")
    const storedFlowContainer = user.flow_container
    storedFlowContainer[name] = { nodes: nodes, edges: edges }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/editflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id, flow_container: storedFlowContainer }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update');
      }

      const userData = await response.json()
      setUser(userData.user) // Update the store
      setLoader_msg("Saved")
    } catch (error) {
      console.error('Error during saving:', error.message);
      alert(error.message);
    } finally {
      setTimeout(() => {
        setLoader_msg(null)
      }, 1000)
    }
  }

  const handleDelete = async () => {
    setLoader_msg("Deleting...")
    const storedFlowContainer = user.flow_container

    if (Object.keys(storedFlowContainer).includes(name)) {
      delete storedFlowContainer[name]
    } else {
      return alert(`${name} is not saved !`)
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/editflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id, flow_container: storedFlowContainer }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update')
      }

      const userData = await response.json()
      setUser(userData.user) // Update the store
      setEdges([])
      setNodes([initialNode])
      setLoader_msg(`Deleted the ${name} flow.`)
      setName('untitled')
    } catch (error) {
      console.error('Error during deleting:', error.message)
      alert(error.message)
    } finally {
      setTimeout(() => {
        setLoader_msg(null)
      }, 1000)
    }
  }

  const handleExecuteFlow = async () => {
    const flow = {
      nodes: nodes,
      edges: edges
    }
    setLoader_msg("Executing...")

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/execute/workflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flow),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to execute')
      }

      const res = await response.json()
      setLoader_msg("Workflow scheduled successfully!")
    } catch (error) {
      console.error('Error during scheduling workflow:', error.message)
      alert(error.message)
    } finally {
      setTimeout(() => {
        setLoader_msg(null)
      }, 2000)
    }
  }

  const handleOptionSelect = (option) => {
    const selectedNodes = user.flow_container[option].nodes
    const selectedEdges = user.flow_container[option].edges

    setNodes(selectedNodes)
    setEdges(selectedEdges)
    setName(option)
  }

  return (
    <div className="flex flex-col justify-between p-1 px-2 bg-blue-100 gap-1 w-full h-full max-w-md mx-auto">
      {/* Flow Label */}
      <div className="flex flex-col w-full">
        <label className="font-bold text-blue-800 mb-1">Flow Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Saved Flow Chart Label */}
      <div className="flex flex-col w-full flex-grow overflow-hidden ">
        <label className="font-bold text-blue-800 mb-1">Saved Flow Chart:</label>
        <div
          className="w-full text-sm rounded-md border-4 border-white bg-white overflow-y-auto"
        >
          {options.map((option, index) => (
            <div
              className="py-2 px-3 bg-white rounded-full hover:bg-blue-100 cursor-pointer text-gray-800"
              value={option}
              key={index}
              onClick={() => handleOptionSelect(option)}
            >
              {index + 1}. {option}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-1 font-bold text-white tracking-wider w-full">
        <button
          onClick={handleExecuteFlow}
          className="flex-1 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >Execute Flow</button>
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >Save</button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
        >Delete</button>
      </div>
    </div>
  )
}

export default ActionContainer;