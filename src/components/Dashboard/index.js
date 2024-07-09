import React, { Component } from 'react';
import Cookies from 'js-cookie';
import SystemUsagePieChart from '../Charts/SystemUsagePieChart';
import SystemUsageBarChart from "../Charts/SystemUsageBarChart";
import SystemUsageBarChartTwo from "../Charts/SystemUsageBarChartTwo";
import SystemUsageBarChartThree from "../Charts/SystemUsageBarChartThree";
import SideBar from '../SideBar';
import "./index.css"

class Dashboard extends Component {
    state = {
        syslogData: {},
        logsData: {
          severityGraphData: [],
          facilityGraphData: [],
          sourceDeviceGraphData: [], 
        },
        fromDate: '2024-06-01',
        toDate: '2024-07-02'
    };

    componentDidMount() {
        this.getSyslogData();
        this.getLogsData();
    }

    getSyslogData = async () => {
        try {
            const jwtToken = Cookies.get('jwt_token');
            const apiUrl = 'https://scribbler-demo.syskeysoftlabs.com/api/Dashboard/system-resource-data';
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            };
            const response = await fetch(apiUrl, options);
            const data = await response.json();
            console.log(data);

            this.setState({ syslogData: data });
        } catch (error) {
            console.error('Error fetching syslog data:', error);
        }
    };

    onChangeFromDate = (event) => {
        this.setState({ fromDate: event.target.value }, this.getLogsData);
    }

    onChangeToDate = (event) => {
        this.setState({ toDate: event.target.value }, this.getLogsData);
    }

    getLogsData = async () => {
      try {
        const { fromDate, toDate } = this.state;
        const jwtToken = Cookies.get('jwt_token');
        const url = `https://scribbler-demo.syskeysoftlabs.com/api/Dashboard/logs-data?fromDate=${fromDate}&toDate=${toDate}`;
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },  
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('logsData', data);
        this.setState({ logsData: data });
      } catch (error) {
        console.log('Error fetching logs data:', error);
      }
    }

    render() {
        const { syslogData, logsData, fromDate, toDate } = this.state;
        const { severityGraphData, facilityGraphData, sourceDeviceGraphData } = logsData;
        console.log("data", syslogData);

        return (
            <div>

                <SideBar />
                <h1 className='text-center' style={{color: "#0A3558"}}><strong>System Information</strong></h1>
                <div className='d-flex justify-content-end w-100 p-5'>
                  <div className='date-con'>
                  <input className='date-label' type='date' value={fromDate} onChange={this.onChangeFromDate}/>
                  <input className='date-label' type='date' value={toDate} onChange={this.onChangeToDate}/>
                  </div>
                </div>
                <div>
                  {Object.keys(syslogData).length > 0 ? (
                      <SystemUsagePieChart systemData={syslogData} />
                  ) : (
                      <div>Loading...</div>
                  )}
                </div>
                <div className='d-flex w-100 justify-content-center flex-wrap m-2'>
                    <div className="d-flex align-items-center justify-content-center m-4">
                      {severityGraphData && severityGraphData.length > 0 ? (
                          <SystemUsageBarChart severityGraphData={severityGraphData} />
                      ) : (
                          <div>Loading...</div>
                      )}
                    </div>
                    <div className="d-flex align-items-center justify-content-center m-4">
                      {facilityGraphData && facilityGraphData.length > 0 ? (
                          <SystemUsageBarChartTwo facilityGraphData={facilityGraphData} />
                      ) : (
                          <div>Loading...</div>
                      )}
                    </div>
                    <div className="d-flex align-items-center justify-content-center m-4">
                      {sourceDeviceGraphData && sourceDeviceGraphData.length > 0 ? (
                          <SystemUsageBarChartThree sourceDeviceGraphData={sourceDeviceGraphData} />
                      ) : (
                          <div>Loading...</div>
                      )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
