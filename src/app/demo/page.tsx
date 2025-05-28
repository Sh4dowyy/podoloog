import { TodoList } from '@/components/examples/TodoList'
import { UserProfile } from '@/components/auth/UserProfile'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Supabase Integration Demo
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            This page demonstrates authentication and database operations with Supabase
          </p>
          
          <div className="flex justify-center">
            <UserProfile />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <TodoList />
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Integration Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">Authentication</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Email/Password authentication</li>
                  <li>• Google OAuth integration</li>
                  <li>• Protected routes and middleware</li>
                  <li>• User session management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">Database</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Real-time database operations</li>
                  <li>• Row Level Security (RLS)</li>
                  <li>• CRUD operations</li>
                  <li>• User-specific data isolation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">Client & Server</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Client-side Supabase client</li>
                  <li>• Server-side client for SSR</li>
                  <li>• API route handlers</li>
                  <li>• Middleware integration</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">Setup Required</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Configure .env.local with your keys</li>
                  <li>• Create database table (see TodoList.tsx)</li>
                  <li>• Enable authentication providers</li>
                  <li>• Set up RLS policies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 