export default function FormaLogo({ variant = "dark", size = 40 }) {
  const ink = variant === "light" ? "#F7F3EE" : "#1C1814"
  const accent = "#BF4E1E"
  const bg = variant === "light" ? "#1C1814" : "#F7F3EE"
  const aspectRatio = 120 / 120
  const width = size * aspectRatio

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Forma logo"
    >
      { variant === "filled" &&
        <rect width="120" height="120" fill={bg} />
      }
      { /* Two outer columns */ }
      <rect x="18" y="22" width="14" height="72" fill={ink} />
      <rect x="84" y="22" width="14" height="72" fill={ink} />
      { /* Accent center bar */ }
      <rect x="52" y="22" width="6" height="72" fill={accent} />
      { /* Top horizontal — F cap */ }
      <rect x="18" y="22" width="80" height="9" fill={ink} />
      { /* Mid horizontal — F arm */ }
      <rect x="18" y="48" width="54" height="8" fill={ink} />
    </svg>
  )
}
