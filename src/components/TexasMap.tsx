export function TexasMap() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="about-map"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Texas State Outline */}
      <path
        d="M100,40 L180,35 L200,30 L260,35 L280,45 L320,45 L340,55 L355,70
           L360,90 L365,120 L370,150 L375,180 L380,210 L375,240 L365,270
           L355,295 L340,315 L320,335 L290,355 L260,370 L230,375 L200,380
           L170,375 L140,365 L115,350 L95,330 L80,305 L70,275 L65,245
           L60,215 L55,185 L50,155 L45,125 L50,100 L60,75 L75,55 L100,40 Z"
        fill="#1F3B2D"
        stroke="#162A20"
        strokeWidth="2"
      />

      {/* Austin Star */}
      <g transform="translate(195, 230)">
        {/* Star shape */}
        <polygon
          points="0,-20 5,-7 19,-7 8,3 12,17 0,9 -12,17 -8,3 -19,-7 -5,-7"
          fill="#C9A24D"
          stroke="#B08F3E"
          strokeWidth="1"
        />
        {/* Glow effect */}
        <circle
          r="28"
          fill="none"
          stroke="#C9A24D"
          strokeWidth="2"
          opacity="0.4"
        />
      </g>

      {/* Austin Label */}
      <text
        x="195"
        y="275"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="16"
        fontWeight="800"
        fill="#C9A24D"
        letterSpacing="0.1em"
      >
        AUSTIN
      </text>

      {/* State label */}
      <text
        x="200"
        y="150"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="24"
        fontWeight="800"
        fill="#FAF8F4"
        opacity="0.3"
        letterSpacing="0.2em"
      >
        TEXAS
      </text>
    </svg>
  );
}
