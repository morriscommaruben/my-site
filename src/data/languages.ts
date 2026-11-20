import type { RadialMenuItem } from "@/components/ui/RadialMenu"

// Add or remove entries and the menu re-divides itself automatically.
export const languages: RadialMenuItem[] = [

  { id: "javascript", 
    label: "JavaScript", 
    detail: "Core JavaScript",
    imageURL: "/images/js.png", 
  },

  { id: "java", 
    label: "Java", 
    detail: "Java",
    imageURL: "/images/java.png", 
  },

  { id: "html", 
    label: "HTML", 
    detail: "HTML5",
    imageURL: "/images/html5.png", 
  },

  { id: "css", 
    label: "CSS", 
    detail: "Core CSS",
    imageURL: "/images/css.png", 
  },

  { id: "python", 
    label: "Python", 
    imageURL: "/images/python.png", 
  },

  { id: "csharp", 
    label: "C#", 
    detail: "C#",
    imageURL: "/images/csharp.png", 
  },

  { id: "c",
    label: "C",
    detail: "C",
    imageURL: "/images/c.png", 
  },

  { id: "typescript",
    label: "Typescript",
    detail: "TypeScript",
    imageURL: "/images/ts.png", 
  },

];