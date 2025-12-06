// app/dashboard/analytics/page.tsx - COMPLETE FIXED VERSION
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, BarChart3, PieChart, LineChart, Calendar, Download, Filter } from 'lucide-react'
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { ChartTooltip } from '@/components/ui/chart-tooltip'

// Define data types
interface ChartData {
  day: string
  steps: number
  calories: number
  sleep: number
}

interface PieData {
  name: string
  value: number
  color: string
}

interface MonthlyData {
  month: string
  avgSteps: number
  avgCalories: number
}

export default function AnalyticsPage() {
  // Sample data
  const weeklyData: ChartData[] = [
    { day: 'Mon', steps: 8423, calories: 2350, sleep: 7.2 },
    { day: 'Tue', steps: 9120, calories: 2450, sleep: 7.5 },
    { day: 'Wed', steps: 7540, calories: 2100, sleep: 6.8 },
    { day: 'Thu', steps: 10542, calories: 2650, sleep: 7.8 },
    { day: 'Fri', steps: 8945, calories: 2400, sleep: 7.0 },
    { day: 'Sat', steps: 11230, calories: 2800, sleep: 8.2 },
    { day: 'Sun', steps: 6542, calories: 1950, sleep: 7.5 },
  ]

  const categoryData: PieData[] = [
    { name: 'Fitness', value: 35, color: '#3b82f6' },
    { name: 'Nutrition', value: 25, color: '#10b981' },
    { name: 'Sleep', value: 20, color: '#8b5cf6' },
    { name: 'Hydration', value: 15, color: '#06b6d4' },
    { name: 'Health', value: 5, color: '#ef4444' },
  ]

  const monthlyData: MonthlyData[] = [
    { month: 'Jan', avgSteps: 8450, avgCalories: 2350 },
    { month: 'Feb', avgSteps: 8920, avgCalories: 2420 },
    { month: 'Mar', avgSteps: 9150, avgCalories: 2480 },
    { month: 'Apr', avgSteps: 8760, avgCalories: 2310 },
    { month: 'May', avgSteps: 9540, avgCalories: 2550 },
    { month: 'Jun', avgSteps: 10120, avgCalories: 2680 },
  ]

  // Calculate total for percentages
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed insights and trends from your health data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Avg. Daily Steps', value: '8,923', change: '+12%', positive: true },
          { title: 'Avg. Sleep', value: '7.4h', change: '+5%', positive: true },
          { title: 'Calorie Intake', value: '2,450', change: '-3%', positive: false },
          { title: 'Consistency Score', value: '89%', change: '+8%', positive: true },
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className={`flex items-center ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className={`w-5 h-5 mr-1 ${!stat.positive ? 'transform rotate-180' : ''}`} />
                  <span className="font-medium">{stat.change}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {stat.title.includes('Calorie') ? 'vs. target 2,500' : 'vs. last month'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Weekly Trends
            </CardTitle>
            <CardDescription>
              Your activity patterns over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="oklch(var(--muted-foreground))"
                    tick={{ fill: 'oklch(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    stroke="oklch(var(--muted-foreground))"
                    tick={{ fill: 'oklch(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Steps"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Calories"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Sleep (hours)"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Activity Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of your logged activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    // data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => {
                      const percentage = ((value / totalValue) * 100).toFixed(1)
                      return [`${percentage}%`, 'Percentage']
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend with percentages */}
            <div className="mt-6 space-y-3">
              {categoryData.map((item, index) => {
                const percentage = ((item.value / totalValue) * 100).toFixed(1)
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{percentage}%</div>
                      <div className="text-xs text-muted-foreground">{item.value} points</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Progress
            </CardTitle>
            <CardDescription>
              Average steps and calories by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="oklch(var(--muted-foreground))"
                    tick={{ fill: 'oklch(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    stroke="oklch(var(--muted-foreground))"
                    tick={{ fill: 'oklch(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="avgSteps" 
                    fill="#3b82f6" 
                    name="Avg. Steps"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="avgCalories" 
                    fill="#10b981" 
                    name="Avg. Calories"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>
            Personalized recommendations based on your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Activity Peak',
                color: 'blue',
                content: "You're most active on Saturdays. Consider scheduling intense workouts then."
              },
              {
                title: 'Sleep Pattern',
                color: 'green',
                content: 'Your sleep quality improves with evening exercise. Keep this routine!'
              },
              {
                title: 'Nutrition Balance',
                color: 'purple',
                content: 'Protein intake is optimal. Consider adding more complex carbs on workout days.'
              }
            ].map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg bg-${insight.color}-500/10 border border-${insight.color}-500/20`}
              >
                <h4 className="font-medium text-foreground mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}