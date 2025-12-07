// app/page.tsx
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { 
  ArrowRight, 
  Heart, 
  Activity, 
  Apple, 
  Moon, 
  BarChart3, 
  Users,
  Shield,
  Cloud,
  Zap,
  Clock
} from 'lucide-react'

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
        <Navbar />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Join 10,000+ Health Enthusiasts
              </div>
              
              <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Take Control of Your
                <span className="text-primary"> Health Journey</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-serif">
                Track your fitness, monitor nutrition, and achieve your wellness goals with our comprehensive health tracker.
                Your personal health companion for a better tomorrow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth/signup" 
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="#features" 
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/10 transition-all"
                >
                  <span>Learn More</span>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Cloud Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-muted-foreground">24/7 Support</span>
                </div>
              </div>
            </div>
            
            {/* Health Metrics Dashboard Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-accent/30 p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fitness</p>
                          <p className="text-lg font-bold">8,542</p>
                          <p className="text-xs text-muted-foreground">steps today</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-accent/30 p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-chart-3/20 rounded-lg">
                          <Apple className="w-5 h-5 text-chart-3" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nutrition</p>
                          <p className="text-lg font-bold">2,150</p>
                          <p className="text-xs text-muted-foreground">calories</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-accent/30 p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-chart-1/20 rounded-lg">
                          <Moon className="w-5 h-5 text-chart-1" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Sleep</p>
                          <p className="text-lg font-bold">7.5</p>
                          <p className="text-xs text-muted-foreground">hours</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-accent/30 p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-chart-2/20 rounded-lg">
                          <Heart className="w-5 h-5 text-chart-2" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Heart</p>
                          <p className="text-lg font-bold">72</p>
                          <p className="text-xs text-muted-foreground">bpm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mini Chart */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Weekly Progress</span>
                    <span className="text-sm text-green-500">↑ 12%</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {[40, 60, 75, 85, 70, 90, 80].map((height, index) => (
                      <div 
                        key={index}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Everything You Need for Your Health Journey
              </h2>
              <p className="text-lg text-muted-foreground font-serif">
                Comprehensive tools and insights to help you achieve your wellness goals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group bg-background border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-primary/30"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 text-accent-foreground text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Trusted by Health Enthusiasts
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                What Our Users Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of users who transformed their health journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic font-serif">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400 fill-current">
                        ★
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Health?
              </h2>
            
              <Link 
                href="/auth/signup" 
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl text-lg"
              >
               
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Join 10,000+ health enthusiasts already using HealthTrack Pro
              </p>
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  )
}

const features = [
  {
    icon: <BarChart3 size={28} />,
    title: "Advanced Analytics",
    description: "Visualize your health data with beautiful charts and insights",
    benefits: [
      "Progress tracking over time",
      "Customizable reports",
      "Goal setting and monitoring",
      "Trend analysis"
    ]
  },
  {
    icon: <Activity size={28} />,
    title: "Fitness Tracking",
    description: "Comprehensive workout and activity monitoring",
    benefits: [
      "Workout logging",
      "Step counter integration",
      "Calorie burn tracking",
      "Exercise library"
    ]
  },
  {
    icon: <Apple size={28} />,
    title: "Nutrition Diary",
    description: "Track your meals, macros, and water intake",
    benefits: [
      "Food database with 1M+ items",
      "Macro nutrient tracking",
      "Water intake reminders",
      "Meal planning"
    ]
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Fitness Coach",
    quote: "HealthTrack helped me lose 30lbs and completely transformed my relationship with food and exercise."
  },
  {
    name: "Michael Chen",
    initials: "MC",
    role: "Marathon Runner",
    quote: "The detailed analytics helped me optimize my training and achieve my personal best marathon time."
  },
  {
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    role: "Nutritionist",
    quote: "I recommend HealthTrack to all my clients. It's the most comprehensive health tracker I've seen."
  }
]