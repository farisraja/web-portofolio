import { login } from './actions'
import ParticlesBackground from '@/components/ParticlesBackground'
import Link from 'next/link'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ errorMessage?: string }> }) {
  const params = await searchParams;
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <ParticlesBackground />
      <div className="contact-form" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
         <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Secure Area.</h2>
         <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Exclusive Developer Login Page</p>
         
         <form action={login}>
            <div className="form-group">
                <input type="email" name="email" placeholder="Authorized Email" className="form-control" required />
            </div>
            <div className="form-group">
                <input type="password" name="password" placeholder="Secret Passphrase" className="form-control" required />
            </div>
            
            {params?.errorMessage && (
                <div style={{ color: '#ff4d4f', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(255, 77, 79, 0.1)', padding: '10px', borderRadius: '8px' }}>
                    <i className="fa-solid fa-triangle-exclamation"></i> {params.errorMessage}
                </div>
            )}
            
            <button type="submit" className="btn btn-primary btn-submit" style={{ width: '100%', cursor: 'pointer' }}>Decrypt & Access <i className="fa-solid fa-unlock-keyhole"></i></button>
         </form>

         <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
             <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '3px' }}>&larr; Return to Public Sector</Link>
         </div>
      </div>
    </div>
  )
}
