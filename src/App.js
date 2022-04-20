import React, { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import { FeedbackProvider } from './context/FeedbackContext'
import './App.css'
import './index.css'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import Product from './components/Product'

import AuthService from './services/auth.service'
import EventBus from './common/EventBus'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    }

    EventBus.on('logout', () => {
      logOut()
    })

    return () => {
      EventBus.remove('logout')
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setCurrentUser(undefined)
  }

  return (
    <FeedbackProvider>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            Feedback System
          </Link>
          <div className='navbar-nav mr-auto'>
            {currentUser && (
              <li className='nav-item'>
                <Link to={'/product'} className='nav-link'>
                  Product
                </Link>
              </li>
            )}
            {currentUser && (
              <li className='nav-item'>
                <Link to={'/review/0'} className='nav-link'>
                  Review
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className='container'>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product' element={<Product />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Profile' element={<Profile />} />
            <Route
              path='/review/:id'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </FeedbackProvider>
  )
}

export default App
