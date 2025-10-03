import React, { useState } from 'react'
import { auth } from '../lib/supabase'

export default function Auth({ onSuccess, onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await auth.signIn(email, password)
        if (error) throw error
      } else {
        if (!username.trim()) {
          throw new Error('사용자명을 입력해주세요')
        }
        const { error } = await auth.signUp(email, password, username)
        if (error) throw error
        alert('회원가입 성공! 이메일을 확인해주세요.')
      }
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4" style={{border: '4px solid #2C3E50'}}>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold hover:opacity-70"
            style={{color: '#2C3E50'}}
          >
            ✕
          </button>
        )}

        <h2 className="text-2xl font-black text-center mb-6" style={{color: '#2C3E50'}}>
          {isLogin ? 'LOGIN' : 'SIGN UP'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '3px solid #2C3E50',
                borderRadius: '12px',
                fontSize: '14px'
              }}
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              border: '3px solid #2C3E50',
              borderRadius: '12px',
              fontSize: '14px'
            }}
            required
          />

          <input
            type="password"
            placeholder="Password (최소 6자)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              border: '3px solid #2C3E50',
              borderRadius: '12px',
              fontSize: '14px'
            }}
            required
            minLength={6}
          />

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl font-bold text-white hover:opacity-90 transition"
            style={{backgroundColor: '#E74C3C', border: '3px solid #2C3E50'}}
          >
            {loading ? '처리중...' : (isLogin ? 'LOGIN' : 'SIGN UP')}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              color: '#2C3E50',
              fontSize: '14px'
            }}
          >
            {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}