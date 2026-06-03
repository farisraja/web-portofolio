import ScrollReveal from "./ScrollReveal";

const GITHUB_USERNAME = 'farisraja';

// Mapping manual untuk memperkaya data proyek dari GitHub
const projectEnhancements: Record<string, { displayName: string; description: string; category: string; techStack: string[]; icon: string }> = {
  'pb-cipta-sports': {
    displayName: 'PB. Cipta Badminton League',
    description: 'A modern web application to manage badminton competitions, rankings, and team distributions professionally and fairly.',
    category: 'Web Application',
    techStack: ['TypeScript', 'Next.js', 'Vercel'],
    icon: 'fa-solid fa-trophy',
  },
  'analisis_keranjang_belanja_2026': {
    displayName: 'Comparison of Apriori, FP-Growth & ECLAT Algorithms',
    description: 'Data mining algorithm research to find purchase patterns in market basket datasets. Comparing the performance of three association rule mining algorithms.',
    category: 'Data Mining',
    techStack: ['Python', 'Data Mining', 'Apriori', 'FP-Growth', 'ECLAT'],
    icon: 'fa-solid fa-chart-line',
  },
  'profile_screen': {
    displayName: 'Profile Screen - Flutter UI',
    description: 'User profile interface design built using Flutter and Dart for mobile platforms.',
    category: 'Mobile Development',
    techStack: ['Dart', 'Flutter', 'UI/UX'],
    icon: 'fa-solid fa-user-circle',
  },
  'flutter_profile_screen': {
    displayName: 'Flutter Profile Screen',
    description: 'Profile screen implementation using the Flutter framework with a responsive material design.',
    category: 'Mobile Development',
    techStack: ['Dart', 'Flutter'],
    icon: 'fa-solid fa-mobile-screen-button',
  },
  'dartcode': {
    displayName: 'DartCode - Dart Code Snippets',
    description: 'A collection of programming exercises and experiments using the Dart language. Building logic foundations for mobile app development.',
    category: 'Programming',
    techStack: ['Dart'],
    icon: 'fa-solid fa-terminal',
  },
  'codela-dart': {
    displayName: 'Codela - Dart Application',
    description: 'Programming exploration project using the Dart language. Building the foundation for mobile application development.',
    category: 'Mobile Development',
    techStack: ['Dart', 'Flutter'],
    icon: 'fa-solid fa-code',
  },
  'website-statis': {
    displayName: 'Personal Static Website',
    description: 'The first static website built using pure HTML, CSS, and JavaScript. The early foundation of my web development journey.',
    category: 'Web Development',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    icon: 'fa-solid fa-globe',
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
  const projects = githubRepos.length > 0 
    ? githubRepos.map((repo: any) => {
        const enhancement = projectEnhancements[repo.name];
        return {
          id: repo.id,
          name: enhancement?.displayName || repo.name,
          description: enhancement?.description || repo.description || 'Open-source project on GitHub.',
          category: enhancement?.category || repo.language || 'Other',
          techStack: enhancement?.techStack || (repo.language ? [repo.language] : []),
          githubUrl: repo.html_url,
          icon: enhancement?.icon || 'fa-solid fa-code',
        };
      })
    : // Fallback statis jika GitHub API tidak bisa diakses
      [
        { id: 1, name: 'PB. Cipta Badminton League', description: 'A modern web application to manage badminton competitions, rankings, and team distributions professionally and fairly.', category: 'Web Application', techStack: ['TypeScript', 'Next.js', 'Vercel'], githubUrl: 'https://github.com/farisraja/pb-cipta-sports', icon: 'fa-solid fa-trophy' },
        { id: 2, name: 'Comparison of Apriori, FP-Growth & ECLAT Algorithms', description: 'Data mining algorithm research to find purchase patterns in market basket datasets.', category: 'Data Mining', techStack: ['Python', 'Data Mining', 'Apriori'], githubUrl: 'https://github.com/farisraja/analisis_keranjang_belanja_2026', icon: 'fa-solid fa-chart-line' },
        { id: 3, name: 'Profile Screen - Flutter UI', description: 'User profile interface design using Flutter and Dart.', category: 'Mobile Development', techStack: ['Dart', 'Flutter'], githubUrl: 'https://github.com/farisraja/profile_screen', icon: 'fa-solid fa-user-circle' },
        { id: 4, name: 'Flutter Profile Screen', description: 'Profile screen implementation using the Flutter framework.', category: 'Mobile Development', techStack: ['Dart', 'Flutter'], githubUrl: 'https://github.com/farisraja/flutter_profile_screen', icon: 'fa-solid fa-mobile-screen-button' },
        { id: 5, name: 'DartCode - Dart Code Snippets', description: 'A collection of programming exercises and experiments using the Dart language.', category: 'Programming', techStack: ['Dart'], githubUrl: 'https://github.com/farisraja/dartcode', icon: 'fa-solid fa-terminal' },
        { id: 6, name: 'Codela - Dart Application', description: 'Programming exploration project using the Dart language.', category: 'Mobile Development', techStack: ['Dart', 'Flutter'], githubUrl: 'https://github.com/farisraja/codela-dart', icon: 'fa-solid fa-code' },
        { id: 7, name: 'Personal Static Website', description: 'The first static website using pure HTML, CSS, and JavaScript.', category: 'Web Development', techStack: ['HTML', 'CSS', 'JavaScript'], githubUrl: 'https://github.com/farisraja/website-statis', icon: 'fa-solid fa-globe' },
      ];

  return (
    <section id="project" className="project-section">
      <div className="project-bg-glow"></div>
      <div className="project-particles"></div>

      <div className="container">
        <h2 className="section-title" style={{ textAlign: "center" }}>My Projects.</h2>

        <div className="project-grid">
          {projects.map((project) => (
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
                    <i className="fa-brands fa-github"></i> View on GitHub
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
