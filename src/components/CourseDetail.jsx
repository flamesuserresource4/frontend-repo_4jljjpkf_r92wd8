import { useEffect, useState } from 'react'
import { ListOrdered, CheckCircle } from 'lucide-react'

function CourseDetail({ course, userEmail }) {
  const [lessons, setLessons] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState({})
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadLessons = async () => {
    const res = await fetch(`${baseUrl}/api/lessons?course_id=${course.id}`)
    const data = await res.json()
    setLessons(data)
  }

  const loadProgress = async () => {
    if (!userEmail) return
    const res = await fetch(`${baseUrl}/api/progress?user_email=${encodeURIComponent(userEmail)}&course_id=${course.id}`)
    const data = await res.json()
    const map = {}
    data.forEach(p => { map[p.lesson_id] = true })
    setProgress(map)
  }

  useEffect(()=>{ loadLessons(); loadProgress() }, [course.id, userEmail])

  const addLesson = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, course_id: course.id })
      })
      if (!res.ok) throw new Error('Failed to add lesson')
      setTitle(''); setContent('')
      await loadLessons()
    } finally {
      setLoading(false)
    }
  }

  const markDone = async (lesson) => {
    if (!userEmail) return alert('Enter your email at the top to track progress')
    await fetch(`${baseUrl}/api/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_email: userEmail, course_id: course.id, lesson_id: lesson.id, completed: true })
    })
    await loadProgress()
  }

  return (
    <div className="bg-white/70 border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{course.title}</h3>
          <p className="text-slate-600">{course.description}</p>
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <h4 className="font-medium text-slate-700 mb-2 inline-flex items-center gap-2"><ListOrdered size={16}/> Lessons</h4>
          <div className="space-y-2">
            {lessons.map(l => (
              <div key={l.id} className="flex items-start justify-between bg-white border rounded-lg p-3">
                <div>
                  <p className="font-medium text-slate-800">{l.title}</p>
                  {l.content && <p className="text-sm text-slate-500">{l.content}</p>}
                </div>
                <button onClick={()=>markDone(l)} className="inline-flex items-center gap-1 text-sm text-green-700 hover:text-green-800">
                  <CheckCircle size={16}/> Mark done
                </button>
              </div>
            ))}
            {lessons.length === 0 && <div className="text-slate-500 border border-dashed rounded-lg p-6">No lessons yet.</div>}
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-medium text-slate-700 mb-2">Add a lesson</h4>
          <form onSubmit={addLesson} className="space-y-2">
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Lesson title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Content (optional)" value={content} onChange={(e)=>setContent(e.target.value)} />
            <button disabled={loading} className="w-full bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-800">Add Lesson</button>
          </form>
        </div>
      </div>

      {userEmail && (
        <div className="mt-6">
          <h4 className="font-medium text-slate-700 mb-2">Your progress</h4>
          <ul className="list-disc list-inside text-sm text-slate-600">
            {Object.keys(progress).length === 0 && <li>No progress tracked yet.</li>}
            {lessons.map(l => (
              <li key={l.id} className={progress[l.id] ? 'text-green-700' : ''}>
                {l.title} {progress[l.id] ? '— completed' : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CourseDetail
