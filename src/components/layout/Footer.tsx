export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-5xl px-6 py-6 text-sm opacity-70">
        © {new Date().getFullYear()} Ruby Morris
      </div>
    </footer>
  );
}