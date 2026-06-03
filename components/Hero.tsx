"use client";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section id="home" className="hero">
        <div className="glow-orb"></div>
        <div className="container hero-content">
            <div className="hero-text">
                <h1 className="headline">Halo, saya Faris Raja Ardana.</h1>
                <div style={{ minHeight: "80px", marginBottom: "1.5rem" }}>
                    <TypeAnimation
                        sequence={[
                            'Lulusan Ilmu Komputer yang antusias membangun solusi digital.', 2000,
                            'Berfokus pada Keamanan Jaringan dan Analisis Data.', 2000,
                            'Menyulap ide menjadi kode yang futuristik dan aman.', 2000
                        ]}
                        wrapper="p"
                        speed={50}
                        className="subtitle"
                        style={{ marginBottom: 0 }}
                        repeat={Infinity}
                    />
                </div>
                <a href="#project" className="btn btn-primary">VIEW MY PROJECT</a>
            </div>
            
            <div className="hero-visual">
                <div className="portrait-frame">
                    <img src="/profile-photo.JPEG" alt="Foto Faris Raja Ardana" className="portrait-img" />
                    <div className="frame-glow"></div>
                </div>
                
                <div className="floating-icon icon-shield">
                    <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="floating-icon icon-cube">
                    <i className="fa-solid fa-cube"></i>
                </div>
                <div className="floating-icon icon-code">
                    <i className="fa-solid fa-code"></i>
                </div>
            </div>
        </div>
    </section>
  );
}
