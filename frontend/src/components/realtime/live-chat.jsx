"use client"

import { useState, useEffect, useRef } from "react"
import { initializeSocket, getSocket } from "../../lib/socket-io"
import { useAuth } from "../auth/use-auth"

export default function LiveChat({ recipientId, recipientName }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const socket = initializeSocket()

    if (user?.id) {
      socket.emit("join-room", { userId: user.id })
    }

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      socket.off("receive-message")
    }
  }, [user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setLoading(true)

    const socket = getSocket()
    const messageData = {
      senderId: user?.id,
      recipientId,
      message: newMessage,
      timestamp: new Date(),
    }

    socket.emit("send-message", messageData)
    setMessages((prev) => [...prev, { ...messageData, isOwn: true }])
    setNewMessage("")
    setLoading(false)
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 flex flex-col h-96">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Chat with {recipientName}</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isOwn || msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isOwn || msg.senderId === user?.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={loading || !newMessage.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}
