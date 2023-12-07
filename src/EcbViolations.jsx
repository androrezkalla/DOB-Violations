import React, { useState, useEffect } from 'react';

function EcbViolations() {
  const [bin, setBin] = useState('');
  const [violations, setViolations] = useState([]);

  const fetchData = async () => {
    if (!bin) return;

    try {
      const url = `https://data.cityofnewyork.us/resource/6bgk-3dad.json?bin=${bin}`;
      const response = await fetch(url);
      const data = await response.json();
      setViolations(data);
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
          {violations.map((violation) => (
            <li
              key={violation.ecb_violation_number}
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
                <strong>BIN:</strong> {violation.bin}
              </p>
              <p>
                <strong>Boro:</strong> {violation.boro}
              </p>
              <p>
                <strong>Block:</strong> {violation.block}
              </p>
              <p>
                <strong>Lot:</strong> {violation.lot}
              </p>
              <p>
                <strong>Hearing Date:</strong> {violation.hearing_date}
              </p>
              <p>
                <strong>Hearing Time:</strong> {violation.hearing_time}
              </p>
              <p>
                <strong>Served Date:</strong> {violation.served_date}
              </p>
              <p>
                <strong>Issue Date:</strong> {violation.issue_date}
              </p>
              <p>
                <strong>Severity:</strong> {violation.severity}
              </p>
              <p>
                <strong>Violation Type:</strong> {violation.violation_type}
              </p>
              <p>
                <strong>Respondent Name:</strong> {violation.respondent_name}
              </p>
              <p>
                <strong>Violation Description:</strong> {violation.violation_description}
              </p>
              <p>
                <strong>Penalty Imposed:</strong> {violation.penalty_imposed}
              </p>
              <p>
                <strong>Amount Paid:</strong> {violation.amount_paid}
              </p>
              <p>
                <strong>Balance Due:</strong> {violation.balance_due}
              </p>
              <p>
                <strong>Infraction Code 1:</strong> {violation.infraction_code1}
              </p>
              <p>
                <strong>Section Law Description 1:</strong> {violation.section_law_description1}
              </p>
              <p>
                <strong>Aggravated Level:</strong> {violation.aggravated_level}
              </p>
              <p>
                <strong>Hearing Status:</strong> {violation.hearing_status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EcbViolations;
