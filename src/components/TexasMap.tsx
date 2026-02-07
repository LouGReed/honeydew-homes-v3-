interface TexasMapProps {
  variant?: 'hero' | 'detail';
  showServiceRadius?: boolean;
  className?: string;
}

export function TexasMap({ variant = 'hero', showServiceRadius = false, className = '' }: TexasMapProps) {
  return (
    <svg
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`texas-map texas-map-${variant} ${className}`}
      aria-label="Texas state map with Austin marked"
    >
      {/* Texas State Silhouette - Clean, minimal */}
      <path
        className="texas-map-state"
        d="M125,45 L145,40 L165,36 L185,34 L205,33 L225,34 L245,36 L265,40 L285,46
           L302,54 L316,64 L328,76 L338,90 L346,106 L352,124 L356,144 L358,166
           L358,188 L356,210 L352,232 L346,252 L338,270 L328,286 L316,300 L302,312
           L286,322 L268,330 L248,336 L228,340 L208,342 L188,342 L168,340 L148,336
           L130,330 L114,322 L100,312 L88,300 L78,286 L70,270 L64,252 L60,232
           L58,210 L58,188 L60,166 L64,144 L70,124 L78,106 L88,90 L100,76
           L114,64 L125,45 Z"
        fill="currentColor"
      />

      {/* Service Radius Ring (for detail variant) */}
      {showServiceRadius && (
        <g className="texas-map-service-ring">
          <circle
            cx="205"
            cy="245"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            className="texas-map-radius"
          />
          <circle
            cx="205"
            cy="245"
            r="32"
            fill="currentColor"
            opacity="0.08"
            className="texas-map-radius-glow"
          />
        </g>
      )}

      {/* Austin Star Marker */}
      <g className="texas-map-marker" transform="translate(205, 245)">
        {/* Star */}
        <path
          d="M0,-12 L2.8,-3.7 L11.4,-3.7 L4.9,2.3 L7.4,11.4 L0,6 L-7.4,11.4 L-4.9,2.3 L-11.4,-3.7 L-2.8,-3.7 Z"
          className="texas-map-star"
        />
      </g>

      {/* Austin Label */}
      <text
        x="205"
        y="278"
        textAnchor="middle"
        className="texas-map-label"
      >
        AUSTIN
      </text>
    </svg>
  );
}
