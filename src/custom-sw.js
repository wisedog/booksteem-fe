
/*
 Web push is not available now
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  const title = 'Push Codelab'
  const options = {
    body: 'Yay it works.',
    icon: '/static/img/icons/android-chrome-192x192.png',
    badge: 'images/badge.png'
  }

  event.waitUntil(self.registration.showNotification(title, options))
});

*/
