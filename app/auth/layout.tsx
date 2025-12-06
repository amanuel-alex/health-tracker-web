// app/auth/layout.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HealthTrack - Authentication',
  description: 'Sign in or create an account to start your health journey',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthTrack</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} HealthTrack. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-700">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}