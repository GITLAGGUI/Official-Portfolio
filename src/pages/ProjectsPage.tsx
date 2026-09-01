import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { archivedProjects, featuredProjects, projects } from "../data/projects";

const filters = ["All", "Web product", "AI automation", "Computer vision", "Data engineering", "NLP and data science"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleFeatured = useMemo(
    () => activeFilter === "All" ? featuredProjects : featuredProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  return (
    <div className="content-page projects-page">
      <header className="page-header page-header--split">
        <div>
          <p className="eyebrow">Selected work</p>
          <h1>Projects built around real constraints.</h1>
        </div>
        <p>
          Each case study separates what shipped, what was tested, what stays private, and what is still in progress. No invented metrics or generic README dumps.
        </p>
      </header>

      <div className="project-filters" role="group" aria-label="Filter featured projects">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            className={activeFilter === filter ? "is-active" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="result-count">{visibleFeatured.length} of {featuredProjects.length} featured projects</p>
      <section className="project-grid" aria-label="Featured projects">
        {visibleFeatured.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </section>

      {visibleFeatured.length === 0 && (
        <div className="empty-state">No featured case study uses that exact category yet. Try All to see the complete set.</div>
      )}

      <section className="archive-section" aria-labelledby="archive-title">
        <div className="section-heading">
          <div><p className="eyebrow">Archive</p><h2 id="archive-title">More work</h2></div>
          <p>Earlier mobile, commerce, data, and academic builds—kept concise and grounded in the evidence that remains available.</p>
        </div>
        <div className="archive-grid">
          {archivedProjects.map((project) => <ProjectCard key={project.slug} project={project} compact />)}
        </div>
      </section>

      <div className="project-index-note">{projects.length} case-study records · stable slug routes · legacy numeric links preserved</div>
    </div>
  );
}
