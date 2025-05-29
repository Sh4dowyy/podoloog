'use client'

import { useState, useEffect, useCallback } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'

interface Todo {
  id: string
  text: string
  completed: boolean
  user_id: string
  created_at: string
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createSupabaseBrowserClient()

  const fetchTodos = useCallback(async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      fetchTodos()
    }
  }, [user, fetchTodos])

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim() || !user) return

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          { text: newTodo.trim(), completed: false, user_id: user.id }
        ])
        .select()
        .single()

      if (error) throw error
      
      setTodos([data, ...todos])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id)

      if (error) throw error

      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Please sign in to view your todos.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Todos</h2>
      
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-4">Loading todos...</div>
      ) : (
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="w-4 h-4 text-blue-600"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-900'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// Note: You'll need to create the todos table in Supabase:
// 
// CREATE TABLE todos (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   text TEXT NOT NULL,
//   completed BOOLEAN DEFAULT FALSE,
//   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );
// 
// -- Enable RLS
// ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
// 
// -- Create policy
// CREATE POLICY "Users can only see their own todos" ON todos
//   FOR ALL USING (auth.uid() = user_id); 