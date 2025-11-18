import { useState } from 'react'
import { Plus } from 'lucide-react'

function CourseForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, instructor })
      })
      if (!res.ok) throw new Error('Failed to create course')
      setTitle(''); setDescription(''); setInstructor('')
      onCreated && onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/70 border border-slate-200 rounded-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="border rounded-lg px-3 py-2" placeholder="Course title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <input className="border rounded-lg px-3 py-2" placeholder="Instructor" value={instructor} onChange={(e)=>setInstructor(e.target.value)} required />
        <input className="border rounded-lg px-3 py-2 md:col-span-3" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm text-slate-500">Create a new course</p>
        <button disabled={loading} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <Plus size={16} /> Add Course
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </form>
  )
}

export default CourseForm
