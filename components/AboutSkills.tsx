export default function AboutSkills() {
  return (
    <section id="about" className="about-skills-section">
        <div className="container about-skills-content" style={{flexDirection: 'column', gap: '6rem'}}>
            <div className="about-text" style={{width: '100%'}}>
                <h2 className="section-title text-center">About Me.</h2>
                <p className="about-description text-center" style={{maxWidth: '800px', margin: '0 auto 2rem auto'}}>
                    Lulusan Ilmu Komputer dari <strong>Universitas Pakuan</strong>. Pernah aktif di IEEE dan memiliki minat mendalam pada keamanan siber serta algoritma pemrosesan data.
                </p>
                <div className="about-highlights" style={{justifyContent: 'center'}}>
                    <div className="highlight-item">
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>Ilmu Komputer</span>
                    </div>
                    <div className="highlight-item">
                        <i className="fa-solid fa-shield-halved"></i>
                        <span>Cybersecurity</span>
                    </div>
                    <div className="highlight-item">
                        <i className="fa-solid fa-laptop-code"></i>
                        <span>Web Developer</span>
                    </div>
                </div>
            </div>

            <div id="skills" className="skills-grid-container" style={{width: '100%'}}>
                <div className="skills-glow"></div>
                <h2 className="section-title text-center" style={{fontSize: '2rem'}}>My Skills.</h2>
                <div className="skills-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    <div className="skill-card">
                        <div className="skill-icon icon-cyan" style={{animationDelay: "0s"}}>
                            <i className="fa-solid fa-network-wired"></i>
                        </div>
                        <h3>Network Security</h3>
                        <div style={{display: 'flex', gap: '12px', margin: '15px 0'}}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" style={{width: '32px'}} title="Linux" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" style={{width: '32px'}} title="Bash" />
                        </div>
                        <p>Cisco CyberOps, Wireshark, Nmap, Kali Linux</p>
                    </div>

                    <div className="skill-card">
                        <div className="skill-icon icon-purple" style={{animationDelay: "1.5s"}}>
                            <i className="fa-solid fa-laptop-code"></i>
                        </div>
                        <h3>Web Development</h3>
                        <div style={{display: 'flex', gap: '12px', margin: '15px 0'}}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" style={{width: '32px', filter: 'invert(1)'}} title="Next.js" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" style={{width: '32px'}} title="Tailwind CSS" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style={{width: '32px'}} title="React" />
                        </div>
                        <p>Next.js, Tailwind CSS</p>
                    </div>

                    <div className="skill-card" style={{gridColumn: 'auto'}}>
                        <div className="skill-icon icon-blue" style={{animationDelay: "3s"}}>
                            <i className="fa-solid fa-chart-pie"></i>
                        </div>
                        <h3>Data/Algorithms</h3>
                        <div style={{display: 'flex', gap: '12px', margin: '15px 0'}}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style={{width: '32px'}} title="Python" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-plain.svg" style={{width: '32px'}} title="Jupyter" />
                        </div>
                        <p>Visualisasi Data, Processing Algoritma</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
