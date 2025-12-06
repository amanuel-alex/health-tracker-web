// Template for: fitness/page.tsx, nutrition/page.tsx, hydration/page.tsx, sleep/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Apple, Droplets, Moon } from 'lucide-react'

// Map icons and titles based on page
const pageConfig = {
  fitness: { title: 'Fitness Tracking', icon: Activity, description: 'Track workouts and physical activities' },
  nutrition: { title: 'Nutrition Tracking', icon: Apple, description: 'Log meals and monitor nutrition' },
  hydration: { title: 'Hydration Tracking', icon: Droplets, description: 'Track water intake and hydration goals' },
  sleep: { title: 'Sleep Tracking', icon: Moon, description: 'Monitor sleep patterns and quality' },
}

export default function Page({ params }: { params: { slug: string } }) {
  const config = pageConfig[params.slug as keyof typeof pageConfig] || 
                { title: 'Page', icon: Activity, description: '' }
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
        <p className="text-muted-foreground mt-1">{config.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            This feature is currently under development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/30 mb-4">
              <Icon className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Feature in Progress
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working hard to bring you this feature. Check back soon!
            </p>
            <Button>Back to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}