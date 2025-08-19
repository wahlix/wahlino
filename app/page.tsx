import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 space-y-12">
      {/* Logotyp */}
      <section className="flex items-center justify-center">
        <Image
          src="/wahlino-logo.png"
          alt="Wahlino logo"
          width={200}
          height={200}
          priority
        />
      </section>

      {/* Rubriker (Playfair Display) */}
      <section className="space-y-4 text-center">
        <h1 className="text-5xl font-[var(--font-playfair)]">Wahlino Casino</h1>
        <h2 className="text-3xl font-[var(--font-playfair)]">
          Blackjack • Poker • Bingo
        </h2>
      </section>

      {/* Brödtext & UI (Oswald som sans) */}
      <section className="max-w-2xl mx-auto text-center space-y-4">
        <p className="font-sans text-lg">
          Välkommen till <span className="font-bold">Wahlino</span> – där turen
          möter strategin. Prova våra klassiska spel i en modern online-upplevelse.
        </p>
        <button className="bg-primary text-primary-foreground font-sans px-6 py-3 rounded-lg shadow hover:opacity-90 transition">
          Spela nu
        </button>
      </section>

      {/* Bankroll (Geist Mono) */}
      <section className="text-center space-y-2">
        <h3 className="text-xl font-sans">Din Bankroll</h3>
        <p className="font-[var(--font-geist-mono)] text-2xl tracking-wider">
          1 250 kr
        </p>
      </section>

      {/* Färgtest */}
      <section className="flex justify-center gap-4 pt-8">
        <div className="w-16 h-16 rounded-lg bg-primary" title="primary" />
        <div className="w-16 h-16 rounded-lg bg-secondary" title="secondary" />
        <div className="w-16 h-16 rounded-lg bg-accent" title="accent" />
        <div className="w-16 h-16 rounded-lg bg-muted" title="muted" />
      </section>
    </main>
  )
}
