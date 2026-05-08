import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Setup initial user document if it doesn't exist
    const user = result.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || 'Creator',
        photoURL: user.photoURL || '',
        tier: 'free',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Initialize integration status
      await setDoc(doc(db, 'users', user.uid, 'integrations', 'status'), {
        twitchConnected: false,
        youtubeConnected: false,
        instagramConnected: false,
        updatedAt: new Date().toISOString()
      });

      // Insert some mock data for streams so dashboard isn't empty
      const streamRefs = [
        { title: "React 19 Deep Dive + Q&A", platform: "YouTube", peakViewers: 2100, views: 14200, avgRetention: 42, chatEngaged: 145 },
        { title: "Building a SaaS from scratch", platform: "Twitch", peakViewers: 850, views: 8400, avgRetention: 55, chatEngaged: 180 }
      ];

      for (let i = 0; i < streamRefs.length; i++) {
        const stream = streamRefs[i];
        const streamRef = doc(db, 'users', user.uid, 'streams', `stream_${i}`);
        await setDoc(streamRef, {
          userId: user.uid,
          ...stream,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }
    return user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}

export async function logout() {
  return signOut(auth);
}

// Test connection on startup
async function testConnection() {
  if (typeof window !== "undefined") {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    }
  }
}
testConnection();
