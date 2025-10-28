'use client'

import { useEffect, useState, useRef } from 'react'
import { Plane } from 'lucide-react'

interface Aircraft {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  delay: number
  rotation: number
  size: number
  opacity: number
  brightness: number
}

const generateRandomAircraft = (id: number): Aircraft => {
  // Random size category: small, medium, large
  const sizeCategory = Math.random()
  let size: number
  if (sizeCategory < 0.3) {
    size = 18 + Math.random() * 10 // small: 18-28px
  } else if (sizeCategory < 0.7) {
    size = 28 + Math.random() * 15 // medium: 28-43px
  } else {
    size = 43 + Math.random() * 20 // large: 43-63px
  }
  
  // Náhodný štart z okrajov obrazovky (ako FlightRadar)
  const startEdge = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
  let startX: number, startY: number
  
  switch (startEdge) {
    case 0: // top
      startX = 20 + Math.random() * 60 // 20-80% šírky
      startY = -10
      break
    case 1: // right
      startX = 110
      startY = 20 + Math.random() * 60
      break
    case 2: // bottom
      startX = 20 + Math.random() * 60
      startY = 110
      break
    case 3: // left
    default:
      startX = -10
      startY = 20 + Math.random() * 60
      break
  }
  
  // Náhodný cieľ kdekoľvek na obrazovke alebo na opačnom okraji
  let endX: number, endY: number
  const crossScreen = Math.random() > 0.3 // 70% šanca preletieť cez obrazovku
  
  if (crossScreen) {
    // Prelet cez obrazovku - cieľ na opačnej/susednej strane
    const endEdge = (startEdge + 1 + Math.floor(Math.random() * 3)) % 4
    switch (endEdge) {
      case 0: // top
        endX = 20 + Math.random() * 60
        endY = -10
        break
      case 1: // right
        endX = 110
        endY = 20 + Math.random() * 60
        break
      case 2: // bottom
        endX = 20 + Math.random() * 60
        endY = 110
        break
      case 3: // left
      default:
        endX = -10
        endY = 20 + Math.random() * 60
        break
    }
  } else {
    // Prelet cez stred obrazovky
    endX = 30 + Math.random() * 40 // 30-70% šírky
    endY = 30 + Math.random() * 40 // 30-70% výšky
  }
  
  // Calculate rotation - lietadlo smeruje nosom PRESNE v smere letu
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)
  
  return {
    id,
    startX,
    startY,
    endX,
    endY,
    duration: 25 + Math.random() * 35, // 25-60 seconds
    delay: Math.random() * 20, // 0-20 seconds delay
    rotation: angle,
    size,
    opacity: 0.35 + Math.random() * 0.35, // 0.35-0.7 opacity
    brightness: 1.3 + Math.random() * 0.4, // 1.3-1.7 brightness
  }
}

export function FloatingAircraft() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([])
  const [mounted, setMounted] = useState(false)
  const styleRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Create style element for keyframes
    const style = document.createElement('style')
    styleRef.current = style
    document.head.appendChild(style)
    
    // Generate initial aircraft
    const initialAircraft = Array.from({ length: 10 }, (_, i) => generateRandomAircraft(i))
    setAircraft(initialAircraft)
    updateKeyframes(initialAircraft, style)

    // Regenerate aircraft periodically to keep them moving
    const interval = setInterval(() => {
      const newAircraft = Array.from({ length: 10 }, (_, i) => generateRandomAircraft(i))
      setAircraft(newAircraft)
      updateKeyframes(newAircraft, style)
    }, 25000) // Regenerate every 25 seconds

    return () => {
      clearInterval(interval)
      if (styleRef.current) {
        document.head.removeChild(styleRef.current)
      }
    }
  }, [])

  const updateKeyframes = (aircraftList: Aircraft[], style: HTMLStyleElement) => {
    const keyframes = aircraftList.map(plane => {
      // Vypočítaj delta pre pohyb - v CSS jednotkách
      // const deltaX = plane.endX - plane.startX
      // const deltaY = plane.endY - plane.startY
      
      // Lucide Plane ikona potrebuje offset 45° aby smerovala správne
      // plane.rotation je uhol smeru letu (vypočítaný cez atan2)
      const finalRotation = plane.rotation + 45
      
      return `
        @keyframes fly-${plane.id} {
          from {
            left: ${plane.startX}vw;
            top: ${plane.startY}vh;
            transform: rotate(${finalRotation}deg);
            opacity: 0;
          }
          10% {
            opacity: ${plane.opacity};
          }
          90% {
            opacity: ${plane.opacity};
          }
          to {
            left: ${plane.endX}vw;
            top: ${plane.endY}vh;
            transform: rotate(${finalRotation}deg);
            opacity: 0;
          }
        }
      `
    }).join('\n')
    
    style.textContent = keyframes
  }

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {aircraft.map((plane) => (
        <div
          key={plane.id}
          className="absolute"
          style={{
            width: `${plane.size}px`,
            height: `${plane.size}px`,
            animation: `fly-${plane.id} ${plane.duration}s linear ${plane.delay}s infinite`,
            willChange: 'transform, left, top',
          }}
        >
          {/* Chemtrail - stopa za lietadlom */}
          <div
            className="absolute"
            style={{
              width: `${plane.size * 4}px`,
              height: `${plane.size * 0.15}px`,
              background: `linear-gradient(to right, transparent, rgba(255, 215, 0, ${plane.opacity * 0.1}), rgba(255, 215, 0, ${plane.opacity * 0.3}), rgba(255, 215, 0, ${plane.opacity * 0.5}))`,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(-45deg) translateX(-${plane.size * 2.5}px)`,
              transformOrigin: 'center',
              filter: 'blur(3px)',
              opacity: 0.7,
              pointerEvents: 'none',
            }}
          />
          
          {/* Lietadlo - Lucide Plane ikona smeruje defaultne doprava → */}
          <Plane
            style={{
              width: `${plane.size}px`,
              height: `${plane.size}px`,
              opacity: plane.opacity,
              color: '#FFD700',
              filter: `brightness(${plane.brightness}) drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 5px rgba(212, 175, 55, 1))`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

