export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
};

//slug: to be used later for individual project pages
//.     eg: /projects/example-project

export const projects: Project[] = [
  // Add your first project by uncommenting and editing this:
  // {
  //   slug: "example-project",
  //   title: "Example Project",
  //   description: "One or two sentence summary of project.",
  //   tags: ["React", "Three.js"],
  //   githubUrl: "https://github.com/morriscommaruben/example-project",
  //   liveUrl: "https://example.com",
  // },
];