"use client";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section id="home" className="hero">
        <div className="glow-orb"></div>
        <div className="container hero-content">
            <div className="hero-text">
                <h1 className="headline">Hi, I'm Faris Raja Ardana.</h1>
                <div style={{ minHeight: "80px", marginBottom: "1.5rem" }}>
                    <TypeAnimation
                        sequence={[
                            'An enthusiastic Computer Science graduate building digital solutions.', 2000,
                            'Focused on Network Security and Data Analysis.', 2000,
                            'Turning ideas into futuristic and secure code.', 2000
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
                    <img src="/profile-photo.jpeg" alt="Foto Faris Raja Ardana" className="portrait-img" />
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
