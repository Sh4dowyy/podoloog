# Supabase Integration Setup Guide

This document explains how to complete the Supabase integration for your Next.js portfolio.

## 📋 Prerequisites

1. A Supabase account ([supabase.com](https://supabase.com))
2. A Supabase project created

## 🔧 Configuration Steps

### 1. Environment Variables

Update your `.env.local` file with your actual Supabase credentials:

```env
# Get these from your Supabase project dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anonymous-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Database Setup

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Create todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create RLS policy - users can only access their own todos
CREATE POLICY "Users can only see their own todos" ON todos
  FOR ALL USING (auth.uid() = user_id);
```

### 3. Authentication Providers

#### Email Authentication (Already enabled by default)

- Go to Authentication > Settings in your Supabase dashboard
- Ensure "Enable email confirmations" is configured as needed

#### Google OAuth (Optional)

1. Go to Authentication > Providers in Supabase dashboard
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URLs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)

### 4. Site URL Configuration

In your Supabase dashboard:

1. Go to Authentication > URL Configuration
2. Set Site URL to your production domain (e.g., `https://yourdomain.com`)
3. Add redirect URLs:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback`

## 🚀 Usage Examples

### Authentication

```tsx
import { useAuth } from "@/components/auth/AuthProvider";

function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Database Operations

```tsx
import { createSupabaseBrowserClient } from "@/lib/supabase";

function DataComponent() {
  const supabase = createSupabaseBrowserClient();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error("Error:", error);
    return data;
  };

  // ... rest of component
}
```

### Server-Side Usage

```tsx
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ServerComponent() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Not authenticated</div>;

  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id);

  return <div>{/* Render todos */}</div>;
}
```

## 📱 Available Routes

- `/login` - Authentication page
- `/demo` - Demo page showcasing Supabase features
- `/auth/callback` - OAuth callback handler

## 🛡️ Security Features

1. **Row Level Security (RLS)** - Users can only access their own data
2. **Middleware Protection** - Authentication state managed across all routes
3. **Server-Side Rendering** - Secure server-side data fetching
4. **Environment Variables** - Sensitive keys kept secure

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid JWT" errors**

   - Check if your environment variables are correct
   - Ensure NEXT_PUBLIC_SUPABASE_URL doesn't have trailing slashes

2. **Authentication redirects not working**

   - Verify your redirect URLs in Supabase dashboard
   - Check middleware configuration

3. **RLS policy blocking queries**

   - Ensure your RLS policies are correctly configured
   - Check that `auth.uid()` matches the user_id in your queries

4. **OAuth not working**
   - Verify OAuth provider configuration
   - Check redirect URLs match exactly

### Testing the Integration

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/demo`
3. Try signing up/in with email
4. Test the todo functionality
5. Try OAuth authentication (if configured)

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Integration Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

## 🎯 Next Steps

After completing the setup:

1. Customize the authentication flow for your needs
2. Create additional database tables for your portfolio data
3. Add real-time subscriptions for live updates
4. Implement file storage for images/documents
5. Add more complex RLS policies as needed

Your Supabase integration is now ready to use! 🎉
