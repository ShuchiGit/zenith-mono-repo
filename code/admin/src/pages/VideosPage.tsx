import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getVideos, createVideo, updateVideo, deleteVideo } from '@/services/videoService'
import { InlineLoader } from '@/components/ui/Loader'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useToast } from '@/components/ui/Toast'
import type { Video } from '@/types'

const schema = z.object({
  title: z.string().min(2, 'Title required'),
  youtubeUrl: z.string().url('Enter a valid YouTube URL'),
  description: z.string().optional(),
  views: z.string().optional(),
  duration: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editVideo, setEditVideo] = useState<Video | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await getVideos()
      setVideos(res.data)
    } catch {
      toast('Failed to load videos', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])

  const openEdit = (v: Video) => {
    setEditVideo(v)
    reset({ title: v.title, youtubeUrl: v.youtubeUrl, description: v.description, views: v.views, duration: v.duration })
    setFormOpen(true)
  }

  const openNew = () => {
    setEditVideo(null)
    reset({ title: '', youtubeUrl: '', description: '', views: '', duration: '' })
    setFormOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      if (editVideo) {
        const res = await updateVideo(editVideo.id, data)
        setVideos((prev) => prev.map((v) => v.id === editVideo.id ? res.data : v))
        toast('Video updated', 'success')
      } else {
        const res = await createVideo(data)
        setVideos((prev) => [res.data, ...prev])
        toast('Video added', 'success')
      }
      setFormOpen(false)
    } catch {
      toast('Failed to save video', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteVideo(deleteId)
      setVideos((prev) => prev.filter((v) => v.id !== deleteId))
      toast('Video deleted', 'success')
    } catch {
      toast('Failed to delete video', 'error')
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#006d77] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a63] transition-colors">
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {loading ? <InlineLoader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div key={v.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{v.title}</h4>
                <div className="flex gap-2 text-xs text-gray-400 mb-3">
                  {v.views && <span>{v.views} views</span>}
                  {v.duration && <span>• {v.duration}</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(v)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#006d77] border border-[#83c5be]/40 rounded-lg hover:bg-[#e6f4f5] transition-colors">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => setDeleteId(v.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {videos.length === 0 && <p className="text-gray-400 col-span-3 text-center py-12">No videos yet</p>}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editVideo ? 'Edit Video' : 'Add Video'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { name: 'title' as const, label: 'Title', required: true },
            { name: 'youtubeUrl' as const, label: 'YouTube URL', required: true },
            { name: 'views' as const, label: 'Views (e.g. 1.2K)' },
            { name: 'duration' as const, label: 'Duration (e.g. 5:30)' },
          ].map(({ name, label, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && ' *'}</label>
              <input {...register(name)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none" />
              {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea {...register('description')} rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm text-white bg-[#006d77] rounded-lg hover:bg-[#005a63] disabled:opacity-60 transition-colors">
              {submitting ? 'Saving…' : editVideo ? 'Update' : 'Add Video'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Video" message="Remove this video from the portal?" loading={deleting} />
    </div>
  )
}
