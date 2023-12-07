import React, { useState, useEffect } from 'react';

function EcbViolations() {
  const [bin, setBin] = useState('');
  const [ecbViolations, setEcbViolations] = useState([]);

  const fetchData = async () => {
    if (!bin) return;

    try {
      const url = `https://data.cityofnewyork.us/resource/6bgk-3dad.json?bin=${bin}`;
      const response = await fetch(url);
      const data = await response.json();
      setEcbViolations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bin]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">ECB Violations</h2>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            Enter BIN:
            <input
              type="text"
              value={bin}
              onChange={(e) => setBin(e.target.value)}
              className="ml-2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <ul>
          {ecbViolations.map((violation) => (
            <li
              key={violation.isn_dob_bis_extract}
              className="bg-gray-200 p-4 mb-4 rounded shadow-md"
            >
              <p>
                <strong>ISN DOB BIS Extract:</strong> {violation.isn_dob_bis_extract}
              </p>
              <p>
                <strong>ECB Violation Number:</strong> {violation.ecb_violation_number}
              </p>
              <p>
                <strong>ECB Violation Status:</strong> {violation.ecb_violation_status}
              </p>
              <p>
                <strong>DOB Violation Number:</strong> {violation.dob_violation_number}
              </p>
              <p>
                {/* Add other fields here */}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EcbViolations;
