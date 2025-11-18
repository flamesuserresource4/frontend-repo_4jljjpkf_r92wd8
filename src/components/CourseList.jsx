import { useEffect, useState } from 'react'
import { BookOpen, User, Layers } from 'lucide-react'

function CourseList({ onSelect }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/courses`)
      if (!res.ok) throw new Error('Failed to load courses')
      const data = await res.json()
      setCourses(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  if (loading) return <div className="p-6 text-slate-500">Loading courses...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(c => (
        <button key={c.id} onClick={()=>onSelect && onSelect(c)} className="text-left bg-white/70 border border-slate-200 rounded-xl p-4 hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{c.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{c.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="inline-flex items-center gap-1"><User size={14}/> {c.instructor}</span>
              </div>
            </div>
          </div>
        </button>
      ))}
      {courses.length === 0 && (
        <div className="col-span-full text-center text-slate-500 border border-dashed rounded-xl p-6">No courses yet. Create one above.</div>
      )}
    </div>
  )
}

export default CourseList
