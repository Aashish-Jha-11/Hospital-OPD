"use client"

import { useState, useEffect } from "react"

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("App installed")
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 backdrop-blur-xl bg-white/90 border border-white/20 rounded-lg shadow-lg p-4 max-w-sm z-40 animate-slide-in">
      <h3 className="font-bold text-gray-800 mb-2">Install MediHub</h3>
      <p className="text-sm text-gray-600 mb-4">
        Install our app for offline access and quick access from your home screen
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleInstall}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition text-sm"
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
        >
          Later
        </button>
      </div>
    </div>
  )
}
