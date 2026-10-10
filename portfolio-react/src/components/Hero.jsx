function Hero() {

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">

      <div className="md:col-span-5 order-2 md:order-1">

        <h2 className="font-label-caps text-label-caps text-primary mb-6">
          BRANDING | WEB DESIGN
        </h2>

        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mb-8">

          Diseño
          <br />

          <span className="font-headline-editorial italic font-normal text-primary">
            experiencias
          </span>

          <br />

          <span className="font-headline-editorial italic font-normal text-primary">
            digitales
          </span>

          <br />

          para marcas
          <br />

          con algo que contar

        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-10">
          Creo diseño con identidad, desde la primera idea hasta la experiencia digital
        </p>

        <a
          href="#proyectos"
          className="inline-block bg-primary text-on-primary px-12 py-5 rounded font-label-caps tracking-widest text-body-md hover:bg-primary/90 transition-all active:scale-95"
        >
          ¿Tienes una idea?
        </a>

      </div>

      <div className="md:col-span-7 order-1 md:order-2 relative">

        <div
          className="relative aspect-square max-w-[540px] mx-auto overflow-hidden border border-primary/30"
          style={{
            borderRadius: "62% 38% 54% 46% / 48% 62% 38% 52%"
          }}
        >

          <img
            className="w-full h-full object-cover scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfysC1X1VA92pzWsmt6kfGak6GMzcuvIh-wZyj1vzj2WcKdXjjzY6HH7i0tKxgtm9mp0YmxAfQw7fdDoLSZ2tsZMN_mur2na8HhvcF1zeC-S4FGw2eUqGxEODaIqIL64WQaxHubmO-5cCedCIqWNoclupNlLAByBWtGEpMTvkkNeiGd639IEaZtWGOmeMpz8RZ2fSjszjuTUoAm6Y3XbZ7qUDALWNU0gAp_GU2rC4krHjgo4Iq1A4hpjPlBEkY02escEUHCb3ngSqUCHA"
            alt="Retrato editorial de Narnígena"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;