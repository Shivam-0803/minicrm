import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import SegmentBuilder from './components/SegmentBuilder'

// Placeholder components for missing pages
const Placeholder = ({ title }) => <div className="p-8 text-center text-gray-400 text-2xl">{title} page coming soon...</div>

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<Placeholder title='Campaigns' />} />
              <Route path="/customers" element={<Placeholder title='Customers' />} />
              <Route path="/segment-builder" element={<SegmentBuilder />} />
              <Route path="/settings" element={<Placeholder title='Settings' />} />
              <Route path="/help" element={<Placeholder title='Help' />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}