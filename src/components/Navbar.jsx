import { BookOpen, GraduationCap, Plus, TestTube, Mail } from 'lucide-react'

function Navbar({ onTest, userEmail, setUserEmail }) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Learning Management System</p>
            <h1 className="font-semibold text-slate-800 -mt-1">LMS Demo</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
            <Mail size={16} className="text-slate-500" />
            <input
              type="email"
              placeholder="Your email (for enrollment/progress)"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="outline-none text-sm placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={onTest}
            className="inline-flex items-center gap-2 text-sm font-medium bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <TestTube size={16} /> Test backend
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
