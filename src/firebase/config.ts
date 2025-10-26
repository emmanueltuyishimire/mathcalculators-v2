
// This function will be called on the client side, where process.env is available.
export const getFirebaseConfig = () => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        // This error will be caught by the developer in their local environment
        // if the .env.local file is missing or the variable is not set.
        console.error("Firebase config is missing. Please create a .env.local file with your Firebase project credentials.");
        return null;
    }

    return {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
};
