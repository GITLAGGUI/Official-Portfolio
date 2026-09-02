import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { archivedProjects, featuredProjects, projects } from "../data/projects";

const filters = [
  { label: "All work", categories: [] },
  { label: "Websites & apps", categories: ["Web product", "Commerce", "Mobile", "Web application", "Web design"] },
  { label: "Automation", categories: ["AI automation", "Workflow automation", "Developer tool", "Desktop utility"] },
  { label: "AI & data", categories: ["Computer vision", "Data engineering", "NLP and data science", "Data application", "Data visualization"] },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All work");
  const visibleFeatured = useMemo(
    () => {
      const filter = filters.find((item) => item.label === activeFilter);
      return !filter || filter.categories.length === 0
        ? featuredProjects
        : featuredProjects.filter((project) => filter.categories.includes(project.category));
    },
    [activeFilter],
  );

  return (
    <div className="content-page projects-page">
      <header className="page-header page-header--split">
        <div>
          <p className="eyebrow">Selected work</p>
          <h1>What I built, why it matters, and how it works.</h1>
        </div>
        <p>
          Choose a project to see the problem, the solution, the tools used, and real screenshots or public-safe evidence.
        </p>
      </header>

      <div className="project-filters" role="group" aria-label="Filter featured projects">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            aria-pressed={activeFilter === filter.label}
            className={activeFilter === filter.label ? "is-active" : ""}
            onClick={() => setActiveFilter(filter.label)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="result-count">{visibleFeatured.length} of {featuredProjects.length} featured projects</p>
      <section className="project-grid" aria-label="Featured projects">
        {visibleFeatured.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </section>

      {visibleFeatured.length === 0 && (
        <div className="empty-state">No project is in this group yet. Choose All work to see everything.</div>
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
