export function TexasMapDots({ className = '' }: { className?: string }) {
  // More accurate Texas boundary for dot placement
  const dots: { cx: number; cy: number }[] = [];
  const dotRadius = 3.5;
  const spacing = 11;

  // Texas shape using polygon point-in-polygon test
  // Key coordinates for accurate Texas outline
  const texasPolygon = [
    // Panhandle top
    [103, 25], [103, 130],
    // Panhandle to main body transition
    [103, 130], [60, 130],
    // West border (angled down to Big Bend)
    [60, 130], [45, 180], [35, 230], [50, 280], [75, 320],
    // Big Bend curve
    [75, 320], [65, 340], [55, 355], [60, 370], [80, 380],
    // Southern tip (Rio Grande)
    [80, 380], [110, 395], [140, 400], [170, 395],
    // Gulf coast curve
    [170, 395], [200, 380], [230, 350], [255, 310], [270, 270],
    // East border up
    [270, 270], [280, 230], [275, 190], [265, 150], [250, 115],
    // Northeast corner (Texarkana area)
    [250, 115], [235, 85], [215, 60], [190, 45], [165, 35],
    // Top border back to panhandle
    [165, 35], [140, 28], [120, 25], [103, 25]
  ];

  // Point in polygon test
  const isInTexas = (x: number, y: number): boolean => {
    let inside = false;
    for (let i = 0, j = texasPolygon.length - 1; i < texasPolygon.length; j = i++) {
      const xi = texasPolygon[i][0], yi = texasPolygon[i][1];
      const xj = texasPolygon[j][0], yj = texasPolygon[j][1];

      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  };

  // Generate dots with offset rows for better fill
  let rowIndex = 0;
  for (let y = 25; y < 405; y += spacing) {
    const offsetX = (rowIndex % 2) * (spacing / 2);
    for (let x = 30 + offsetX; x < 290; x += spacing) {
      if (isInTexas(x, y)) {
        dots.push({ cx: x, cy: y });
      }
    }
    rowIndex++;
  }

  return (
    <svg
      viewBox="0 0 320 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`texas-map-dots ${className}`}
      aria-label="Texas state map with Austin marked"
    >
      {/* Dot pattern fill */}
      <g className="texas-dots">
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dotRadius}
            className="texas-dot"
          />
        ))}
      </g>

      {/* Austin Star with subtle halo */}
      <g className="texas-austin-marker" transform="translate(190, 250)">
        {/* Subtle halo ring */}
        <circle
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 3"
          className="texas-halo"
          opacity="0.4"
        />
        {/* Star */}
        <path
          d="M0,-11 L2.5,-3.5 L10.5,-3.5 L4.5,2 L6.8,10.5 L0,5.5 L-6.8,10.5 L-4.5,2 L-10.5,-3.5 L-2.5,-3.5 Z"
          className="texas-star"
        />
      </g>

      {/* Austin Label */}
      <text
        x="190"
        y="288"
        textAnchor="middle"
        className="texas-austin-label"
      >
        AUSTIN
      </text>
    </svg>
  );
}
