import Image from 'next/image'

interface WolfMarkProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

// Wolf silhouette mark — client supplies /public/wolf-logo.png
// CSS trick: filter:invert(1) flips colors; mix-blend-mode:screen makes
// the now-black background disappear, leaving only the white silhouette.
export default function WolfMark({ size = 210, className = '', style }: WolfMarkProps) {
  return (
    <Image
      src="/wolf-logo.png"
      alt="Wild Dogs Events wolf mark"
      width={size}
      height={Math.round(size * 0.667)}
      unoptimized
      className={className}
      style={{
        width: size,
        height: 'auto',
        filter: 'invert(1) brightness(0.9)',
        mixBlendMode: 'screen',
        opacity: 0.78,
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
    />
  )
}

// Fixed bottom-left mark — desktop only (hidden below 860px)
export function WolfMarkFixed() {
  return (
    <div
      id="wolfWrap"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 10,
        bottom: 0,
        zIndex: 40,
        pointerEvents: 'none',
      }}
      className="hidden wolf:block"
    >
      <WolfMark size={210} />
    </div>
  )
}
