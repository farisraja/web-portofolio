import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { logout } from '../login/actions'
import ParticlesBackground from '@/components/ParticlesBackground'
import ProjectManager from '@/components/ProjectManager'

export default async function DeveloperDashboard() {
  const supabase = await createClient()

  // Verifikasi ulang dari sisi server meskipun middleware sudah bekerja (Lapis Ganda)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Ambil data proyek untuk dikelola
  const { data: projects } = await supabase
    .from('projects_metadata')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', position: 'relative' }}>
      <ParticlesBackground />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0, fontSize: '2.5rem' }}>Developer Terminal.</h1>
            <form action={logout}>
                <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #ff4d4f, #ff7875)', boxShadow: '0 4px 15px rgba(255, 77, 79, 0.3)', border: 'none', cursor: 'pointer' }}>
                    <i className="fa-solid fa-right-from-bracket"></i> Tutup Sesi & Kunci
                </button>
            </form>
        </div>

        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '4rem' }}>
            <div className="contact-form" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.3rem' }}><i className="fa-solid fa-server" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Sistem Inti</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>Selamat datang kembali hacker, <strong style={{color: 'var(--primary-blue)'}}>{user.email}</strong>. Anda berada di zona eksklusif. Kendali penuh sistem portofolio ada di tangan Anda.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="btn-github" style={{ justifyContent: 'center' }}>
                        <i className="fa-solid fa-database"></i> Buka Konsol Supabase
                    </a>
                </div>
            </div>

            <div className="contact-form" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.3rem' }}><i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Status Keamanan</h3>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', listStyle: 'none' }}>
                    <li><i className="fa-solid fa-check-circle" style={{ color: '#52c41a', marginRight: '8px' }}></i> Edge Middleware Aktif</li>
                    <li><i className="fa-solid fa-check-circle" style={{ color: '#52c41a', marginRight: '8px' }}></i> Enkripsi Sandi Supabase</li>
                    <li><i className="fa-solid fa-check-circle" style={{ color: '#52c41a', marginRight: '8px' }}></i> Server-Side Cookie Parser</li>
                    <li><i className="fa-solid fa-check-circle" style={{ color: '#52c41a', marginRight: '8px' }}></i> Pendaftaran Publik Ditutup</li>
                </ul>
            </div>
        </div>

        {/* Konsol Menejemen Proyek */}
        <ProjectManager initialProjects={projects || []} />
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
             <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '3px' }}>&larr; Cek Tampilan Layar Publik (Beranda)</Link>
         </div>
      </div>
    </div>
  )
}

