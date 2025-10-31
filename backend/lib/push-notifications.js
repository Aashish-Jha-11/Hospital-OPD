// Web Push Notifications utility

const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY

export const requestNotificationPermission = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Workers not supported")
    return false
  }

  if (!("PushManager" in window)) {
    console.log("Push Notifications not supported")
    return false
  }

  try {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  } catch (error) {
    console.error("Error requesting notification permission:", error)
    return false
  }
}

export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Workers not supported")
    return null
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js", {
      scope: "/",
    })
    console.log("Service Worker registered:", registration)
    return registration
  } catch (error) {
    console.error("Service Worker registration failed:", error)
    return null
  }
}

export const subscribeToPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready

    if (!registration.pushManager) {
      console.log("Push Manager not available")
      return null
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })

    return subscription
  } catch (error) {
    console.error("Error subscribing to push notifications:", error)
    return null
  }
}

export const unsubscribeFromPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      await subscription.unsubscribe()
      return true
    }
  } catch (error) {
    console.error("Error unsubscribing from push notifications:", error)
    return false
  }
}

export const sendTestNotification = async (title, options = {}) => {
  try {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(title, {
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge-72x72.png",
      ...options,
    })
  } catch (error) {
    console.error("Error sending notification:", error)
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}
