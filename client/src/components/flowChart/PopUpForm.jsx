import React, { useState } from 'react';
import { useStore } from '../../store/StoreContext';

function PopUpForm({ setPopUp, id }) {

  const { nodes, updateNodeValue, addNewNodeAndEdge } = useStore()

  const [selectedOption, setSelectedOption] = useState(''); // 'Lead Source', 'Cold Email', or 'Wait/Delay'
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    body: '',
    waitTime: '',
    waitUnit: 'min'
  });


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handlePopupToggle = () => {
    setPopUp(false)
  }

  const handleSubmit = () => {
    const data = {
      "leadSource": { "email": formData.email },
      "email": {
        "emailContent": {
          "subject": formData.subject,
          "body": formData.body,
        }
      },
      "delay": { "delayTime": formData.waitTime + formData.waitUnit },
    }

    addNewNodeAndEdge({ task: selectedOption, data: { [selectedOption]: data[selectedOption] } })
    updateNodeValue(id, { task: selectedOption, data: data[selectedOption] })
    setPopUp(false)
  }

  return (
    <div className="inset-0- bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 w-6 font-bold bg-red-500 text-white rounded-full"
          onClick={handlePopupToggle}
        >
          X
        </button>
        <h2 className="text-xl mb-4">Select Node</h2>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Choose Option:</label>
            <select
              onChange={handleOptionChange}
              value={selectedOption}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select an option</option>
              <option value="leadSource">Lead Source</option>
              <option value="email">Cold Email</option>
              <option value="delay">Wait/Delay</option>
            </select>
          </div>

          {selectedOption === 'leadSource' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          {selectedOption === 'email' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <br />
              <label className="block text-gray-700 mb-2">Body:</label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          {selectedOption === 'delay' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Wait Time:</label>
              <input
                type="number"
                name="waitTime"
                value={formData.waitTime}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <br />
              <label className="block text-gray-700 mb-2">Time Unit:</label>
              <select
                name="waitUnit"
                value={formData.waitUnit}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="min">Minutes</option>
                <option value="hr">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopUpForm;
