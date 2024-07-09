import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './index.css';

const COLORS = ['#FFBB28', '#FF8042', '#FF6633', '#FF33FF', '#99FF33', '#00C49F', '#0088FE', '#00C49F'];

const transformData = (data) => {
    return data.map(device => {
        const transformed = { name: device.name };
        device.severityData.forEach(severity => {
            transformed[severity.title] = severity.count;
        });
        return transformed;
    });
};

const SystemUsageBarChartThree = (props) => {
    const { sourceDeviceGraphData } = props;
    console.log('sourceDeviceGraphData', sourceDeviceGraphData);

    if (!sourceDeviceGraphData || sourceDeviceGraphData.length === 0) {
        return <div className='load'>Loading...</div>;
    }

    const transformedData = transformData(sourceDeviceGraphData);

    return (
        <div className="chart-section m-4">
            <h2 className='text-center'>Device Level Severity</h2>
            <BarChart
                width={900}
                height={500}
                data={transformedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  />
                <YAxis  label={{ value: 'Log Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {['Emergency', 'Alert', 'Critical', 'Error', 'Warning', 'Notice', 'Informational', 'Debug'].map((key, index) => (
                    <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
                ))}
            </BarChart>
        </div>
    );
};

export default SystemUsageBarChartThree;
