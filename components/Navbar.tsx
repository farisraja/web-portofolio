"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Membaca preferensi pengunjung dari localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "project", "sertifikat", "contact"];
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Navbar offset threshold (150px dari atas)
          if (rect.top <= 150) {
            currentSection = section;
          }
        }
      }

      // Jika di-scroll mentok ke bawah halaman
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        currentSection = "contact";
      }

      setActiveItem(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Set status awal saat halaman baru dimuat
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          portofolio<span>.</span>
        </Link>
        <ul className="nav-links" style={{ display: "flex", alignItems: "center" }}>
          <li><Link href="#home" className={activeItem === "home" ? "active" : ""} onClick={() => setActiveItem("home")}>Home</Link></li>
          <li><Link href="#about" className={activeItem === "about" ? "active" : ""} onClick={() => setActiveItem("about")}>About</Link></li>
          <li><Link href="#skills" className={activeItem === "skills" ? "active" : ""} onClick={() => setActiveItem("skills")}>Skills</Link></li>
          <li><Link href="#project" className={activeItem === "project" ? "active" : ""} onClick={() => setActiveItem("project")}>Project</Link></li>
          <li><Link href="#sertifikat" className={activeItem === "sertifikat" ? "active" : ""} onClick={() => setActiveItem("sertifikat")}>Certifications</Link></li>
          <li><Link href="#contact" className={activeItem === "contact" ? "active" : ""} onClick={() => setActiveItem("contact")}>Contact</Link></li>
          
          <button 
            onClick={toggleTheme} 
            title="Toggle Light/Dark Mode"
            style={{ 
              background: "transparent", 
              border: "none", 
              color: "var(--text-primary)", 
              fontSize: "1.1rem", 
              cursor: "pointer",
              marginLeft: "1.5rem",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1) rotate(15deg)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
          >
            {theme === "dark" ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun" style={{ color: "#f59e0b" }}></i>}
          </button>
        </ul>
      </div>
    </nav>
  );
}
