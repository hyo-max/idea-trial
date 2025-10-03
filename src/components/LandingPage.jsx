import React, { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

export default function LandingPage({ onNavigate, onShowAuth, user }) {
  const [newIdea, setNewIdea] = useState('')

  const handleSubmit = () => {
    if (!user) {
      onShowAuth()
    } else {
      if (newIdea.trim()) {
        onNavigate('feed')
      }
    }
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, #5B9BD5, #A8D8EA)'}}>
      {/* Header */}
      <header style={{backgroundColor: '#4A7BA7'}} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">IDEA TRIAL</h1>
          <div className="flex gap-4">
            {user ? (
              <>
                <span className="text-white">👋 {user.email}</span>
                <button 
                  onClick={() => onNavigate('feed')}
                  className="bg-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
                  style={{color: '#4A7BA7'}}
                >
                  Go to Feed
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={onShowAuth}
                  className="text-white hover:opacity-80 transition"
                >
                  Log in
                </button>
                <button 
                  onClick={onShowAuth}
                  className="bg-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
                  style={{color: '#4A7BA7'}}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight" style={{color: '#2C3E50'}}>
          IS THIS IDEA<br/>VIABLE?
        </h2>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              placeholder="Enter your idea"
              className="flex-1 px-6 py-4 rounded-full text-lg focus:outline-none"
              style={{border: '4px solid #2C3E50'}}
            />
            <button 
              onClick={handleSubmit}
              className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition shadow-lg"
              style={{backgroundColor: '#E74C3C'}}
            >
              PRESENT IDEA
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="rounded-3xl p-8 mb-12 relative overflow-hidden" style={{backgroundColor: '#B8E6E8'}}>
          <div className="flex justify-center items-end gap-8">
            {/* Judge */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mb-2 relative mx-auto" style={{backgroundColor: '#F5DEB3'}}>
                <div className="absolute top-8 left-8 w-16 h-16 rounded-full" style={{backgroundColor: '#FFE4B5'}}></div>
                <div className="absolute top-12 left-10 w-3 h-3 rounded-full" style={{backgroundColor: '#2C3E50'}}></div>
                <div className="absolute top-12 left-16 w-3 h-3 rounded-full" style={{backgroundColor: '#2C3E50'}}></div>
                <div className="absolute top-20 left-12 w-8 h-2 rounded-full" style={{backgroundColor: '#2C3E50'}}></div>
              </div>
              <div className="w-32 h-24 rounded-t-3xl mx-auto" style={{backgroundColor: '#34495E'}}></div>
              <div className="text-6xl">⚖️</div>
            </div>

            {/* Defendant */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mb-2 relative mx-auto" style={{backgroundColor: '#F5DEB3'}}>
                <div className="absolute top-8 left-12 w-12 h-12 rounded-t-full" style={{backgroundColor: '#2C3E50'}}></div>
                <div className="absolute top-12 left-10 w-3 h-3 rounded-full" style={{backgroundColor: '#2C3E50'}}></div>
                <div className="absolute top-12 left-16 w-3 h-3 rounded-full" style={{backgroundColor: '#2C3E50'}}></div>
                <div className="absolute top-20 left-12 w-8 h-2 rounded-full" style={{backgroundColor: '#2C3E50'}}></div>
              </div>
              <div className="w-32 h-24 rounded-t-3xl mx-auto relative" style={{backgroundColor: '#34495E'}}>
                <div className="absolute -right-2 top-4 w-16 h-16 rounded-full" style={{backgroundColor: '#F39C12'}}></div>
              </div>
              <div className="bg-white px-6 py-2 rounded-full font-bold mt-2" style={{color: '#2C3E50'}}>
                IS THIS IDEA<br/>VIABLE?
              </div>
            </div>

            {/* Jury */}
            <div className="text-center">
              <div className="flex gap-2 mb-2 justify-center">
                <div className="w-16 h-16 rounded-full" style={{backgroundColor: '#F5DEB3'}}></div>
                <div className="w-16 h-16 rounded-full" style={{backgroundColor: '#F5DEB3'}}></div>
              </div>
              <div className="w-32 h-20 rounded-t-3xl mx-auto" style={{backgroundColor: '#8B4513'}}></div>
            </div>
          </div>
        </div>

        {/* Voting Results Example */}
        <div className="max-w-3xl mx-auto rounded-3xl p-8" style={{backgroundColor: '#F5F5DC', border: '4px solid #2C3E50'}}>
          <h3 className="text-2xl font-bold mb-6" style={{color: '#2C3E50'}}>Voting results</h3>
          <div className="flex gap-0 mb-4 h-20 rounded-2xl overflow-hidden" style={{border: '4px solid #2C3E50'}}>
            <div className="flex items-center justify-start px-6" style={{width: '55%', backgroundColor: '#3EDBF0'}}>
              <div className="flex items-center gap-3">
                <ThumbsUp size={32} style={{color: '#2C3E50'}} />
                <span className="text-3xl font-black" style={{color: '#2C3E50'}}>55% VIABLE</span>
              </div>
            </div>
            <div className="flex items-center justify-end px-6" style={{width: '45%', backgroundColor: '#E74C3C'}}>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-white">45% NOT VIABLE</span>
                <ThumbsDown size={32} className="text-white" />
              </div>
            </div>
          </div>
          <p className="text-sm" style={{color: '#666'}}>Real-time voting from the community</p>
        </div>

        <button 
          onClick={() => onNavigate('feed')}
          className="mt-12 text-white px-12 py-4 rounded-full font-bold text-xl hover:opacity-90 transition shadow-xl"
          style={{backgroundColor: '#2C3E50'}}
        >
          See Live Trials →
        </button>
      </div>
    </div>
  )
}