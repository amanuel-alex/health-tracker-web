// app/dashboard/logs/page.tsx - UPDATED WITH SUPABASE INTEGRATION
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Plus, Trash2, Edit2, Save, X, Activity, Apple, Droplets, Moon, Heart } from 'lucide-react'
import { format } from 'date-fns'
import { healthLogService, HealthLog } from '@/lib/database'

export default function LogsPage() {
  const [logs, setLogs] = useState<HealthLog[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [todayLog, setTodayLog] = useState<HealthLog | null>(null)

  const [newLog, setNewLog] = useState({
    type: 'fitness',
    activity: '',
    duration: '',
    calories: '',
    notes: '',
    workout_type: '',
    workout_duration_minutes: 0,
    calories_burned: 0,
    steps: 0,
    calories_consumed: 0,
    protein_g: 0,
    water_intake_ml: 0,
    sleep_hours: 0,
    weight: 0,
    mood: 'neutral' as const,
    energy_level: 5,
  })

  // Fetch today's log and recent logs
  useEffect(() => {
    fetchTodayLog()
    fetchRecentLogs()
  }, [])

  const fetchTodayLog = async () => {
    const { data } = await healthLogService.getTodayLog()
    if (data) setTodayLog(data)
  }

  const fetchRecentLogs = async () => {
    const { data } = await healthLogService.getUserLogs(10)
    if (data) setLogs(data)
  }

  const handleAddLog = async () => {
    setLoading(true)
    try {
      const today = format(new Date(), 'yyyy-MM-dd')
      
      // Prepare log data based on type
      const logData: Partial<HealthLog> = {
        date: today,
      }

      switch (newLog.type) {
        case 'fitness':
          logData.workout_type = newLog.activity
          logData.workout_duration_minutes = parseInt(newLog.duration) || 0
          logData.calories_burned = parseInt(newLog.calories) || 0
          logData.steps = 0 // You might want to add a steps input
          break
        case 'nutrition':
          logData.calories_consumed = parseInt(newLog.calories) || 0
          logData.protein_g = parseFloat(newLog.duration) || 0
          break
        case 'hydration':
          logData.water_intake_ml = parseInt(newLog.activity) || 0
          break
        case 'sleep':
          logData.sleep_hours = parseFloat(newLog.activity) || 0
          logData.energy_level = newLog.energy_level
          logData.mood = newLog.mood
          break
      }

      logData.notes = newLog.notes

      // Save to Supabase
      const { data, error } = await healthLogService.createLog(logData as HealthLog)

      if (error) {
        console.error('Error saving log:', error)
        alert('Failed to save log. Please try again.')
        return
      }

      if (data) {
        // Update local state
        setLogs([data, ...logs])
        if (data.date === today) {
          setTodayLog(data)
        }
        
        // Reset form
        setNewLog({
          type: 'fitness',
          activity: '',
          duration: '',
          calories: '',
          notes: '',
          workout_type: '',
          workout_duration_minutes: 0,
          calories_burned: 0,
          steps: 0,
          calories_consumed: 0,
          protein_g: 0,
          water_intake_ml: 0,
          sleep_hours: 0,
          weight: 0,
          mood: 'neutral',
          energy_level: 5,
        })

        alert('Log saved successfully!')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLog = async (id: number) => {
    if (!confirm('Are you sure you want to delete this log?')) return

    const { error } = await healthLogService.deleteLog(id)
    
    if (error) {
      console.error('Error deleting log:', error)
      alert('Failed to delete log.')
      return
    }

    // Update local state
    setLogs(logs.filter(log => log.id !== id))
    alert('Log deleted successfully!')
  }

  const handleUpdateLog = async (id: number) => {
    const logToUpdate = logs.find(log => log.id === id)
    if (!logToUpdate) return

    setLoading(true)
    try {
      const { error } = await healthLogService.updateLog(id, {
        ...logToUpdate,
        updated_at: new Date().toISOString()
      })

      if (error) throw error

      setEditingId(null)
      alert('Log updated successfully!')
    } catch (error) {
      console.error('Error updating log:', error)
      alert('Failed to update log.')
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const stats = {
    todayLogs: todayLog ? 1 : 0,
    weeklyLogs: logs.filter(log => {
      const logDate = new Date(log.date)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return logDate >= sevenDaysAgo
    }).length,
    consistency: logs.length > 0 ? Math.min(100, Math.round((logs.length / 14) * 100)) : 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Daily Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track your daily health activities and metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/30 text-accent-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{format(new Date(), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </div>

      {/* Quick Log Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Quick Log Entry
          </CardTitle>
          <CardDescription>
            Add today's health activities quickly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Form fields remain the same as before */}
          {/* ... existing form code ... */}
          
          <Button 
            onClick={handleAddLog} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Saving...' : 'Save Log to Database'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
          <CardDescription>
            Your recent health activity entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No logs yet. Start logging your health data!
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      log.workout_type ? 'bg-blue-500/10 text-blue-500' :
                      log.calories_consumed ? 'bg-green-500/10 text-green-500' :
                      log.water_intake_ml ? 'bg-cyan-500/10 text-cyan-500' :
                      log.sleep_hours ? 'bg-purple-500/10 text-purple-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {log.workout_type ? <Activity className="w-5 h-5" /> :
                       log.calories_consumed ? <Apple className="w-5 h-5" /> :
                       log.water_intake_ml ? <Droplets className="w-5 h-5" /> :
                       log.sleep_hours ? <Moon className="w-5 h-5" /> :
                       <Heart className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {log.workout_type || 'Nutrition' || 'Water' || 'Sleep' || 'Health'}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {format(new Date(log.date), 'MMM d')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {log.workout_type ? `${log.workout_duration_minutes} min • ${log.calories_burned} calories` :
                         log.calories_consumed ? `${log.calories_consumed} calories • ${log.protein_g}g protein` :
                         log.water_intake_ml ? `${log.water_intake_ml}ml water` :
                         log.sleep_hours ? `${log.sleep_hours}h sleep • ${log.mood} mood` :
                         'Health metrics logged'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteLog(log.id!)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.todayLogs}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.todayLogs > 0 ? 'Great job!' : 'Log your first entry!'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Weekly Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.weeklyLogs}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.consistency}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Daily logging rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}