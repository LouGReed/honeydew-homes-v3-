import { siteConfig } from '@/config/site';

export function ProofStrip() {
  return (
    <section className="proof-strip">
      <div className="container">
        <div className="proof-strip-inner">
          {siteConfig.proofPoints.map((point, index) => (
            <div key={index} className="proof-chip">
              <span className="proof-chip-icon">{point.icon}</span>
              <span className="proof-chip-text">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
