// placeholder - do NOT commit live keys here.
// Once ready, replace with:
// import { createClient } from '@supabase/supabase-js'
// export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const auth = {
  currentUser: null,
  async signIn({ email, password }) {
    // simulate network latency
    await new Promise(r => setTimeout(r, 500))
    // naive "auth" for prototype
    this.currentUser = { id: 'user-1', email }
    return { data: this.currentUser, error: null }
  },
  async signOut() {
    await new Promise(r => setTimeout(r, 200))
    this.currentUser = null
    return { error: null }
  },
  user() {
    return this.currentUser
  }
}
