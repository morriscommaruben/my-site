import type { RadialMenuItem } from "@/components/ui/RadialMenu"

// Add or remove entries and the menu re-divides itself automatically.
export const languages: RadialMenuItem[] = [

  { id: "javascript", 
    label: "JavaScript / TypeScript", 
    detail: "Core JavaScript and TypeScript",
    imageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1280px-Unofficial_JavaScript_logo_2.svg.png?utm_source=simple.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
  },

  { id: "java", 
    label: "Java", 
    imageURL: "https://wallpaperaccess.com/full/13634484.jpg",
  },

  { id: "html", 
    label: "HTML", 
    detail: "HTML5",
    imageURL: "/images/html5.png", 
  },

  { id: "css", 
    label: "CSS + Tailwind", 
    detail: "Core CSS and TailwindCSS",
    imageURL: "https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-css/sta-je-css.png",
  },

  { id: "python", 
    label: "Python", 
    imageURL: "https://miro.medium.com/1*3IcLSFuT8PQg4cUBaRXH1A.png",
  },

  { id: "csharp", 
    label: "C#", 
    detail: "C# and .NET",
    imageURL: "https://beecrowd.com/wp-content/uploads/2024/04/2023-09-19-C-sharp.jpg",
  },

  { id: "c",
    label: "C",
    imageURL: "https://cdnp3.stackassets.com/b38250f66d7755bad12fc293434dad4ed1faf415/store/3310b73f0c2f2b79c4e3a097dc9c871ce24376e2b363d8ce52e670b4bea7/sale_9406_primary_image.jpg",
  },

];