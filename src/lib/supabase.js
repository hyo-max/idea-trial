import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth 관련 함수들
export const auth = {
  signUp: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })
    
    if (!error && data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username,
        points: 0,
        badges: []
      })
    }
    return { data, error }
  },

  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getUser: async () => {
    return await supabase.auth.getUser()
  }
}

// Items 관련 함수들
export const items = {
  create: async (title, description, tag) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const endsAt = new Date()
    endsAt.setDate(endsAt.getDate() + 7)
    
    return await supabase
      .from('items')
      .insert({ 
        user_id: user.id,
        title, 
        description, 
        tag, 
        ends_at: endsAt.toISOString() 
      })
      .select()
      .single()
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        profiles:user_id (username),
        votes (vote_type)
      `)
      .eq('status', 'ongoing')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  getById: async (id) => {
    return await supabase
      .from('items')
      .select(`
        *,
        profiles:user_id (username),
        votes (vote_type, user_id),
        comments (
          *,
          profiles:user_id (username)
        )
      `)
      .eq('id', id)
      .single()
  }
}

// Votes 관련 함수들
export const votes = {
  vote: async (itemId, voteType) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    return await supabase
      .from('votes')
      .upsert({ 
        item_id: itemId, 
        user_id: user.id,
        vote_type: voteType 
      }, {
        onConflict: 'item_id,user_id'
      })
  }
}

// Comments 관련 함수들
export const comments = {
  create: async (itemId, text, isDevil = false) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    return await supabase
      .from('comments')
      .insert({
        item_id: itemId,
        user_id: user.id,
        text,
        is_devil: isDevil
      })
      .select(`
        *,
        profiles:user_id (username)
      `)
      .single()
  },

  getByItem: async (itemId) => {
    return await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (username)
      `)
      .eq('item_id', itemId)
      .order('created_at', { ascending: false })
  }
}