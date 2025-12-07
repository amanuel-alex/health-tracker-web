
import { supabase } from './supabase'

// Types
export interface HealthLog {
  id?: number
  user_id: string
  date: string
  
  // Nutrition
  calories_consumed?: number
  protein_g?: number
  carbs_g?: number
  fats_g?: number
  water_intake_ml?: number
  
  // Fitness
  workout_type?: string
  workout_duration_minutes?: number
  calories_burned?: number
  steps?: number
  
  // Health metrics
  weight?: number
  sleep_hours?: number
  heart_rate?: number
  blood_pressure?: string
  mood?: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible'
  energy_level?: number
  notes?: string
  updated_at?: string; 
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  username?: string
  age?: number
  weight?: number
  height?: number
  gender?: string
  health_goals?: string[]
  avatar_url?: string
}

// Health Logs CRUD Operations
export const healthLogService = {
  // Create a new health log
  async createLog(logData: Omit<HealthLog, 'id'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const logWithUser = {
        ...logData,
        user_id: user.id
      }

      const { data, error } = await supabase
        .from('health_logs')
        .insert([logWithUser])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating health log:', error)
      return { data: null, error }
    }
  },

  // Get today's log for current user
  async getTodayLog() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const today = new Date().toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('health_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get all logs for current user
  async getUserLogs(limit = 50) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('health_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(limit)

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update a health log
  async updateLog(id: number, updates: Partial<HealthLog>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('health_logs')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Delete a health log
  async deleteLog(id: number) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('health_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      return { error }
    } catch (error) {
      return { error }
    }
  },

  // Get logs statistics
  async getLogStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('health_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      if (error) throw error

      // Calculate statistics
      const stats = {
        totalLogs: data?.length || 0,
        last7Days: data?.filter(log => {
          const logDate = new Date(log.date)
          const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return logDate >= sevenDaysAgo
        }).length || 0,
        avgSteps: data?.reduce((acc, log) => acc + (log.steps || 0), 0) / (data?.length || 1),
        avgSleep: data?.reduce((acc, log) => acc + (log.sleep_hours || 0), 0) / (data?.length || 1),
        avgCalories: data?.reduce((acc, log) => acc + (log.calories_consumed || 0), 0) / (data?.length || 1),
      }

      return { data: stats, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}

// User Profile Operations
export const profileService = {
  // Get user profile
  async getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        return await this.createProfile(user.id, user.email || '')
      }

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Create user profile
  async createProfile(userId: string, email: string) {
    try {
      const profileData = {
        id: userId,
        email,
        username: email.split('@')[0],
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update user profile
  async updateProfile(updates: Partial<UserProfile>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}