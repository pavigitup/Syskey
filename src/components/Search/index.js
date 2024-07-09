import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { Search as SearchIcon, Help as HelpIcon, Replay as ReplayIcon } from '@mui/icons-material';
import SearchResults from "../SearchResults";
import './index.css';

const Search = () => {
  const [facility, setFacility] = useState('All');
  const [severity, setSeverity] = useState('All');
  const [host, setHost] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [message, setMessage] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchParams, setSearchParams] = useState(null);

  const handleFacilityChange = (event) => setFacility(event.target.value);
  const handleSeverityChange = (event) => setSeverity(event.target.value);
  const handleHostChange = (event) => setHost(event.target.value);
  const handleIpAddressChange = (event) => setIpAddress(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleFromDateChange = (event) => setFromDate(event.target.value);
  const handleToDateChange = (event) => setToDate(event.target.value);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({
      facility,
      severity,
      host,
      ipAddress,
      message,
      fromDate,
      toDate,
    });
  };

  const handleReset = () => {
    setFacility('All');
    setSeverity('All');
    setHost('');
    setIpAddress('');
    setMessage('');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="search-container-1 d-flex flex-column w-100">
      <form className="filter-container-1 bg-light p-5" onSubmit={handleSearch}>
        <h1 className='w-100 pb-3 text-danger text-decoration-underline' style={{fontSize: "25px"}}> <strong>Logs / Search</strong></h1>

        <TextField
          label="From Date"
          type="datetime-local"
          value={fromDate}
          onChange={handleFromDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <TextField
          label="To Date"
          type="datetime-local"
          value={toDate}
          onChange={handleToDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Facility"
          select
          style={{width: "300px"}}
          value={facility}
          onChange={handleFacilityChange}
          variant="outlined"
        >
          {/* Facility options */}
        </TextField>

        <TextField
          label="Severity"
          select
          style={{width: "300px"}}  
          value={severity}
          onChange={handleSeverityChange}
          variant="outlined"
        >
          {/* Severity options */}
        </TextField>

        <TextField
          label="Resolved Host Name"
          value={host}
          onChange={handleHostChange}
          variant="outlined"
        />

        <TextField
          label="IP Address"
          value={ipAddress}
          onChange={handleIpAddressChange}
          variant="outlined"
        />

        <TextField
          label="Message"
          value={message}
          onChange={handleMessageChange}
          variant="outlined"
        />

        <div className="button-container-1">
          <Button variant="contained" color="primary" type="submit" startIcon={<SearchIcon />}>
            Search
          </Button>
          <Button variant="contained" color="secondary" startIcon={<HelpIcon />}>
            Help
          </Button>
          <Button variant="contained" onClick={handleReset} startIcon={<ReplayIcon />}>
            Default
          </Button>
        </div>
      </form>
      <div>
        {searchParams && <SearchResults searchParams={searchParams} />}
      </div>
    </div>
  );
};

export default Search;
