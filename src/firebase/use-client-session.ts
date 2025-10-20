"use client";

import { useState, useEffect } from 'react';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';

interface UserAuthState {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * A client-side hook to manage the Firebase user session.
 * It listens to authentication state changes and provides the current user.
 * This hook is designed to be used within a client-side provider.
 */
export const useClientSession = (auth: Auth): UserAuthState => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: auth.currentUser, // Initialize with the current user if available
    isUserLoading: true, // Start in loading state
    userError: null,
  });

  useEffect(() => {
    // Set up the listener for auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // When auth state is resolved, update the state
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        // Handle any errors from the auth listener
        console.error("useClientSession: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [auth]); // Re-subscribe if the auth instance changes

  return userAuthState;
};
