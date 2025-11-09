export default function Home(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-background p-8">
      <main className="mx-auto w-full max-w-4xl space-y-12">
        {/* Hero Section */}
        <section className="bg-primary-light rounded-lg p-8">
          <h1 className="font-hero text-3xl text-primary mb-4">
            IronGirl - Font Test Page
          </h1>
          <p className="font-sans text-base text-foreground">
            This page demonstrates all the fonts loaded from your Figma design tokens.
          </p>
        </section>

        {/* Font Specimens */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="font-header text-2xl text-foreground mb-2">
              Typography Showcase
            </h2>
            <p className="font-sans text-base text-foreground/70">
              All fonts are loaded via Next.js Google Fonts optimization
            </p>
          </div>

          {/* Inter - Base Font */}
          <div className="bg-header-light rounded-lg p-6">
            <h3 className="font-sans text-xl font-bold text-foreground mb-3">
              Inter (Base Font)
            </h3>
            <p className="font-sans text-xs text-foreground mb-2">
              Extra Small (11px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-sans text-base text-foreground mb-2">
              Base (15px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-sans text-xl text-foreground mb-2">
              Extra Large (19px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-sans text-2xl text-foreground mb-2">
              2X Large (22px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-sans text-3xl text-foreground">
              3X Large (26px) - The quick brown fox jumps over the lazy dog
            </p>
          </div>

          {/* Inria Serif - Hero Font */}
          <div className="bg-primary-light rounded-lg p-6">
            <h3 className="font-hero text-xl font-bold text-primary mb-3">
              Inria Serif (Hero Font)
            </h3>
            <p className="font-hero text-xs text-foreground mb-2">
              Extra Small (11px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-hero text-base text-foreground mb-2">
              Base (15px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-hero text-xl text-foreground mb-2">
              Extra Large (19px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-hero text-2xl text-foreground mb-2">
              2X Large (22px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-hero text-3xl text-foreground">
              3X Large (26px) - The quick brown fox jumps over the lazy dog
            </p>
          </div>

          {/* Kaisei Tokumin - Header Font */}
          <div className="bg-header-light rounded-lg p-6">
            <h3 className="font-header text-xl font-bold text-header mb-3">
              Kaisei Tokumin (Header Font)
            </h3>
            <p className="font-header text-xs text-foreground mb-2">
              Extra Small (11px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-header text-base text-foreground mb-2">
              Base (15px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-header text-xl text-foreground mb-2">
              Extra Large (19px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-header text-2xl text-foreground mb-2">
              2X Large (22px) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-header text-3xl text-foreground">
              3X Large (26px) - The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="font-header text-2xl text-foreground border-l-4 border-primary pl-6">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary rounded-lg p-6 text-white">
              <p className="font-sans text-base font-bold">Primary 500</p>
              <p className="font-sans text-xs">#ff5492</p>
            </div>
            <div className="bg-primary-light rounded-lg p-6 border border-primary">
              <p className="font-sans text-base font-bold text-foreground">Primary 400</p>
              <p className="font-sans text-xs text-foreground">#fdeef5</p>
            </div>
            <div className="bg-header rounded-lg p-6 text-foreground">
              <p className="font-sans text-base font-bold">Header 500</p>
              <p className="font-sans text-xs">#ffc9e1</p>
            </div>
            <div className="bg-header-light rounded-lg p-6 border border-header">
              <p className="font-sans text-base font-bold text-foreground">Header 400</p>
              <p className="font-sans text-xs text-foreground">#f2ebeb</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
