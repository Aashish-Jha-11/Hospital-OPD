"use client"

import { useState, useEffect, useCallback } from "react"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }, [])

  const getToken = useCallback(() => {
    return localStorage.getItem("token")
  }, [])

  return { user, loading, logout, getToken }
}
