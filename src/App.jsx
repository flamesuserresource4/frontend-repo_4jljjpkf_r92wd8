import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import CourseForm from './components/CourseForm'
import CourseList from './components/CourseList'
import CourseDetail from './components/CourseDetail'

function App() {
  const [selected, setSelected] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [backendHealthy, setBackendHealthy] = useState(false)

  const testBackend = async () => {
    try {
      const res = await fetch(baseUrl)
      setBackendHealthy(res.ok)
      alert(res.ok ? 'Backend is reachable' : 'Backend not reachable')
    } catch {
      setBackendHealthy(false)
      alert('Backend not reachable')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar onTest={testBackend} userEmail={userEmail} setUserEmail={setUserEmail} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <CourseForm onCreated={() => setSelected(null)} />
            <CourseList onSelect={setSelected} />
          </div>
          <div className="md:col-span-1">
            {selected ? (
              <CourseDetail course={selected} userEmail={userEmail} />
            ) : (
              <div className="bg-white/70 border border-slate-200 rounded-xl p-4 text-slate-600">
                Select a course to view details and manage lessons.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
