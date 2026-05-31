import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-bg min-h-screen pb-32">
      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">Our Heritage, Your Legacy</h1>
        <p className="text-text-muted font-sans max-w-2xl mx-auto leading-relaxed">
          Siphorahq was born from a desire to preserve the meticulous artistry of Indian craftsmanship while adapting it to the modern wardrobe. Every piece we create is an ode to the women who wear them—elegant, strong, and unapologetically authentic.
        </p>
      </section>

      {/* Founder Story */}
      <section className="bg-ivory py-16">
        <div className="max-w-6xl mx-auto px-4 md:flex gap-16 items-center">
          <div className="md:w-1/2 aspect-[4/5] bg-neutral-200 relative mb-8 md:mb-0">
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-text-muted uppercase tracking-widest text-center px-4">
              Founder Portrait
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif mb-6">A Letter from the Founder</h2>
            <div className="text-text-muted font-sans space-y-4 leading-relaxed">
              <p>
                Growing up surrounded by the rich textiles of my grandmother's wardrobe, I developed a deep reverence for the stories woven into every yard of silk and zari.
              </p>
              <p>
                I founded Siphorahq because I wanted to create fashion that didn't just look luxurious, but felt meaningful. We don't believe in fast trends. We believe in heirlooms. We believe in creating garments that you will wear today, and pass down tomorrow.
              </p>
              <p className="font-serif italic text-lg text-text mt-8">
                "Luxury is not just what you wear. It is how it makes you feel."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-serif text-center mb-16">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Craftsmanship</h3>
            <p className="text-text-muted font-sans text-sm leading-relaxed">Partnering with multi-generational artisans to keep heritage techniques alive.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Sustainability</h3>
            <p className="text-text-muted font-sans text-sm leading-relaxed">Creating small-batch collections to minimize waste and honor the environment.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Heritage</h3>
            <p className="text-text-muted font-sans text-sm leading-relaxed">Rooted in Indian tradition, yet designed for the global modern woman.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Empowerment</h3>
            <p className="text-text-muted font-sans text-sm leading-relaxed">Ensuring fair wages and safe working conditions for all our creators.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
