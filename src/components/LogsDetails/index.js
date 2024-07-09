const LogsDetails = ({ logs }) => {
    return (
        <>
        {logs.map((log, index) => (
          <li key={index} className="bg-light p-5">
            {/* Customize the log details display as needed */}
            <p>{log.message}</p>
            <p>Severity: {log.severity}</p>
            <p>Facility: {log.facility}</p>
            <p>Hostname: {log.hostname}</p>
            <p>Received: {log.receivedDate}</p>
            <p>Actual: {log.actualDate}</p>
          </li>
        ))}
      </>
    );  
  };
  
  export default LogsDetails;
  