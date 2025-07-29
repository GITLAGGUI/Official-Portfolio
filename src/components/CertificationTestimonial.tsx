
import { useEffect, useRef, useState } from "react";
import "./CertificationTestimonial.css";

const certificates = [
  {
    src: "/assets/Champion_Robotics.png",
    alt: "Champion Robotics",
    badge: "Champion",
    description: "RoboFusion 2025 - Certificate of Participation. Recognizes active participation in RoboFusion, held at Cauayan City, Isabela, as part of the International Smart and Sustainable Cities and Communities Exposition."
  },
  {
    src: "/assets/DATA ANALYTICS CHALLENGE - CHAMPION 1_page-0001.jpg",
    alt: "Data Analytics Champion",
    badge: "Champion",
    description: "ISU ICT Competition: Data Analytics Challenge - Champion. Awarded for achieving champion status in the Data Analytics Challenge during the 15th ICT Roadshow 2025 at Isabela State University."
  },
  {
    src: "/assets/Huawei_Certificate_of_Completion.png",
    alt: "Huawei Certificate",
    description: "Huawei Talent Online - Certificate of Completion. Successfully completed the Algorithm and Program Design course, demonstrating advanced skills in algorithm design and programming."
  },
  {
    src: "/assets/ITE-REF-20250329-802 - Certificate of Participation - Regional ITE Convention 2025_page-0001.jpg",
    alt: "ITE Convention",
    description: "Regional ITE Convention 2025 - Certificate of Participation. Participated in the regional convention with the theme 'Innovate, Transform, Sustain: Shaping a Smarter World' at St. Paul University Philippines."
  },
];


export default function CertificationTestimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemWidth = 420; // px, should match max-width in CSS
  const gap = 24; // px, gap between cards
  const totalItems = certificates.length;
  const duration = 60; // seconds for one full loop
  const totalWidth = totalItems * (itemWidth + gap);

  useEffect(() => {
    let animationFrameId: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000; // seconds
      // Calculate scroll position for a full loop in 'duration' seconds
      const scroll = ((elapsed / duration) * totalWidth) % totalWidth;
      setScrollPosition(scroll);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
    // eslint-disable-next-line
  }, [totalItems, totalWidth, duration]);

  // Duplicate certificates for seamless infinite scroll
  const displayCertificates = [...certificates, ...certificates];

  return (
    <section className="vscode-theme-certificates">
      <h2>Certifications & Achievements</h2>
      <p className="testimonial">
        "Earning these certifications and recognitions has been a testament to my dedication to continuous learning, innovation, and collaboration in the field of Information Technology. From being a champion in the Data Analytics Challenge to actively participating in regional and international tech conventions, each experience has fueled my passion for problem-solving and excellence. These achievements reflect not just my skills, but also my commitment to advancing STEM education and making a positive impact in the tech community."
      </p>
      <div className="certificates-smooth-slider" ref={containerRef} style={{ overflow: 'hidden', width: '100%' }}>
        <div
          className="smooth-slider-track"
          style={{
            display: 'flex',
            gap: `${gap}px`,
            transform: `translateX(-${scrollPosition}px)`,
            transition: 'none',
            width: `${displayCertificates.length * (itemWidth + gap)}px`,
          }}
        >
          {displayCertificates.map((cert, idx) => (
            <div
              className="certificate-card smooth-slider-card"
              key={idx}
              style={{
                minWidth: `${itemWidth}px`,
                maxWidth: `${itemWidth}px`,
                margin: '0',
                flex: '0 0 auto',
              }}
            >
              <img src={cert.src} alt={cert.alt} />
              {cert.badge && <span className="champion-badge">{cert.badge}</span>}
              <div className="certificate-description">{cert.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
