interface ParallaxImageProps {
  src: string
  speed?: number
  base?: string
  alt?: string
  className?: string
}

export function ParallaxImage({
  src,
  speed = 0.05,
  base = 'translate(-50%,-50%)',
  alt = '',
  className,
}: ParallaxImageProps) {
  return (
    <img
      data-parallax={speed}
      data-px-base={base}
      src={src}
      alt={alt}
      aria-hidden={alt === ''}
      className={className}
    />
  )
}
