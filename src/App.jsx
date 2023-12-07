import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bin, setBin] = useState('');
  const [violations, setViolations] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter: all

  const fetchData = async () => {
    if (!bin) return;

    try {
      let url = `https://data.cityofnewyork.us/resource/3h2n-5cm9.json?bin=${bin}`;

      // Add filtering based on the selected option
      if (filter !== 'all') {
        url += `&violation_category=${filter}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setViolations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bin, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">DOB Violations</h2>
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
        <div className="mb-4">
          <label className="mr-4">Filter By:</label>
          <div className="flex space-x-4">
            <button
              className={`${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              } px-4 py-2 rounded`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button
              className={`${
                filter === 'V-DOB VIOLATION - ACTIVE'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              } px-4 py-2 rounded`}
              onClick={() => handleFilterChange('V-DOB VIOLATION - ACTIVE')}
            >
              Active Only
            </button>
            <button
              className={`${
                filter === ('V*-DOB VIOLATION - Resolved'|| 'V*-DOB VIOLATION - Resolved')
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              } px-4 py-2 rounded`}
              onClick={() => handleFilterChange('V*-DOB VIOLATION - Resolved')}
            >
              Resolved/Dismissed
            </button>
          </div>
        </div>
        <p className="text-lg font-bold mb-4">
          Violation Count: {violations.length}
        </p>
        <ul>
          {violations.map((violation) => (
            <li
            key={violation.isn_dob_bis_viol}
            className="bg-gray-200 p-4 mb-4 rounded shadow-md"
          >
            <p>
              <strong>ISN DOB BIS Viol:</strong> {violation.isn_dob_bis_viol}
            </p>
            <p>
              <strong>Boro:</strong> {violation.boro}
            </p>
            <p>
              <strong>Bin:</strong> {violation.bin}
            </p>
            <p>
              <strong>Block:</strong> {violation.block}
            </p>
            <p>
              <strong>Lot:</strong> {violation.lot}
            </p>
            <p>
              <strong>Issue Date:</strong> {violation.issue_date}
            </p>
            <p>
              <strong>Violation Type Code:</strong> {violation.violation_type_code}
            </p>
            <p>
              <strong>Violation Number:</strong> {violation.violation_number}
            </p>
            <p>
              <strong>House Number:</strong> {violation.house_number}
            </p>
            <p>
              <strong>Street:</strong> {violation.street}
            </p>
            <p>
              <strong>Disposition Date:</strong> {violation.disposition_date}
            </p>
            <p>
              <strong>Device Number:</strong> {violation.device_number}
            </p>
            <p>
              <strong>Description:</strong> {violation.description}
            </p>
            <p>
              <strong>Number:</strong> {violation.number}
            </p>
            <p>
              <strong>Violation Category:</strong> {violation.violation_category}
            </p>
            <p>
              <strong>Violation Type:</strong> {violation.violation_type}
            </p>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
