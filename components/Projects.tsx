import ScrollReveal from "./ScrollReveal";

const GITHUB_USERNAME = 'farisraja';

// Mapping manual untuk memperkaya data proyek dari GitHub
const projectEnhancements: Record<string, { displayName: string; description: string; category: string; techStack: string[]; icon: string }> = {
  'analisis_keranjang_belanja_2026': {
    displayName: 'Komparasi Algoritma Apriori, FP-Growth & ECLAT',
    description: 'Penelitian algoritma data mining untuk menemukan pola pembelian dalam dataset keranjang belanja. Membandingkan performa tiga algoritma association rule mining secara komprehensif.',
    category: 'Data Mining',
    techStack: ['Python', 'Data Mining', 'Apriori', 'FP-Growth', 'ECLAT'],
    icon: 'fa-solid fa-chart-line',
  },
  'website-statis': {
    displayName: 'Website Statis Personal',
    description: 'Website statis pertama yang dibangun menggunakan HTML, CSS, dan JavaScript murni. Fondasi awal perjalanan pengembangan web.',
    category: 'Web Development',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    icon: 'fa-solid fa-globe',
  },
  'codela-dart': {
    displayName: 'Codela - Aplikasi Dart',
    description: 'Proyek eksplorasi pemrograman menggunakan bahasa Dart. Membangun logika dan fondasi untuk pengembangan aplikasi mobile.',
    category: 'Mobile Development',
    techStack: ['Dart', 'Flutter'],
    icon: 'fa-solid fa-mobile-screen-button',
  },
};

export default async function Projects() {
  let githubRepos: any[] = [];
  
  try {
    const githubRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
      {
        next: { revalidate: 3600 },
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {},
      }
    );
    if (githubRes.ok) {
      githubRepos = await githubRes.json();
    }
  } catch (e) {
    console.error("GitHub API Fetch Failed:", e);
  }

  // Gabungkan data GitHub dengan enhancement manual
  const projects = githubRepos.map((repo: any) => {
    const enhancement = projectEnhancements[repo.name];
    return {
      id: repo.id,
      name: enhancement?.displayName || repo.name,
      description: enhancement?.description || repo.description || 'Proyek open-source di GitHub.',
      category: enhancement?.category || repo.language || 'Other',
      techStack: enhancement?.techStack || (repo.language ? [repo.language] : []),
      githubUrl: repo.html_url,
      icon: enhancement?.icon || 'fa-solid fa-code',
      stars: repo.stargazers_count,
      language: repo.language,
    };
  });

  return (
    <section id="project" className="project-section">
      <div className="project-bg-glow"></div>
      <div className="project-particles"></div>

      <div className="container">
        <h2 className="section-title" style={{ textAlign: "center" }}>My Projects.</h2>

        <div className="project-grid">
          {projects.length > 0 ? projects.map((project) => (
            <ScrollReveal key={project.id}>
              <div className="project-card">
                <div className="project-visual">
                  <div className="visual-glow glow-blue"></div>
                  <i className={`${project.icon} float-anim project-icon`}></i>
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.techStack.map((tech: string) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github">
                    <i className="fa-brands fa-github"></i> Lihat di GitHub
                  </a>
                </div>
              </div>
            </ScrollReveal>
          )) : (
            <>
              {/* Fallback jika GitHub tidak bisa diakses */}
              <ScrollReveal>
                <div className="project-card">
                  <div className="project-visual">
                    <div className="visual-glow glow-blue"></div>
                    <i className="fa-solid fa-chart-line float-anim project-icon"></i>
                  </div>
                  <div className="project-info">
                    <h3>Komparasi Algoritma Apriori, FP-Growth & ECLAT</h3>
                    <p>Penelitian algoritma data mining untuk menemukan pola pembelian dalam dataset keranjang belanja.</p>
                    <div className="project-tags">
                      <span>Python</span>
                      <span>Data Mining</span>
                    </div>
                    <a href="https://github.com/farisraja/analisis_keranjang_belanja_2026" target="_blank" rel="noopener noreferrer" className="btn-github">
                      <i className="fa-brands fa-github"></i> Lihat di GitHub
                    </a>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="project-card">
                  <div className="project-visual">
                    <div className="visual-glow glow-blue"></div>
                    <i className="fa-solid fa-globe float-anim project-icon"></i>
                  </div>
                  <div className="project-info">
                    <h3>Website Statis Personal</h3>
                    <p>Website statis pertama yang dibangun menggunakan HTML, CSS, dan JavaScript murni.</p>
                    <div className="project-tags">
                      <span>HTML</span>
                      <span>CSS</span>
                      <span>JavaScript</span>
                    </div>
                    <a href="https://github.com/farisraja/website-statis" target="_blank" rel="noopener noreferrer" className="btn-github">
                      <i className="fa-brands fa-github"></i> Lihat di GitHub
                    </a>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="project-card">
                  <div className="project-visual">
                    <div className="visual-glow glow-blue"></div>
                    <i className="fa-solid fa-mobile-screen-button float-anim project-icon"></i>
                  </div>
                  <div className="project-info">
                    <h3>Codela - Aplikasi Dart</h3>
                    <p>Proyek eksplorasi pemrograman menggunakan bahasa Dart untuk pengembangan aplikasi mobile.</p>
                    <div className="project-tags">
                      <span>Dart</span>
                      <span>Flutter</span>
                    </div>
                    <a href="https://github.com/farisraja/codela-dart" target="_blank" rel="noopener noreferrer" className="btn-github">
                      <i className="fa-brands fa-github"></i> Lihat di GitHub
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
