/* eslint-disable react/no-unescaped-entities */

export const WhySection = () => {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Source+Serif+4:wght@300;400;600&display=swap');

        .story-section { font-family: 'Source Serif 4', serif; }
        .story-heading { font-family: 'Playfair Display', serif; }

        .quote-block {
          position: relative;
          border-left: 3px solid #1a1a1a;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
        }

        .founder-badge {
          display: inline-block;
          background: #1a1a1a;
          color: #fff;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          margin-bottom: 1rem;
        }

        .stat-card {
          border: 1px solid #e2e2e2;
          background: #fff;
          padding: 1.5rem;
          text-align: center;
          transition: box-shadow 0.2s;
        }
        .stat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          display: block;
          margin-bottom: 0.4rem;
        }

        .divider-ornament {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 3rem 0;
        }
        .divider-ornament::before,
        .divider-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #d4d4d4;
        }
        .divider-ornament span {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: #888;
          white-space: nowrap;
        }

        .closing-callout {
          background: #1a1a1a;
          color: #fff;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .closing-callout::before {
          content: '"';
          font-family: 'Playfair Display', serif;
          font-size: 12rem;
          line-height: 1;
          color: rgba(255,255,255,0.05);
          position: absolute;
          top: -1rem;
          left: 0.5rem;
          pointer-events: none;
        }
      `}</style>

      <div className="story-section max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="founder-badge">Founded by Broderick Smith</p>
          <h2 className="story-heading text-5xl font-bold mb-4 leading-tight">Our Story</h2>
          <p style={{ color: '#666', maxWidth: '36rem', margin: '0 auto', lineHeight: '1.8' }}>
            A story born inside the walls of the Texas Department of Criminal Justice —
            and built to outlast them.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          <div className="stat-card">
            <span className="stat-number">1</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777' }}>
              Founder's Vision
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777' }}>
              Barriers Identified
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-number">∞</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777' }}>
              Lives to Change
            </span>
          </div>
        </div>

        {/* Main Narrative */}
        <div style={{ lineHeight: '1.9', fontSize: '1.05rem', color: '#2a2a2a' }}>

          <p className="mb-6">
            During our founder Broderick Smith's incarceration in the Texas Department of
            Criminal Justice, he encountered many inmates who had limited or no support.
            Most of them looked to the illegal prison drug trade as a means to provide
            themselves food, hygiene, and other necessities.
          </p>

          <p className="mb-6">
            Upon further inspection, he noticed most of those same individuals were
            <strong> very talented artistically</strong> — drawing beautiful artworks, but
            only as a hobby. He asked a few of them why they didn't sell their art instead
            of drugs. They all gave him variations of the same three answers:
          </p>

          {/* The 3 Barriers */}
          <div style={{ margin: '2rem 0 2.5rem', paddingLeft: '1.5rem', borderLeft: '3px solid #1a1a1a' }}>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "They had no one outside to send their art to.",
                "They thought it was too complicated for them and their supporters to sell the art.",
                "They couldn't trust their outside supporters with the proceeds from their art sales.",
              ].map((barrier, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    lineHeight: '1.3',
                    minWidth: '1.8rem',
                    color: '#1a1a1a',
                  }}>{i + 1}.</span>
                  <span>{barrier}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mb-6">
            Even though those answers were valid, Broderick realized they were only
            half of the problem. He glanced around the day room one day and saw inmates
            sitting around gambling, arguing, or high off drugs. None of them seemed to
            be bettering themselves. None of them seemed to have a plan for their time
            incarcerated.
          </p>

          <div className="divider-ornament">
            <span>A moment of clarity</span>
          </div>

          <p className="mb-6">
            Broderick was struck — but the reason was apparent. Too many prisoners feel
            like they're doing useless or "dead" time and begin to see their incarceration
            as a sort of pause in their lives.{" "}
            <em>That couldn't be further from the truth.</em> And so, The Art of Reform®
            was created.
          </p>

          <p className="mb-6">
            Once prisoners found out there was a way for them to provide for themselves
            legally and peacefully, they were ecstatic. They boasted about how much better
            it felt compared to selling drugs. One inmate told Broderick how he made sure
            to stay out of trouble so he could remain able to buy art supplies. Others
            thanked him earnestly after making commissary for the first time in months —
            even years.
          </p>

        </div>

        {/* Closing Callout */}
        <div className="closing-callout mt-10">
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.3rem', lineHeight: '1.7', position: 'relative', zIndex: 1, marginBottom: '1.25rem' }}>
            The joy in their faces is why our company came to be. And as long as there's
            at least one inmate out there with no direction, no hope, or no support —
            The Art of Reform® will be here to make a change.
          </p>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            — Broderick Smith, Founder
          </span>
        </div>

      </div>
    </section>
  );
};