import Scene from "@/components/three/Scene";

export default function Home() {
  return (
    // tall section = scroll distance
    <section className="h-[300vh]">
      <div className="top-0 mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold">Ruby Morris</h1>
        <p className="mt-2 text-lg opacity-80">Software Developer, the Joker.</p>
        <div className="mt-10">
          <Scene />
        </div>
      </div>
    </section>
  );
}