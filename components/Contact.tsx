"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Membuka WhatsApp...");
    
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";
    
    const waNumber = "6285881971927"; // User's WhatsApp number
    const text = `Halo Faris!\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
    const encodedText = encodeURIComponent(text);
    
    // Buka link WhatsApp di tab baru
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
    
    // Reset form setelah beberapa saat
    setTimeout(() => {
      setResult("");
      formElement.reset();
    }, 2000);
  };

  return (
    <section id="contact" className="contact-section">
         <div className="container contact-container">
            <ScrollReveal>
                <div className="contact-header">
                    <h2 className="section-title">Get In Touch.</h2>
                    <p>Mencari talenta digital berbakat? Silakan tinggalkan pesan untuk mendiskusikan peluang karir terhebat Anda!</p>
                    <div className="social-3d-icons">
                        <a href="#" className="social-icon"><i className="fa-solid fa-envelope"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://github.com/farisraja" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-github"></i></a>
                    </div>
                </div>
            </ScrollReveal>
            
            <ScrollReveal>
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="Nama Anda" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email Terhubung" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <textarea name="message" placeholder="Tuliskan Pesan..." rows={4} className="form-control" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit">Kirim Pesan <i className="fa-solid fa-paper-plane"></i></button>
                </form>
                {result && <p style={{ marginTop: "1rem", color: "#4facfe", fontWeight: "bold", textAlign: "center" }}>{result}</p>}
            </ScrollReveal>
        </div>
    </section>
  );
}
