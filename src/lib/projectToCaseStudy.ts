import { getProjectBySlug, type Project } from '../data/projects';
import type { CaseStudyProps } from '../components/CaseStudyPage.astro';

/**
 * Convert a Project (from projects.ts) into a CaseStudyProps payload
 * suitable for the operator <CaseStudyPage /> template.
 *
 * Required overrides:
 *  - meta (client / industry / timeline / techStack)
 *
 * Optional overrides:
 *  - badge, headline, headlineHighlight (default: derived from project)
 *  - extra metric cards
 *  - testimonial
 */
export interface CaseStudyOverrides {
  badge?: string;
  headline?: string;
  headlineHighlight?: string;
  subtitle?: string;
  meta: {
    client: string;
    industry: string;
    timeline: string;
    techStack: string[];
  };
  testimonial?: { quote: string; author: string; role: string };
  ctaHeadline?: string;
  ctaDescription?: string;
}

export function projectToCaseStudy(slug: string, overrides: CaseStudyOverrides): CaseStudyProps {
  const project = getProjectBySlug(slug) as Project | undefined;
  if (!project) {
    throw new Error(`projectToCaseStudy: project not found for slug "${slug}"`);
  }

  // Use the first stat as the headline highlight by default
  const firstStat = project.results.stats[0];
  const headlineHighlight =
    overrides.headlineHighlight ??
    (firstStat ? `${firstStat.number} ${firstStat.label}.` : project.tagline);

  return {
    badge: overrides.badge ?? project.tagline,
    headline: overrides.headline ?? `${project.name}.`,
    headlineHighlight,
    subtitle: overrides.subtitle ?? project.meta.description,
    meta: overrides.meta,
    metrics: project.results.stats.slice(0, 4).map((s) => ({
      number: s.number,
      label: s.label,
    })),
    problemHeadline: project.problem.headline,
    problemDescription: project.problem.description,
    painPoints: project.problem.painPoints,
    solutionHeadline: project.solution.headline,
    solutionDescription: project.solution.description,
    features: project.solution.features.map((f) => ({
      title: f.title,
      description: f.description,
    })),
    resultsHeadline: project.results.headline,
    resultsStats: project.results.stats,
    testimonial: overrides.testimonial ?? project.results.testimonial,
    ctaHeadline: overrides.ctaHeadline ?? project.cta.headline,
    ctaDescription: overrides.ctaDescription ?? project.cta.description,
    productUrl: project.productUrl,
    videoUrl: project.videoUrl,
  };
}
