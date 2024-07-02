// src/LogTable.js
import React from 'react';
import './index.css';

const LogTable = () => {
  const data = {
    facilitySeverity: [
      { facility: 'User', emerg: 0, alert: 0, critical: 0, error: 0, warning: 0, notice: 11, info: 0, debug: 0 },
      { facility: 'LogAudit', emerg: 0, alert: 0, critical: 0, error: 18, warning: 0, notice: 0, info: 25, debug: 0 },
    ],
    deviceSeverity: [
      { device: '103.185.239.34', emerg: 0, alert: 0, critical: 0, error: 0, warning: 0, notice: 11, info: 0, debug: 0 },
      { device: 'localhost.localdomain', emerg: 0, alert: 0, critical: 0, error: 18, warning: 0, notice: 0, info: 25, debug: 0 },
    ],
  };

  const renderTableRows = (rows) => {
    return rows.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, idx) => (
          <td key={idx} className={`severity-bg-color severity-${value}`}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className='logs-con'>
      <h2>Facility/Severity</h2>
      <table>
        <thead>
          <tr>
            <th>FACILITY</th><th>EMERG</th><th>ALERT</th><th>CRITICAL</th><th>ERROR</th><th>WARNING</th><th>NOTICE</th><th>INFO</th><th>DEBUG</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows(data.facilitySeverity)}
        </tbody>
      </table>
      <h2>Device/Severity</h2>
      <table>
        <thead>
          <tr>
            <th>DEVICE</th><th>EMERG</th><th>ALERT</th><th>CRITICAL</th><th>ERROR</th><th>WARNING</th><th>NOTICE</th><th>INFO</th><th>DEBUG</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows(data.deviceSeverity)}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
