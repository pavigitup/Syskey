import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './index.css';

const COLORS = ['#FFBB28', '#FF8042', '#FF6633', '#FF33FF', '#99FF33', '#00C49F', '#0088FE', '#00C49F'];

const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

const SystemUsageBarChart = (props) => {
    const { severityGraphData } = props;
    console.log("severityGraphData", severityGraphData);

    const hasNonZeroCounts = severityGraphData.some(data => data.count > 0);

    if (!hasNonZeroCounts) {
        return <div className='load'>Loading...</div>;
    }

    return (
        <div className="chart-section m-4">
            <h2 className='text-center'>Logs Data (%)</h2>
            <PieChart width={600} height={500}>
                <Pie
                    data={severityGraphData}
                    cx={290}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {severityGraphData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default SystemUsageBarChart;
