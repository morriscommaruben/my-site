import Scene from "@/components/three/Scene";

export default function Home() {
  return (
    <section className="mx-auto max-w-5x1 px-6 py-16">
      <h1 className="text 4x1 font-bold">Ruby Morris</h1>
      <p className="mt-2 text-lg opacity-80">Software Developer, the Joker.</p>
      <div className="mt-10">
        <Scene />
      </div>
    </section>
  );
}