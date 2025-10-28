import { formatCurrency } from '@/lib/utils'

interface PriceDisplayProps {
  from: number
  to: number
  label?: string
  className?: string
}

export function PriceDisplay({ from, to, label, className = '' }: PriceDisplayProps) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{label}</p>
      )}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-playfair text-gradient-gold">
          {formatCurrency(from)}
        </span>
        <span className="text-gray-500">-</span>
        <span className="text-2xl font-bold font-playfair text-gradient-gold">
          {formatCurrency(to)}
        </span>
      </div>
    </div>
  )
}

