// components/ui/chart-tooltip.tsx
'use client'

import { TooltipProps } from 'recharts'

// Proper type for payload entry
interface PayloadEntry {
  name?: string
  value?: string | number | Array<string | number>
  payload?: any
  color?: string
  dataKey?: string | number
}

// Extend TooltipProps with correct types
interface ChartTooltipProps extends Omit<TooltipProps<number, string>, 'payload'> {
  unit?: string
  formatter?: (value: number, name: string) => string
  payload?: PayloadEntry[]
}

export function ChartTooltip({ active, payload, unit, formatter }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  // Format value based on type
  const formatValue = (value: number | string | undefined, name: string | undefined) => {
    if (value === undefined) return 'N/A'
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    
    if (formatter && name) {
      return formatter(numValue, name)
    }
    
    // Default formatting
    if (name?.toLowerCase().includes('sleep')) {
      return `${numValue.toFixed(1)}h`
    }
    if (name?.toLowerCase().includes('calorie')) {
      return `${numValue.toLocaleString()} cal`
    }
    if (name?.toLowerCase().includes('step')) {
      return `${numValue.toLocaleString()}`
    }
    return numValue.toLocaleString()
  }

  return (
    <div className="rounded-xl border border-border bg-card/95 backdrop-blur-sm p-4 shadow-2xl min-w-[200px]">
      { (
        <div className="mb-2">
          <p className="font-semibold text-foreground text-sm">{}</p>
        </div>
      )}
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const color = entry.color || '#3b82f6'
          const name = entry.name || entry.dataKey?.toString() || 'Value'
          const value = typeof entry.value === 'number' || typeof entry.value === 'string' 
            ? entry.value 
            : Array.isArray(entry.value) ? entry.value[0] : undefined
          
          return (
            <div key={`tooltip-${index}`} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium text-foreground">
                  {name}
                </span>
              </div>
              <span className="text-sm font-bold text-foreground">
                {formatValue(value, name)}
                {unit && ` ${unit}`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}