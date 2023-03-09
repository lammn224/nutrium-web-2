// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBiXOAh4t8b-myxAJiCj57wa_jpBs6l6yk',
  authDomain: 'nutrium-7eb76.firebaseapp.com',
  projectId: 'nutrium-7eb76',
  storageBucket: 'nutrium-7eb76.appspot.com',
  messagingSenderId: '442856764835',
  appId: '1:442856764835:web:70809c091b32ad61199616',
  measurementId: 'G-8QK5LDWLNG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

function sendToGoogleAnalytics({ name, delta, id, rating }) {
  logEvent(analytics, name, {
    event_category: 'Web Vitals',
    name,
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    rating,
  })
}

onCLS(sendToGoogleAnalytics)
onFID(sendToGoogleAnalytics)
onLCP(sendToGoogleAnalytics)
onTTFB(sendToGoogleAnalytics)
onFCP(sendToGoogleAnalytics)
onINP(sendToGoogleAnalytics)
