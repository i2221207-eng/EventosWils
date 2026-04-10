'use client'

import { jwtDecode } from 'jwt-decode'

type TokenPayload = {
  id: number
  role: 'admin' | 'client'
  exp: number
}

/* =========================
   SAFE STORAGE ACCESS
========================= */

const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

/* =========================
   AUTH HELPERS
========================= */

export const saveAuth = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
}

export const isAuthenticated = () => {
  return !!getToken()
}

/* =========================
   USER & ROLE
========================= */

export const getUser = (): TokenPayload | null => {
  const token = getToken()
  if (!token) return null

  try {
    return jwtDecode<TokenPayload>(token)
  } catch {
    logout()
    return null
  }
}

export const isAdmin = () => {
  const user = getUser()
  return user?.role === 'admin'
}

export const getAuthUser = () => {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch {
    return null
  }
}
