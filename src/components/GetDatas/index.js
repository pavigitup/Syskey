import React, { Component } from 'react';
import Cookies from 'js-cookie';
import SystemUsagePieChart from '../Charts/SystemUsagePieChart';

class Dashboard extends Component {
    state = {
        syslogData: {},
    };

    componentDidMount() {
    this.getSyslogData();
    }

    getSyslogData = async () => {
    try {
        const jwtToken = Cookies.get('jwt_token');
        const apiUrl = 'https://scribbler-demo.syskeysoftlabs.com/api/Dashboard/system-resource-data';
        const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
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

    render() {
    const { syslogData } = this.state;
    console.log("data", syslogData);
    return (
        <div>
            {Object.keys(syslogData).length > 0 && (
                <SystemUsagePieChart systemData={syslogData} />
            )}
        </div>
    );
    }
}

export default Dashboard;
