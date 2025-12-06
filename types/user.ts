// types/user.ts
export interface UserProfile {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

// Update Sidebar and Header props
interface SidebarProps {
  user?: UserProfile | null
}

