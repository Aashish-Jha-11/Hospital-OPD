"use client"

// Custom hook for Socket.io
import { useEffect, useRef } from "react"
import { initializeSocket } from "../../lib/socket-io"

export function useSocket(events) {
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = initializeSocket()

    // Register event listeners
    Object.keys(events).forEach((event) => {
      socketRef.current.on(event, events[event])
    })

    return () => {
      // Cleanup
      Object.keys(events).forEach((event) => {
        socketRef.current?.off(event)
      })
    }
  }, [events])

  return socketRef.current
}
