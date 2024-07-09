import React, { Component } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button, InputAdornment, TextField, MenuItem, TablePagination } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import SideBar from "../SideBar";
import LogViewer from "../LogViewer";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./index.css";

class LiveStream extends Component {
  state = {
    recentLogs: [],
    searchQuery: '',
    ipAddress: '',
    host: '',
    syslogHost: '',
    facility: '',
    severity: '',
    message: '',
    rawMessage: '',
    page: 0,
    rowsPerPage: 100
  };

  componentDidMount() {
    this.getRecentLogs();
  }

  getRecentLogs = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = "https://scribbler-demo.syskeysoftlabs.com/api/Logs/recent?maxRecords=1000"; // Adjusted to fetch more logs
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      this.setState({ recentLogs: data });
    } catch (e) {
      console.log('Error fetching recentLogs data', e);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSelectChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value === 'All' ? '' : value });
  };

  highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
  };

  filterLogs = () => {
    const {
      recentLogs, searchQuery, ipAddress, host, syslogHost, facility, severity, message, rawMessage, page, rowsPerPage
    } = this.state;
    
    const filteredLogs = recentLogs.filter(log => {
      const logContainsQuery = field => field && field.toString().toLowerCase().includes(searchQuery.toLowerCase());
      const logContainsField = (field, value) => field && field.toLowerCase().includes(value.toLowerCase());

      return (
        (!searchQuery || logContainsQuery(log.actualDate) || logContainsQuery(log.receivedDateTime) ||
          logContainsQuery(log.ipAddress) || logContainsQuery(log.host) || logContainsQuery(log.syslogHost) ||
          logContainsQuery(log.facility) || logContainsQuery(log.severity) || logContainsQuery(log.message) ||
          logContainsQuery(log.rawMessage)) &&
        (!ipAddress || logContainsField(log.ipAddress, ipAddress)) &&
        (!host || logContainsField(log.host, host)) &&
        (!syslogHost || logContainsField(log.syslogHost, syslogHost)) &&
        (!facility || logContainsField(log.facility, facility)) &&
        (!severity || logContainsField(log.severity, severity)) &&
        (!message || logContainsField(log.message, message)) &&
        (!rawMessage || logContainsField(log.rawMessage, rawMessage))
      );
    });

    return filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  handleReset = () => {
    this.setState({
      searchQuery: '',
      ipAddress: '',
      host: '',
      syslogHost: '',
      facility: '',
      severity: '',
      message: '',
      rawMessage: ''
    });
  };

  handleRefresh = () => {
    this.getRecentLogs();
  };

  handlePDF = () => {
    const { recentLogs } = this.state;
    const doc = new jsPDF();
    const tableColumn = ["Date", "IP Address", "Host", "Syslog Host", "Facility", "Severity", "Message", "Raw Message"];
    const tableRows = [];

    recentLogs.forEach(log => {
      const logData = [
        log.actualDate,
        log.ipAddress,
        log.host,
        log.syslogHost,
        log.facility,
        log.severity,
        log.message,
        log.rawMessage
      ];
      tableRows.push(logData);
    });

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.text("Logs", 14, 15);
    doc.save("logs.pdf");
  };

  handlePrint = () => {
    window.print();
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  render() {
    const { searchQuery, ipAddress, host, syslogHost, facility, severity, message, rawMessage, page, rowsPerPage } = this.state;
    const filteredLogs = this.filterLogs();
    const rowsPerPageOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    return (
      <div className="live-stream-con">
        <SideBar />
        <h1 className="text-center text-danger"><strong>Live Stream</strong></h1>
        <div className="live-stream-container">
          <div className="header">
            <div className="search-container">
              <div className="w-50">
                <TextField
                  variant="outlined"
                  placeholder="Global Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  value={searchQuery}
                  onChange={this.handleInputChange}
                  name="searchQuery"
                />
              </div>
              <div className="button-fun d-flex justify-content-between">
                <Button variant="outlined" onClick={this.handleReset}>Reset</Button>
                <Button variant="contained" startIcon={<RefreshIcon />} onClick={this.handleRefresh}>Refresh</Button>
                <Button variant="contained" startIcon={<PictureAsPdfIcon />} onClick={this.handlePDF}>PDF</Button>
                <Button variant="contained" startIcon={<PrintIcon />} onClick={this.handlePrint}>Print</Button>
              </div>
            </div>
          </div>
          <div className="filter-container d-flex flex-column">
            <div className="table-header">
              <TextField
                label="IP Address"
                variant="outlined"
                value={ipAddress}
                onChange={this.handleInputChange}
                name="ipAddress"
              />
              <TextField
                label="Host"
                variant="outlined"
                value={host}
                onChange={this.handleInputChange}
                name="host"
              />
              <TextField
                label="Syslog Host"
                variant="outlined"
                value={syslogHost}
                onChange={this.handleInputChange}
                name="syslogHost"
              />
              <TextField
                label="Facility"
                select
                variant="outlined"
                value={facility === '' ? 'All' : facility}
                onChange={this.handleSelectChange}
                name="facility"
              >
                <MenuItem key="all" value="All">All</MenuItem>
                <MenuItem key="kernel" value="Kernel">Kernel</MenuItem>
                <MenuItem key="user" value="User">User</MenuItem>
                <MenuItem key="mailSystem" value="MailSystem">MailSystem</MenuItem>
                <MenuItem key="systemDaemons" value="SystemDaemons">SystemDaemons</MenuItem>
                <MenuItem key="securityAuth" value="SecurityAuth">SecurityAuth</MenuItem>
                <MenuItem key="syslogd" value="Syslogd">Syslogd</MenuItem>
                <MenuItem key="linePrinter" value="LinePrinter">LinePrinter</MenuItem>
                <MenuItem key="news" value="News">News</MenuItem>
                <MenuItem key="uucp" value="UUCP">UUCP</MenuItem>
                <MenuItem key="clockDaemons" value="ClockDaemons">ClockDaemons</MenuItem>
                <MenuItem key="SecurityPrivileged" value="SecurityPrivileged">SecurityPrivileged</MenuItem>
                <MenuItem key="ftp" value="FTP">FTP</MenuItem>
                <MenuItem key="ntp" value="NTP">NTP</MenuItem>
                <MenuItem key="logAudit" value="LogAudit">LogAudit</MenuItem>
                <MenuItem key="logAlert" value="LogAlert">LogAlert</MenuItem>
                <MenuItem key="clock" value="Clock">Clock</MenuItem>
                <MenuItem key="localUse0" value="LocalUse0">LocalUse0</MenuItem>
                <MenuItem key="localUse1" value="LocalUse1">LocalUse1</MenuItem>
                <MenuItem key="localUse2" value="LocalUse2">LocalUse2</MenuItem>
                <MenuItem key="localUse3" value="LocalUse3">LocalUse3</MenuItem>
                <MenuItem key="localUse4" value="LocalUse4">LocalUse4</MenuItem>
                <MenuItem key="localUse5" value="LocalUse5">LocalUse5</MenuItem>
                <MenuItem key="localUse6" value="LocalUse6">LocalUse6</MenuItem>
                <MenuItem key="localUse7" value="LocalUse7">LocalUse7</MenuItem>
              </TextField>
              <TextField
                label="Severity"
                select
                variant="outlined"
                value={severity === '' ? 'All' : severity}
                onChange={this.handleSelectChange}
                name="severity"
              >
                <MenuItem key="all" value="All">All</MenuItem>
                <MenuItem key="emergency" value="Emergency">Emergency</MenuItem>
                <MenuItem key="alert" value="Alert">Alert</MenuItem>
                <MenuItem key="critical" value="Critical">Critical</MenuItem>
                <MenuItem key="error" value="Error">Error</MenuItem>
                <MenuItem key="warning" value="Warning">Warning</MenuItem>
                <MenuItem key="notice" value="Notice">Notice</MenuItem>
                <MenuItem key="informational" value="Informational">Informational</MenuItem>
                <MenuItem key="debug" value="Debug">Debug</MenuItem>
              </TextField>
              <TextField
                label="Message"
                variant="outlined"
                value={message}
                onChange={this.handleInputChange}
                name="message"
              />
              <TextField
                label="Raw Message"
                variant="outlined"
                value={rawMessage}
                onChange={this.handleInputChange}
                name="rawMessage"
              />
            </div>
            <div className="mt-5">
              <TablePagination
                component="div"
                rowsPerPageOptions={rowsPerPageOptions}
                count={this.state.recentLogs.length}
                page={page}
                onPageChange={this.handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </div>
            
          </div>
            <div className="result-con">
              {filteredLogs.length > 0 && filteredLogs.map((log, index) => (
                <LogViewer key={index} logs={log} searchQuery={searchQuery} ipAddressCheck={ipAddress} hostCheck={host} syslogHostCheck={syslogHost} facilityCheck={facility} severityCheck={severity} messageCheck={message} rawMessageCheck={rawMessage} />
              ))}
            </div>
        </div>
      </div>
    );  
  }
}

export default LiveStream;
