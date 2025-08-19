import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/wahlino-logo.png"
          alt="Wahlino logo"
          width={200}
          height={200}
          className="mx-auto rounded-md"
          priority
        />
      </div>

      {/* Coming soon */}
      <h1 className="text-4xl font-[var(--font-playfair)] mb-4">Wahlino Casino</h1>
      <p className="text-lg font-sans text-muted-foreground max-w-md">
        Vi bygger just nu upp en modern kasinoupplevelse.<br />
        Snart kan du spela Blackjack, Poker och Bingo här!
      </p>

      {/* Liten badge/knapp */}
      <div className="mt-8">
        <span className="inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans shadow">
          🚧 Under konstruktion
        </span>
      </div>
    </main>
  )
}
