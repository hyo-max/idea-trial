import React, { useState, useEffect } from 'react'
import { auth } from './lib/supabase'
import LandingPage from './components/LandingPage'
import Auth from './components/Auth'

export default function App() {
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [currentView, setCurrentView] = useState('landing')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await auth.getUser()
    setUser(data.user)
    setLoading(false)
  }

  const handleLogout = async () => {
    await auth.signOut()
    setUser(null)
    setCurrentView('landing')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#FEF5E7'}}>
        <div className="text-2xl font-bold" style={{color: '#2C3E50'}}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage
          onNavigate={setCurrentView}
          onShowAuth={() => setShowAuth(true)}
          user={user}
        />
      )}

      {currentView === 'feed' && (
        <div className="min-h-screen" style={{backgroundColor: '#FEF5E7'}}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-black mb-8 text-center" style={{color: '#2C3E50'}}>
              Feed Page (개발 중)
            </h1>
            <p className="text-center mb-8" style={{color: '#666'}}>
              여기에 메인 피드가 들어갑니다
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentView('landing')}
                className="px-6 py-3 rounded-2xl font-bold text-white hover:opacity-90 transition"
                style={{backgroundColor: '#2C3E50'}}
              >
                랜딩으로
              </button>
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-2xl font-bold text-white hover:opacity-90 transition"
                  style={{backgroundColor: '#E74C3C'}}
                >
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showAuth && !user && (
        <Auth 
          onSuccess={() => {
            setShowAuth(false)
            checkUser()
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  )
}