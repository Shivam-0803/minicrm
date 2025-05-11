import { Link, useLocation } from 'react-router-dom'

const menu = [
  {
    section: 'MAIN',
    items: [
      { text: 'Dashboard', icon: '🏠', path: '/' },
      { text: 'Customers', icon: '👥', path: '/customers' },
    ],
  },
  {
    section: 'CAMPAIGNS',
    items: [
      { text: 'Campaigns', icon: '✉️', path: '/campaigns' },
      { text: 'Segment Builder', icon: '🛠️', path: '/segment-builder' },
    ],
  },
  {
    section: 'SYSTEM',
    items: [
      { text: 'Settings', icon: '⚙️', path: '/settings' },
      { text: 'Help', icon: '❓', path: '/help' },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-lg">
      <div className="p-6 font-bold text-xl flex items-center gap-2">
        <span className="bg-blue-500 text-white px-2 py-1 rounded mr-1">CRM</span>CampaignMaster
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menu.map(section => (
          <div key={section.section} className="mb-2">
            <div className="px-6 py-2 text-xs text-slate-400 tracking-widest font-semibold uppercase">
              {section.section}
            </div>
            <ul>
              {section.items.map(item => (
                <li key={item.text}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg mb-1 transition-colors duration-200 group ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-slate-300 hover:bg-blue-700 hover:text-white'}`}
                  >
                    <span className={`text-lg w-7 h-7 flex items-center justify-center rounded ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-300 group-hover:bg-blue-500 group-hover:text-white'} mr-2`}>
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}