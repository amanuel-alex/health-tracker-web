// components/HealthLogForm.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { Calendar, Plus, Save } from 'lucide-react'

export default function HealthLogForm() {
  const [activeTab, setActiveTab] = useState('nutrition')
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    calories_consumed: '',
    protein_g: '',
    carbs_g: '',
    fats_g: '',
    water_intake_ml: '',
    workout_type: '',
    workout_duration_minutes: '',
    calories_burned: '',
    steps: '',
    weight: '',
    sleep_hours: '',
    heart_rate: '',
    blood_pressure: '',
    mood: '',
    energy_level: '5',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const tabs = [
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'fitness', label: 'Fitness', icon: '🏃' },
    { id: 'health', label: 'Health', icon: '❤️' },
    { id: 'notes', label: 'Notes', icon: '📝' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    const { error } = await supabase.from('health_logs').insert({
      user_id: user.id,
      ...formData,
      calories_consumed: parseInt(formData.calories_consumed) || null,
      protein_g: parseFloat(formData.protein_g) || null,
      carbs_g: parseFloat(formData.carbs_g) || null,
      fats_g: parseFloat(formData.fats_g) || null,
      water_intake_ml: parseInt(formData.water_intake_ml) || null,
      workout_duration_minutes: parseInt(formData.workout_duration_minutes) || null,
      calories_burned: parseInt(formData.calories_burned) || null,
      steps: parseInt(formData.steps) || null,
      weight: parseFloat(formData.weight) || null,
      sleep_hours: parseFloat(formData.sleep_hours) || null,
      heart_rate: parseInt(formData.heart_rate) || null,
      energy_level: parseInt(formData.energy_level) || null,
    })

    if (!error) {
      // Show success message
      alert('Health log saved successfully!')
      // Reset form
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        calories_consumed: '',
        protein_g: '',
        carbs_g: '',
        fats_g: '',
        water_intake_ml: '',
        workout_type: '',
        workout_duration_minutes: '',
        calories_burned: '',
        steps: '',
        weight: '',
        sleep_hours: '',
        heart_rate: '',
        blood_pressure: '',
        mood: '',
        energy_level: '5',
        notes: '',
      })
    }

    setSubmitting(false)
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'nutrition':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Calories Consumed
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.calories_consumed}
                  onChange={(e) => setFormData({...formData, calories_consumed: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Water Intake (ml)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.water_intake_ml}
                  onChange={(e) => setFormData({...formData, water_intake_ml: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            {/* Add more nutrition fields */}
          </div>
        )
      // Add other tab contents
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Daily Health Log</h2>
            <p className="text-sm text-muted-foreground mt-1">Track your daily health metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-input hover:bg-accent transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {formData.date}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Log
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </form>
  )
}