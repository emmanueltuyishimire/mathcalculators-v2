

// This function will be called on the client side, where process.env is available.
export const getFirebaseConfig = () => {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
        // This error will be caught by the developer in their local environment
        // if the .env.local file is missing or the variable is not set.
        throw new Error("NEXT_PUBLIC_FIREBASE_API_KEY is not set in the environment.");
    }

    return {
        "projectId": "studio-5398649656-398ca",
        "appId": "1:558032123487:web:47872311f8d5284d45cdea",
        "apiKey": apiKey,
        "authDomain": "studio-5398649656-398ca.firebaseapp.com",
        "measurementId": "",
        "messagingSenderId": "558032123487"
    };
};
