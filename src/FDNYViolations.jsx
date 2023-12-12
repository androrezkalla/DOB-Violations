import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function FDNYViolations() {
  const [bin, setBin] = useState('');
  const [violations, setViolations] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter: all
  const searchClicked = useRef(false);

  const fetchData = async () => {
    if (!bin || !searchClicked.current) return;

    try {
      let url = `https://data.cityofnewyork.us/resource/bi53-yph3.json?bin=${bin}`;

      // Add filtering based on the selected option
      if (filter !== 'all') {
        url += `&action=${filter}`;
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
  }, [bin, filter, searchClicked]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearch = () => {
    searchClicked.current = true;
    fetchData();
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(violations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Violations');
    XLSX.writeFile(wb, 'dob_violations.xlsx');
  };
  


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">FDNY Violations</h2>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            Enter BIN:
            <input
              type="text"
              value={bin}
              onChange={(e) => setBin(e.target.value)}
              onKeyPress={handleKeyPress}
              className="ml-2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </label>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
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
                filter === 'OPEN'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              } px-4 py-2 rounded`}
              onClick={() => handleFilterChange('OPEN')}
            >
              Active Only
            </button>
            <button
              className={`${
                filter === ('CLOSED')
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              } px-4 py-2 rounded`}
              onClick={() => handleFilterChange('CLOSED')}
            >
              Resolved/Dismissed
            </button>
          </div>
        </div>
        <p className="text-lg font-bold mb-4">
          Violation Count: {violations.length}
        </p>
        <button
            className="bg-green-500 text-white mb-5 px-4 py-2 rounded "
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
          <ul>
          {violations.map((violation) => (
            <li
              key={violation.vio_id}
              className="bg-gray-200 p-4 mb-4 rounded shadow-md"
            >
              <p>
                <strong>Violation ID:</strong> {violation.vio_id}
              </p>
              <p>
                <strong>Account Number:</strong> {violation.acct_num}
              </p>
              <p>
                <strong>Account Owner:</strong> {violation.acct_owner}
              </p>
              <p>
                <strong>Violation Number:</strong> {violation.violation_num}
              </p>
              <p>
                <strong>Violation Law Number:</strong> {violation.vio_law_num}
              </p>
              <p>
                <strong>Violation Law Description:</strong> {violation.vio_law_desc}
              </p>
              <p>
                <strong>Violation Date:</strong> {violation.vio_date}
              </p>
              <p>
                <strong>Action:</strong> {violation.action}
              </p>
              <p>
                <strong>Premises Address:</strong> {violation.prem_addr}
              </p>
              <p>
                <strong>Community District:</strong> {violation.communitydistrict}
              </p>
              <p>
                <strong>City Council District:</strong> {violation.citycouncildistrict}
              </p>
              <p>
                <strong>Borough:</strong> {violation.borough}
              </p>
              <p>
                <strong>Number:</strong> {violation.number}
              </p>
              <p>
                <strong>Street:</strong> {violation.street}
              </p>
              <p>
                <strong>ZIP Code:</strong> {violation.zipcode}
              </p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FDNYViolations;
