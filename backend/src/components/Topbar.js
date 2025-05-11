export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/2">
        <button className="text-2xl text-gray-400 md:hidden mr-2">☰</button>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hidden md:block">+ New Campaign</button>
        <button className="relative text-gray-600 hover:text-blue-600">
          <span className="text-2xl">🔔</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">DU</div>
          <div className="leading-tight text-right">
            <div className="font-bold text-gray-800">Demo User</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}