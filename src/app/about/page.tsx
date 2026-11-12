import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">About</h1>

      <p className="mt-6 leading-7">
        I am an aspiring software developer who thinks of programming as, first and foremost, a creative practice.
        Also I am the Joker from the movie Joker heehee hoohoo haha!!!
      </p>

      <h2 className="mt-10 text-xl font-semibold">Skills</h2>
      <ul className="mt-3 list-disc pl-6 leading-7">
        <li>JavaScript / TypeScript, C#, Java, CSS, HTML, Python</li>
        <li>React, Next.js, Three.js, Express.js</li>
        <li>Photoshop, Canva, Figma</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Contact Info</h2>
      <ul className="mt-3 leading-7 list-none">
        <li>morriscommaruben@gmail.com | +27 62 923 5062</li>
        <li>https://github.com/morriscommaruben/</li>
        <li>https://www.linkedin.com/in/ruben-morris-software-developer/</li>
      </ul>
    </section>
  );
}