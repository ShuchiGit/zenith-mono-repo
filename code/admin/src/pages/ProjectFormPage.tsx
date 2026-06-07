import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { createProject, updateProject, getProject, uploadProjectImages } from '@/services/projectService'
import { useToast } from '@/components/ui/Toast'
import { InlineLoader } from '@/components/ui/Loader'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  location: z.string().min(2, 'Location required'),
  sector: z.string().optional(),
  city: z.string().min(2, 'City required'),
  bhkTypes: z.string().min(1, 'BHK types required'),
  priceMin: z.number().positive('Must be positive'),
  priceMax: z.number().positive('Must be positive'),
  status: z.enum(['UNDER_CONSTRUCTION', 'READY_TO_MOVE', 'NEW_LAUNCH']),
  description: z.string().optional(),
  reraNumber: z.string().optional(),
  builderName: z.string().optional(),
  totalUnits: z.number().optional(),
  highlights: z.string().optional(),
  amenities: z.string().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ProjectFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [projectId, setProjectId] = useState<number | null>(null)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isActive: true, isFeatured: false, status: 'UNDER_CONSTRUCTION' },
  })

  useEffect(() => {
    if (!isEdit || !id) return
    getProject(Number(id)).then((res) => {
      const p = res.data
      setProjectId(p.id)
      reset({
        name: p.name, location: p.location, sector: p.sector, city: p.city,
        bhkTypes: p.bhkTypes,
        priceMin: Number(p.priceMin),
        priceMax: Number(p.priceMax),
        status: p.status,
        description: p.description, reraNumber: p.reraNumber, builderName: p.builderName,
        totalUnits: p.totalUnits != null ? Number(p.totalUnits) : undefined,
        highlights: p.highlights?.join('\n') || '',
        amenities: p.amenities?.join('\n') || '', isActive: p.isActive, isFeatured: p.isFeatured,
        metaTitle: p.metaTitle, metaDesc: p.metaDesc,
      })
    }).catch(() => toast('Failed to load project', 'error'))
      .finally(() => setLoading(false))
  }, [id, isEdit, reset, toast])

  const onDrop = useCallback((accepted: File[]) => {
    setPendingFiles((prev) => [...prev, ...accepted])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    multiple: true,
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const payload = {
        ...data,
        highlights: data.highlights?.split('\n').filter(Boolean) || [],
        amenities: data.amenities?.split('\n').filter(Boolean) || [],
      }

      let savedId = projectId
      if (isEdit && projectId) {
        await updateProject(projectId, payload)
        toast('Project updated', 'success')
      } else {
        const res = await createProject(payload)
        savedId = res.data.id
        setProjectId(savedId)
        toast('Project created', 'success')
      }

      if (pendingFiles.length > 0 && savedId) {
        setUploadingImages(true)
        const formData = new FormData()
        pendingFiles.forEach((f) => formData.append('images', f))
        await uploadProjectImages(savedId, formData)
        setPendingFiles([])
        toast('Images uploaded', 'success')
        setUploadingImages(false)
      }

      navigate('/projects')
    } catch (err: unknown) {
      const e = err as { message?: string }
      toast(e?.message || 'Failed to save project', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <InlineLoader />

  const field = (label: string, name: keyof FormData, type = 'text', required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...register(name, type === 'number' ? { valueAsNumber: true } : {})}
        type={type}
        step={type === 'number' ? 'any' : undefined}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/30 focus:border-[#006d77]"
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Project' : 'New Project'}
        </h2>
        <button onClick={() => navigate('/projects')} className="text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold text-gray-900 text-sm uppercase tracking-wide text-gray-500">Basic Info</h3>
          {field('Project Name', 'name', 'text', true)}
          {field('Location', 'location', 'text', true)}
          {field('Sector', 'sector')}
          {field('City', 'city', 'text', true)}
          {field('BHK Types (e.g. 2 BHK,3 BHK)', 'bhkTypes', 'text', true)}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status <span className="text-red-500">*</span></label>
            <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none">
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
              <option value="READY_TO_MOVE">Ready to Move</option>
              <option value="NEW_LAUNCH">New Launch</option>
            </select>
          </div>
          {field('Price Min (Crores)', 'priceMin', 'number', true)}
          {field('Price Max (Crores)', 'priceMax', 'number', true)}
          {field('Builder Name', 'builderName')}
          {field('RERA Number', 'reraNumber')}
          {field('Total Units', 'totalUnits', 'number')}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea {...register('description')} rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold text-sm uppercase tracking-wide text-gray-500">Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Highlights (one per line)</label>
            <textarea {...register('highlights')} rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amenities (one per line)</label>
            <textarea {...register('amenities')} rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold text-sm uppercase tracking-wide text-gray-500">SEO</h3>
          {field('Meta Title', 'metaTitle')}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
            <textarea {...register('metaDesc')} rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Images</h3>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-[#006d77] bg-[#e6f4f5]' : 'border-gray-200 hover:border-[#83c5be]'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {isDragActive ? 'Drop images here…' : 'Drag & drop images here, or click to select'}
            </p>
          </div>
          {pendingFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pendingFiles.map((f, i) => (
                <div key={i} className="relative">
                  <img src={URL.createObjectURL(f)} alt="" className="w-20 h-16 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setPendingFiles((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {uploadingImages && <p className="text-sm text-[#006d77]">Uploading images…</p>}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input {...register('isActive')} type="checkbox" className="w-4 h-4 accent-[#006d77]" />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input {...register('isFeatured')} type="checkbox" className="w-4 h-4 accent-[#006d77]" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/projects')} className="px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="px-6 py-2.5 text-sm text-white bg-[#006d77] rounded-lg hover:bg-[#005a63] disabled:opacity-60 transition-colors">
            {submitting ? 'Saving…' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}
