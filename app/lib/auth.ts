import { createAuthClient } from 'better-auth/react';

export const auth = createAuthClient({
  baseURL: 'https://api.akumanoko.com',
});

export function githubSignIn() {
  return auth.signIn.social({
    provider: 'github',
    callbackURL: location.href,
  });
}

export function googleSignIn() {
  return auth.signIn.social({
    provider: 'google',
    callbackURL: '/',
  });
}
