import React from "react";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 min-h-[50vh]">
      <h1 className="font-serif text-4xl mb-12 text-[var(--color-primary)] text-center">Sustainability Commitment</h1>
      <div className="text-[var(--color-text-muted)] leading-relaxed text-lg">
        <p className="mb-4">Thoughtful Choices for a Better Future</p><p className="mb-4">We are committed to reducing waste and promoting responsible consumption wherever possible.</p><p className="mb-4">Our sustainability efforts include:<ul className="list-disc pl-6 my-4 space-y-2"><li>Durable products designed for long-term use</li></ul><li>Minimal and recyclable packaging materials</li><li>Responsible sourcing practices</li><li>Reduced packaging waste</li></p><p className="mb-4">We continuously strive to improve our processes and make environmentally conscious decisions throughout our operations.</p>
      </div>
    </div>
  );
}