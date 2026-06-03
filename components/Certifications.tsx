import ScrollReveal from "./ScrollReveal";

// Data sertifikat statis — nanti bisa dipindahkan ke Supabase saat koneksi stabil
const certData = [
    { id: 1, title: 'TOEFL Certification', issuer: 'Bahasa Inggris Profesional', icon: 'fa-solid fa-language', badgeClass: 'badge-gold' },
    { id: 2, title: 'Microsoft Office Specialist', issuer: 'Pengolahan Data Tingkat Lanjut', icon: 'fa-brands fa-microsoft', badgeClass: 'badge-blue' },
];

export default function Certifications() {
    return (
        <section id="sertifikat" className="cert-section">
            <div className="container">
                <h2 className="section-title" style={{textAlign: 'center'}}>Certifications.</h2>
                <div className="cert-container">
                    {certData.map((cert) => (
                       <ScrollReveal key={cert.id}>
                           <div className="cert-card">
                                <div className={`cert-badge ${cert.badgeClass}`}>
                                    <i className={cert.icon}></i>
                                </div>
                                <div className="cert-info">
                                    <h3>{cert.title}</h3>
                                    <p>{cert.issuer}</p>
                                </div>
                            </div>
                       </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
