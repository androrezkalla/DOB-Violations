import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';

function SearchComponent({ url }) {
  const [binList, setBinList] = useState('');
  const [violations, setViolations] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter: all
  const searchClicked = useRef(false);

  const fetchData = async () => {
    if (!binList || !searchClicked.current) return;

    const binArray = binList.split(',').map(bin => bin.trim());

    try {
      const allViolations = [];
      for (const bin of binArray) {
        let apiUrl = `${url}?bin=${bin}`;

        // Add filtering based on the selected option
        if (filter !== 'all') {
          apiUrl += `&violation_category=${filter}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        allViolations.push(...data);
      }
      setViolations(allViolations);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [binList, filter, searchClicked]);

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
    if (violations.length === 0) {
      console.warn('No data to export.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(violations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Violations');
    XLSX.writeFile(wb, 'dob_violations.xlsx');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">DOB Violations</h2>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            Enter BIN(s):
            <input
              type="text"
              value={binList}
              onChange={(e) => setBinList(e.target.value)}
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
        <button
          className="bg-green-500 text-white mb-5 px-4 py-2 rounded "
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default SearchComponent;
