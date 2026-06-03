'use client'

import { useState } from 'react'
import { upsertProject, deleteProject } from '@/app/developer/actions'

interface Project {
  id: string
  display_name: string
  category: string
  description_long: string
  image_url: string
  tech_stack: string[]
  github_repo_id: number | null
  is_featured: boolean
}

interface ProjectManagerProps {
  initialProjects: Project[]
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects] = useState<Project[]>(initialProjects)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
    setMessage('')
  }

  const handleAddNew = () => {
    setEditingProject({
      id: 'new',
      display_name: '',
      category: '',
      description_long: '',
      image_url: '',
      tech_stack: [],
      github_repo_id: null,
      is_featured: true
    })
    setIsFormOpen(true)
    setMessage('')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return
    
    setIsSubmitting(true)
    const res = await deleteProject(id)
    if (res.success) {
      window.location.reload() // Paling gampang untuk update UI dashboard
    } else {
      setMessage('Eror saat menghapus: ' + res.error)
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const res = await upsertProject(formData)
    
    if (res.success) {
      setIsFormOpen(false)
      window.location.reload()
    } else {
      setMessage('Eror saat menyimpan: ' + res.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="project-manager-container" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem' }}>Daftar Proyek Portofolio</h3>
        <button 
          onClick={handleAddNew}
          className="btn btn-primary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
        >
          <i className="fa-solid fa-plus"></i> Tambah Proyek
        </button>
      </div>

      {message && (
        <div style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
          {message}
        </div>
      )}

      {/* List Proyek */}
      <div className="contact-form" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Nama Proyek</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Kategori</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Featured</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem' }}>{p.display_name}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {p.is_featured ? <i className="fa-solid fa-star" style={{ color: '#ffd700' }}></i> : '-'}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(p)} style={{ background: 'transparent', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', marginRight: '1rem' }}>
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
                    <i className="fa-solid fa-trash"></i> Hapus
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Belum ada proyek yang ditambahkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay / Form */}
      {isFormOpen && editingProject && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div className="contact-form" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                    {editingProject.id === 'new' ? 'Tambah Proyek' : 'Edit Proyek'}
                </h2>
                <button onClick={() => setIsFormOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={editingProject.id} />
              
              <div className="form-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nama Proyek</label>
                <input type="text" name="display_name" defaultValue={editingProject.display_name} className="form-control" required placeholder="Judul Proyek" />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Kategori</label>
                    <input type="text" name="category" defaultValue={editingProject.category} className="form-control" required placeholder="Mis: Security, Data, Web" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>GitHub Repo ID (Opsional)</label>
                    <input type="number" name="github_repo_id" defaultValue={editingProject.github_repo_id || ''} className="form-control" placeholder="123456789" />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>URL Gambar</label>
                <input type="text" name="image_url" defaultValue={editingProject.image_url} className="form-control" placeholder="https://domain.com/image.jpg" />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tech Stack (Pisahkan dengan koma)</label>
                <input type="text" name="tech_stack" defaultValue={editingProject.tech_stack.join(', ')} className="form-control" placeholder="Next.js, Tailwind, Supabase" />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Deskripsi Lengkap</label>
                <textarea name="description_long" defaultValue={editingProject.description_long} className="form-control" rows={4} required placeholder="Jelaskan detail proyek Anda..."></textarea>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" name="is_featured" id="is_featured" defaultChecked={editingProject.is_featured} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                <label htmlFor="is_featured" style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>Tampilkan di Beranda (Featured)</label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button 
                    type="button" 
                    onClick={() => setIsFormOpen(false)}
                    className="btn btn-github" 
                    style={{ flex: 1, cursor: 'pointer' }}
                >
                    Batal
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary btn-submit" 
                    style={{ flex: 2, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? 'Sedang Menyimpan...' : 'Simpan Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
