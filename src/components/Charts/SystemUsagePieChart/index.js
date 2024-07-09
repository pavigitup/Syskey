import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import CustomTooltip from "../CustomTooltip";
import './index.css';

const SystemUsagePieChart = ({ systemData }) => {
    if (!systemData) {
        return <div className='load'>Loading...</div>;
    }

    const { cpu, disk, memory } = systemData;

    const cpuData = [
        { name: 'Usage', value: cpu.usagePercentage },
        { name: 'Free', value: 100 - cpu.usagePercentage },
    ];

    const diskData = [
        { name: 'Used', value: disk.primaryDrive.usagePercentage },
        { name: 'Free', value: 100 - disk.primaryDrive.usagePercentage },
    ];

    const memoryData = memory.appUsage.map(app => ({
        name: app.name,
        value: app.usagePercentage,
    }));

    const COLORS = ['#c300ff', '#11119F', '#11BB28', '#FF1142', '#FF1f', '#000', '#ff1F11'];

    const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

    return (
        <div className="system-info">
            <div className='d-flex align-items-center justify-content-center'>
                <div className="chart-section m-4 justify-content-between">
                    <h2 className='text-center'>CPU</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={cpuData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#ff84d8"
                            dataKey="value"
                        >
                            {cpuData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                    <ul className='m-2 '>
                        <li>Processor: {cpu.processor}</li>
                        <li>Current Speed: {cpu.currentSpeed}</li>
                        <li>Max Speed: {cpu.maxSpeed}</li>
                    </ul>
                </div>

                <div className="chart-section m-3">
                    <h2 className='text-center'>Disk</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={diskData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#82ca9d"
                            dataKey="value"
                        >
                            {diskData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                    <ul className='m-2'>
                        <li>Label: {disk.primaryDrive.label}</li>
                        <li>Size: {disk.primaryDrive.size}</li>
                        <li>Used: {disk.primaryDrive.used}</li>
                        <li>Free: {disk.primaryDrive.free}</li>
                    </ul>
                </div>

                <div className="chart-section m-4">
                    <h2>Memory</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={memoryData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#ffc658"
                            dataKey="value"
                        >
                            {memoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                    <ul className='m-2'>
                        <li>Installed: {memory.installed}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SystemUsagePieChart;
