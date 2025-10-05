import React, { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown, MessageSquare, Eye, Clock, TrendingUp, Flame, User, X } from 'lucide-react'
import TrialImage from './assets/Gemini_Generated_Image_ecmzkoecmzkoecmz.png'; 

const mockAuth = {
  currentUser: null,
  signUp: async (email, password, username) => {
    const user = { id: Date.now(), email, username }
    mockAuth.currentUser = user
    return { data: { user }, error: null }
  },
  signIn: async (email, password) => {
    const user = { id: Date.now(), email, username: email.split('@')[0] }
    mockAuth.currentUser = user
    return { data: { user }, error: null }
  },
  signOut: async () => {
    mockAuth.currentUser = null
    return { error: null }
  },
  getUser: async () => {
    return { data: { user: mockAuth.currentUser } }
  }
}

export default function IdeaTrial() {
  const [currentView, setCurrentView] = useState('landing')
  const [selectedItem, setSelectedItem] = useState(null)
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [userVotes, setUserVotes] = useState({})
  const [comments, setComments] = useState({})
  const [newComment, setNewComment] = useState('')
  const [newIdea, setNewIdea] = useState('')
  const [feedTab, setFeedTab] = useState('live')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await mockAuth.getUser()
    setUser(data.user)
  }

  const handleLogout = async () => {
    await mockAuth.signOut()
    setUser(null)
    setCurrentView('landing')
  }

  const trials = [
    {
      id: 1,
      title: 'AI 기반 식단 관리 앱',
      description: '30대 직장인을 위한 맞춤형 식단 추천 서비스',
      daysLeft: 2,
      viable: 38,
      notViable: 62,
      totalVotes: 127,
      commentCount: 23,
      views: 451,
      needsDevil: 'viable',
      tag: '헬스케어',
      status: 'ongoing'
    },
    {
      id: 2,
      title: '반려동물 산책 메이트 매칭',
      description: '같은 동네에서 반려동물 산책 메이트를 찾아주는 서비스',
      daysLeft: 5,
      viable: 76,
      notViable: 24,
      totalVotes: 89,
      commentCount: 15,
      views: 289,
      needsDevil: 'notViable',
      tag: '라이프스타일',
      status: 'ongoing'
    },
    {
      id: 3,
      title: '프리랜서 세무 자동화 플랫폼',
      description: '1인 사업자와 프리랜서를 위한 세무 관리 서비스',
      daysLeft: 4,
      viable: 82,
      notViable: 18,
      totalVotes: 156,
      commentCount: 31,
      views: 612,
      needsDevil: 'notViable',
      tag: '비즈니스',
      status: 'ongoing'
    },
    {
      id: 101,
      title: '구독 관리 통합 앱',
      description: '모든 구독 서비스를 한 곳에서 관리',
      viable: 88,
      notViable: 12,
      totalVotes: 234,
      verdict: 'VIABLE',
      tag: '핀테크',
      status: 'completed'
    },
    {
      id: 102,
      title: '무인 세탁소 프랜차이즈',
      description: '24시간 무인 세탁 서비스',
      viable: 67,
      notViable: 33,
      totalVotes: 198,
      verdict: 'VIABLE',
      tag: '비즈니스',
      status: 'completed'
    }
  ]

  const rankings = {
    worst: [
      { id: 201, title: '블록체인 기반 명함 관리', notViable: 94, votes: 203 },
      { id: 202, title: 'AI 타로점 구독 서비스', notViable: 88, votes: 167 },
      { id: 203, title: 'NFT 이력서 플랫폼', notViable: 85, votes: 142 },
      { id: 204, title: '메타버스 명상 센터', notViable: 81, votes: 129 },
      { id: 205, title: '크립토 결혼 중개', notViable: 78, votes: 115 }
    ],
    hot: [
      { id: 301, title: '구독 관리 통합 앱', comments: 67, votes: 234 },
      { id: 302, title: '무인 세탁소 프랜차이즈', comments: 52, votes: 198 },
      { id: 303, title: 'AI 헬스 코칭', comments: 48, votes: 187 },
      { id: 304, title: '반려동물 보험 비교', comments: 43, votes: 176 },
      { id: 305, title: '프리랜서 세무 도구', comments: 39, votes: 156 }
    ]
  }

  const handleVote = (itemId, voteType) => {
    if (!user) {
      setShowAuth(true)
      return
    }
    setUserVotes(prev => ({...prev, [itemId]: voteType}))
  }

  const handleSubmitIdea = () => {
    if (!user) {
      setShowAuth(true)
      return
    }
    if (newIdea.trim()) {
      alert('아이디어가 제출되었습니다!')
      setNewIdea('')
      setCurrentView('feed')
    }
  }

  const handleComment = (itemId) => {
    if (!user) {
      setShowAuth(true)
      return
    }
    if (newComment.trim()) {
      setComments(prev => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), {
          id: Date.now(),
          user: user.username || user.email.split('@')[0],
          text: newComment,
          likes: 0,
          time: '방금 전'
        }]
      }))
      setNewComment('')
    }
  }

  const AuthModal = ({ onSuccess, onClose }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = async () => {
      if (isLogin) {
        await mockAuth.signIn(email, password)
      } else {
        await mockAuth.signUp(email, password, username)
      }
      await checkUser()
      onSuccess()
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 relative" style={{border: '4px solid #2C3E50'}}>
          <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-70" style={{color: '#2C3E50'}}>
            <X size={24} />
          </button>
          <h2 className="text-2xl font-black text-center mb-6" style={{color: '#2C3E50'}}>
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </h2>
          <div>
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mb-3 rounded-xl"
                style={{border: '3px solid #2C3E50'}}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-3 rounded-xl"
              style={{border: '3px solid #2C3E50'}}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-5 rounded-xl"
              style={{border: '3px solid #2C3E50'}}
            />
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-2xl font-bold text-white hover:opacity-90 transition mb-3"
              style={{backgroundColor: '#E74C3C', border: '3px solid #2C3E50'}}
            >
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </button>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full p-3 text-sm"
              style={{color: '#2C3E50'}}
            >
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, #5B9BD5, #A8D8EA)'}}>
        <header style={{backgroundColor: '#4A7BA7'}} className="text-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">IDEA TRIAL</h1>
            <div className="flex gap-4">
              {user ? (
                <>
                  <span className="flex items-center gap-2"><User size={20} /> {user.username || user.email.split('@')[0]}</span>
                  <button onClick={() => setCurrentView('feed')} className="bg-white px-6 py-2 rounded-full font-semibold" style={{color: '#4A7BA7'}}>Feed</button>
                  <button onClick={handleLogout} className="hover:opacity-80">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowAuth(true)} className="hover:opacity-80">Log in</button>
                  <button onClick={() => setShowAuth(true)} className="bg-white px-6 py-2 rounded-full font-semibold" style={{color: '#4A7BA7'}}>Sign up</button>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-7xl font-black mb-12" style={{color: '#2C3E50'}}>IS THIS IDEA<br/>VIABLE?</h2>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-3">
              <input
                type="text"
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="Enter your idea"
                className="flex-1 px-6 py-4 rounded-full text-lg"
                style={{border: '4px solid #2C3E50'}}
              />
              <button onClick={handleSubmitIdea} className="text-white px-8 py-4 rounded-full font-bold text-lg" style={{backgroundColor: '#E74C3C'}}>
                PRESENT IDEA
              </button>
            </div>
          </div>
          {/* <div className="rounded-3xl p-8 mb-12" style={{backgroundColor: '#B8E6E8'}}>
            <img src={TrialImage} alt="Trial" className="w-full max-w-3xl mx-auto" />
          </div> */}
          <div className="max-w-3xl mx-auto rounded-3xl p-8" style={{backgroundColor: '#F5F5DC', border: '4px solid #2C3E50'}}>
            <h3 className="text-2xl font-bold mb-6" style={{color: '#2C3E50'}}>Voting results</h3>
            <div className="flex h-20 rounded-2xl overflow-hidden mb-4" style={{border: '4px solid #2C3E50'}}>
              <div className="flex items-center justify-start px-6" style={{width: '55%', backgroundColor: '#3EDBF0'}}>
                <ThumbsUp size={32} style={{color: '#2C3E50'}} />
                <span className="text-3xl font-black ml-3" style={{color: '#2C3E50'}}>55% VIABLE</span>
              </div>
              <div className="flex items-center justify-end px-6" style={{width: '45%', backgroundColor: '#E74C3C'}}>
                <span className="text-3xl font-black text-white mr-3">45% NOT VIABLE</span>
                <ThumbsDown size={32} className="text-white" />
              </div>
            </div>
          </div>
          <button onClick={() => setCurrentView('feed')} className="mt-12 text-white px-12 py-4 rounded-full font-bold text-xl" style={{backgroundColor: '#2C3E50'}}>
            See Live Trials
          </button>
        </div>
        {showAuth && <AuthModal onSuccess={() => setShowAuth(false)} onClose={() => setShowAuth(false)} />}
      </div>
    )
  }

  if (currentView === 'feed' && !selectedItem) {
    const displayItems = feedTab === 'live' ? trials.filter(t => t.status === 'ongoing') : feedTab === 'completed' ? trials.filter(t => t.status === 'completed') : []

    return (
      <div className="min-h-screen" style={{backgroundColor: '#FEF5E7'}}>
        <header className="text-white shadow-lg" style={{backgroundColor: '#2C3E50'}}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="text-3xl">⚖️</div>
              <h1 className="text-2xl font-bold">IDEA TRIAL</h1>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setFeedTab('live')} className="font-semibold" style={{color: feedTab === 'live' ? '#3EDBF0' : '#fff'}}>Live Trials</button>
              <button onClick={() => setFeedTab('ranking')} className="font-semibold" style={{color: feedTab === 'ranking' ? '#3EDBF0' : '#fff'}}>Rankings</button>
              <button onClick={() => setFeedTab('completed')} className="font-semibold" style={{color: feedTab === 'completed' ? '#3EDBF0' : '#fff'}}>Completed</button>
              {user && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#3EDBF0'}}>
                    <User size={20} style={{color: '#2C3E50'}} />
                  </div>
                  <button onClick={handleLogout} className="text-sm">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="max-w-6xl mx-auto px-6 py-12">
          {feedTab === 'ranking' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-lg" style={{border: '4px solid #E74C3C'}}>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-2" style={{color: '#E74C3C'}}>
                  <Flame size={28} />WORST IDEAS
                </h2>
                {rankings.worst.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-3 p-4 mb-3 rounded-2xl" style={{backgroundColor: '#FFE4E1', border: '2px solid #E74C3C'}}>
                    <span className="text-3xl font-black w-10" style={{color: '#E74C3C'}}>{idx + 1}</span>
                    <div className="flex-1">
                      <p className="font-bold" style={{color: '#2C3E50'}}>{item.title}</p>
                      <p className="text-sm font-semibold" style={{color: '#E74C3C'}}>{item.notViable}% NOT VIABLE</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-lg" style={{border: '4px solid #F39C12'}}>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-2" style={{color: '#F39C12'}}>
                  <TrendingUp size={28} />HOTTEST DEBATES
                </h2>
                {rankings.hot.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-3 p-4 mb-3 rounded-2xl" style={{backgroundColor: '#FFF4E6', border: '2px solid #F39C12'}}>
                    <span className="text-3xl font-black w-10" style={{color: '#F39C12'}}>{idx + 1}</span>
                    <div className="flex-1">
                      <p className="font-bold" style={{color: '#2C3E50'}}>{item.title}</p>
                      <p className="text-sm font-semibold" style={{color: '#F39C12'}}>{item.comments} comments</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {feedTab !== 'ranking' && displayItems.map(item => (
            <div key={item.id} onClick={() => setSelectedItem(item)} className="bg-white rounded-3xl p-8 mb-6 shadow-lg cursor-pointer" style={{border: '4px solid #2C3E50'}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-4 py-1 rounded-full text-sm font-bold" style={{backgroundColor: '#3EDBF0', color: '#2C3E50', border: '2px solid #2C3E50'}}>{item.tag}</span>
                {item.status === 'ongoing' && (
                  <span className="text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1" style={{backgroundColor: '#F39C12', border: '2px solid #2C3E50'}}>
                    <Clock size={14} /> D-{item.daysLeft}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black mb-2" style={{color: '#2C3E50'}}>{item.title}</h3>
              <p className="mb-4" style={{color: '#666'}}>{item.description}</p>
              {item.needsDevil && (
                <div className="text-white p-4 rounded-2xl mb-4" style={{backgroundColor: '#FF6B6B', border: '2px solid #2C3E50'}}>
                  <p className="font-bold">DEVIL'S ADVOCATE NEEDED!</p>
                </div>
              )}
              <div className="flex h-16 rounded-2xl overflow-hidden mb-4" style={{border: '4px solid #2C3E50'}}>
                <div className="flex items-center justify-center" style={{width: `${item.viable}%`, backgroundColor: '#3EDBF0'}}>
                  <span className="text-lg font-black" style={{color: '#2C3E50'}}>{item.viable}%</span>
                </div>
                <div className="flex items-center justify-center" style={{width: `${item.notViable}%`, backgroundColor: '#E74C3C'}}>
                  <span className="text-lg font-black text-white">{item.notViable}%</span>
                </div>
              </div>
              <div className="flex gap-6 text-sm" style={{color: '#666'}}>
                {item.commentCount !== undefined && <span className="flex items-center gap-1"><MessageSquare size={16} /> {item.commentCount}</span>}
                {item.views && <span className="flex items-center gap-1"><Eye size={16} /> {item.views}</span>}
                <span>{item.totalVotes} votes</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setCurrentView('landing')} className="fixed bottom-8 right-8 text-white px-8 py-4 rounded-full font-bold shadow-2xl" style={{backgroundColor: '#E74C3C', border: '4px solid #2C3E50'}}>
          + SUBMIT IDEA
        </button>
        {showAuth && <AuthModal onSuccess={() => setShowAuth(false)} onClose={() => setShowAuth(false)} />}
      </div>
    )
  }

  if (selectedItem) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#FEF5E7'}}>
        <header className="text-white shadow-lg" style={{backgroundColor: '#2C3E50'}}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => setSelectedItem(null)} className="text-xl font-semibold" style={{color: '#3EDBF0'}}>← Back</button>
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚖️</div>
              <h1 className="text-2xl font-bold">IDEA TRIAL</h1>
            </div>
            <div className="w-20"></div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-8" style={{border: '4px solid #2C3E50'}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1 rounded-full text-sm font-bold" style={{backgroundColor: '#3EDBF0', color: '#2C3E50', border: '2px solid #2C3E50'}}>{selectedItem.tag}</span>
              {selectedItem.daysLeft && (
                <span className="text-white px-4 py-1 rounded-full text-sm font-bold" style={{backgroundColor: '#F39C12', border: '2px solid #2C3E50'}}>D-{selectedItem.daysLeft}</span>
              )}
            </div>
            <h1 className="text-4xl font-black mb-4" style={{color: '#2C3E50'}}>{selectedItem.title}</h1>
            <p className="text-lg mb-8" style={{color: '#666'}}>{selectedItem.description}</p>
            <div className="rounded-2xl p-6 mb-6" style={{backgroundColor: '#F5F5DC', border: '4px solid #2C3E50'}}>
              <h3 className="text-xl font-black mb-4" style={{color: '#2C3E50'}}>CURRENT VERDICT</h3>
              <div className="flex h-20 rounded-2xl overflow-hidden mb-4" style={{border: '4px solid #2C3E50'}}>
                <div className="flex items-center justify-center" style={{width: `${selectedItem.viable}%`, backgroundColor: '#3EDBF0'}}>
                  <ThumbsUp size={24} style={{color: '#2C3E50'}} />
                  <span className="text-2xl font-black ml-2" style={{color: '#2C3E50'}}>{selectedItem.viable}%</span>
                </div>
                <div className="flex items-center justify-center" style={{width: `${selectedItem.notViable}%`, backgroundColor: '#E74C3C'}}>
                  <span className="text-2xl font-black text-white mr-2">{selectedItem.notViable}%</span>
                  <ThumbsDown size={24} className="text-white" />
                </div>
              </div>
            </div>
            {selectedItem.needsDevil && (
              <div className="text-white p-6 rounded-2xl mb-6" style={{backgroundColor: '#FF6B6B', border: '4px solid #2C3E50'}}>
                <h3 className="font-black text-xl mb-2">DEVIL'S ADVOCATE MODE</h3>
                <p className="text-sm">Write a {selectedItem.needsDevil === 'viable' ? 'VIABLE' : 'NOT VIABLE'} argument for 2X points!</p>
              </div>
            )}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => handleVote(selectedItem.id, 'viable')}
                className="flex-1 py-4 rounded-2xl font-black text-xl"
                style={{
                  backgroundColor: userVotes[selectedItem.id] === 'viable' ? '#3EDBF0' : 'white',
                  color: '#2C3E50',
                  border: '4px solid #2C3E50'
                }}
              >
                <ThumbsUp className="inline mr-2" size={24} />VIABLE
              </button>
              <button
                onClick={() => handleVote(selectedItem.id, 'notViable')}
                className="flex-1 py-4 rounded-2xl font-black text-xl"
                style={{
                  backgroundColor: userVotes[selectedItem.id] === 'notViable' ? '#E74C3C' : 'white',
                  color: userVotes[selectedItem.id] === 'notViable' ? 'white' : '#2C3E50',
                  border: '4px solid #2C3E50'
                }}
              >
                <ThumbsDown className="inline mr-2" size={24} />NOT VIABLE
              </button>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl" style={{border: '4px solid #2C3E50'}}>
            <h2 className="text-2xl font-black mb-6" style={{color: '#2C3E50'}}>ARGUMENTS ({comments[selectedItem.id]?.length || 0})</h2>
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Present your argument..."
                className="w-full rounded-2xl p-4 resize-none"
                style={{border: '4px solid #2C3E50'}}
                rows="4"
              />
              <button
                onClick={() => handleComment(selectedItem.id)}
                className="mt-3 text-white px-6 py-3 rounded-2xl font-bold"
                style={{backgroundColor: '#E74C3C', border: '4px solid #2C3E50'}}
              >
                Submit
              </button>
            </div>
            <div className="space-y-4">
              {comments[selectedItem.id]?.map((comment) => (
                <div key={comment.id} className="rounded-2xl p-4" style={{backgroundColor: '#F5F5DC', border: '2px solid #2C3E50'}}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold" style={{color: '#2C3E50'}}>{comment.user}</span>
                    <span className="text-xs" style={{color: '#666'}}>{comment.time}</span>
                  </div>
                  <p style={{color: '#666'}}>{comment.text}</p>
                </div>
              ))}
              {(!comments[selectedItem.id] || comments[selectedItem.id].length === 0) && (
                <p className="text-center py-8" style={{color: '#999'}}>No arguments yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}