import React, { useState } from 'react';
import "./index.css";

const LogViewer = (props) => {
  const { logs = {}, searchQuery, ipAddressCheck, hostCheck, syslogHostCheck, facilityCheck, severityCheck, messageCheck, rawMessageCheck } = props;
  const { actualDate = '', receivedDateTime = '', ipAddress = '', host = '', syslogHost = '', facility = '', severity = '', message = '', rawMessage = '' } = logs;

  const [isMessageExpanded, setIsMessageExpanded] = useState(false);
  const [isRawMessageExpanded, setIsRawMessageExpanded] = useState(false);

  const highlightText = (text, query) => {
    if (!text) return '';
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
  };

  const truncateText = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + '...';
  };

  return (
    <div className="log-viewer-con mt-3">
      <div className="header-view">
        <p>{highlightText(actualDate, searchQuery)}</p>
        <p>{highlightText(receivedDateTime, searchQuery)}</p>
        <p>{highlightText(ipAddress, searchQuery || ipAddressCheck)}</p>
        <p>{highlightText(host, searchQuery || hostCheck)}</p>
        <p>{highlightText(syslogHost, searchQuery || syslogHostCheck)}</p>
        <p>{highlightText(facility, searchQuery || facilityCheck)}</p>
        <p>{highlightText(severity, searchQuery || severityCheck)}</p>
      </div>
      
      <div className="logs-view">
        <strong className='mes'> Message</strong>
        <p className='message'>
          {isMessageExpanded ? highlightText(message, searchQuery || messageCheck) : highlightText(truncateText(message, 110), searchQuery)}
          {message.length > 0 && (
            <span className="btn-link pl-4" onClick={() => setIsMessageExpanded(!isMessageExpanded)}>
              {isMessageExpanded ? 'Read Less' : 'Read More'}
            </span>
          )}
        </p>
        <hr/>
        <strong className='mes'>Raw Message</strong>
        <p className='message'>
          {isRawMessageExpanded ? highlightText(rawMessage, searchQuery || rawMessageCheck) : highlightText(truncateText(rawMessage, 110), searchQuery)}
          {rawMessage.length > 0 && (
            <span className="btn-link pl-4" onClick={() => setIsRawMessageExpanded(!isRawMessageExpanded)}>
              {isRawMessageExpanded ? 'Read Less' : 'Read More'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LogViewer;
