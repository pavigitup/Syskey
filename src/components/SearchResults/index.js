import React, { Component } from 'react';
import Cookies from "js-cookie";
import LogViewer from '../LogViewer'; 
import TablePagination from '@mui/material/TablePagination';

class SearchResults extends Component {
  state = {
    recentLogs: [],
    filteredLogs: [],
    page: 0,
    rowsPerPage: 100,
  };

  componentDidMount() {
    this.fetchRecentLogs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchParams !== this.props.searchParams) {
      this.filterLogs();
    }
  }

  fetchRecentLogs = async () => {
    try {
      const response = await fetch('https://scribbler-demo.syskeysoftlabs.com/api/Logs/statistics', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      this.setState({ recentLogs: data, filteredLogs: data });
    } catch (error) {
      console.error("Failed to fetch recent logs:", error);
    }
  };

  filterLogs = () => {
    const { searchParams } = this.props;
    const { recentLogs } = this.state;

    const filteredLogs = recentLogs.filter(log => {
      return (
        (searchParams.facility === 'All' || log.facility === searchParams.facility) &&
        (searchParams.severity === 'All' || log.severity === searchParams.severity) &&
        (searchParams.host === '' || log.host.includes(searchParams.host)) &&
        (searchParams.ipAddress === '' || log.ipAddress.includes(searchParams.ipAddress)) &&
        (searchParams.message === '' || log.message.includes(searchParams.message)) &&
        (searchParams.fromDate === '' || new Date(log.timestamp) >= new Date(searchParams.fromDate)) &&
        (searchParams.toDate === '' || new Date(log.timestamp) <= new Date(searchParams.toDate))
      );
    });

    this.setState({ filteredLogs });
  };

  render() {
    const { filteredLogs, page, rowsPerPage } = this.state;

    return (
      <div>
        <div className="search-container-2 d-flex flex-column">
          <div className="recent-logs-table">
            <LogViewer logs={filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={filteredLogs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => this.setState({ page: newPage })}
              onRowsPerPageChange={(event) => this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
