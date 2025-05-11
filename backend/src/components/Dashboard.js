import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import ReactApexChart from 'react-apexcharts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const stats = [
  { label: 'Total Customers', value: 12456, change: '+15.3%', color: 'green', icon: '👥' },
  { label: 'Campaigns Sent', value: 238, change: '+32.8%', color: 'green', icon: '✉️' },
  { label: 'Conversion Rate', value: '24.5%', change: '+3.2%', color: 'green', icon: '📈' },
  { label: 'Revenue Generated', value: '₹1.24M', change: '-2.1%', color: 'red', icon: '💰' },
]

const audienceData = [
  { name: 'Active Customers', value: 42, color: '#4caf50' },
  { name: 'Inactive Customers', value: 28, color: '#757575' },
  { name: 'New Customers', value: 18, color: '#2196f3' },
  { name: 'At Risk', value: 12, color: '#f44336' },
]

const chartTabs = ['Week', 'Month', 'Quarter', 'Year']

const chartDataByTab = {
  Week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Sent', data: [200, 300, 250, 400, 350, 500, 600], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', tension: 0.4, fill: true },
      { label: 'Opened', data: [120, 200, 180, 250, 220, 300, 350], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true },
      { label: 'Clicked', data: [40, 60, 55, 80, 70, 100, 120], borderColor: '#f59e42', backgroundColor: 'rgba(245,158,66,0.1)', tension: 0.4, fill: true },
    ]
  },
  Month: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Sent', data: [1000, 1100, 900, 1200], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', tension: 0.4, fill: true },
      { label: 'Opened', data: [700, 800, 650, 900], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true },
      { label: 'Clicked', data: [300, 350, 250, 400], borderColor: '#f59e42', backgroundColor: 'rgba(245,158,66,0.1)', tension: 0.4, fill: true },
    ]
  },
  Quarter: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'Sent', data: [3200, 3400, 3600], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', tension: 0.4, fill: true },
      { label: 'Opened', data: [2100, 2300, 2500], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true },
      { label: 'Clicked', data: [900, 1100, 1200], borderColor: '#f59e42', backgroundColor: 'rgba(245,158,66,0.1)', tension: 0.4, fill: true },
    ]
  },
  Year: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Sent', data: [12000, 13000, 11000, 14000], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', tension: 0.4, fill: true },
      { label: 'Opened', data: [8000, 9000, 7500, 10000], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true },
      { label: 'Clicked', data: [3500, 4000, 3000, 4500], borderColor: '#f59e42', backgroundColor: 'rgba(245,158,66,0.1)', tension: 0.4, fill: true },
    ]
  },
}

const donutOptions = {
  chart: { type: 'donut' },
  labels: audienceData.map(a => a.name),
  colors: audienceData.map(a => a.color),
  legend: { show: false },
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: { size: '70%' }
    }
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Month')
  return (
    <div className="">
      <div className="text-3xl font-bold mb-1">Dashboard</div>
      <div className="text-gray-500 mb-6">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-2xl mr-2">{stat.icon}</div>
            <div className="flex-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
              <div className={stat.color === 'green' ? 'text-green-600 text-xs font-semibold' : 'text-red-600 text-xs font-semibold'}>
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-lg">Campaign Performance</div>
            <div className="flex gap-2">
              {chartTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${activeTab === tab ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-56 flex items-center justify-center">
            <Line
              data={chartDataByTab[activeTab]}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'bottom' },
                  tooltip: { enabled: true },
                },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                  x: { grid: { color: '#f1f5f9' } },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="font-semibold text-lg mb-2">Audience Breakdown</div>
          <div className="w-full flex flex-col items-center">
            <ReactApexChart
              options={donutOptions}
              series={audienceData.map(a => a.value)}
              type="donut"
              width={180}
            />
            <div className="mt-6 w-full">
              {audienceData.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm mb-1">
                  <span className={`w-3 h-3 rounded-full inline-block`} style={{ background: item.color }}></span>
                  <span className="flex-1 text-gray-700">{item.name}</span>
                  <span className="font-bold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}