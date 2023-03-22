import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

const fetcher = (url) =>
  fetch(`http://localhost:3001${url}`, {
    credentials: 'include',
  })
    .then((r) => r.json())
    .then((data) => {
      return { username: data?.username || null };
    });

export function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  const { data: user, error } = useSWR('/api/profile', fetcher);

  useEffect(() => {
    if (!redirectTo) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
  return error ? null : user;
}
