import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';
import LogsDetails from '../LogsDetails';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    receivedFromDate: '',
    receivedToDate: '',
    actualFromDate: '',
    actualToDate: '',
    facility: '',
    severity: '',
    hostname: '',
    message: ''
  });

  const fetchLogs = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      console.log(jwtToken);

      const {
        receivedFromDate,
        receivedToDate,
        actualFromDate,
        actualToDate,
        facility,
        severity,
        hostname,
        message
      } = filters;

      const queryParams = new URLSearchParams({
        actualFromDate,
        actualToDate,
        facility,
        severity,
        hostname,
        message
      }).toString();

      const url = `https://scribbler-demo.syskeysoftlabs.com/api/Logs?actualFromDate=2024-05-01T11%3A12%3A03.119Z&actualToDate=2024-06-01T12%3A12%3A03.119Z&facility=User`;

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data.items);
        setLogs(data.items);
      } else {
        console.error('Failed to fetch logs:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div className="log-viewer bg-secondary w-50">
      <h1>Log Viewer</h1>
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="form-row">
          <label>
            Received From Date:
            <input type="datetime-local" name="receivedFromDate" value={filters.receivedFromDate} onChange={handleInputChange} />
          </label>
          <label>
            Received To Date:
            <input type="datetime-local" name="receivedToDate" value={filters.receivedToDate} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Actual From Date:
            <input type="datetime-local" name="actualFromDate" value={filters.actualFromDate} onChange={handleInputChange} />
          </label>
          <label>
            Actual To Date:
            <input type="datetime-local" name="actualToDate" value={filters.actualToDate} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Facility:
            <input type="text" name="facility" value={filters.facility} onChange={handleInputChange} />
          </label>
          <label>
            Severity:
            <input type="text" name="severity" value={filters.severity} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Hostname:
            <input type="text" name="hostname" value={filters.hostname} onChange={handleInputChange} />
          </label>
          <label>
            Message:
            <input type="text" name="message" value={filters.message} onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit" className="filter-button">Filter</button>
      </form>
      <div className='bg-warning p-5'>
        {logs.length > 0 ? (
          <ul style={{listStyleType: "none", width:"100%", padding: "5px"}}>
            <LogsDetails logs={logs} />
          </ul>
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
