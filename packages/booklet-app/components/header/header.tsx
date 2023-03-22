import { MouseEvent } from 'react';
import { useUser } from '../../lib/user-hooks';
import Router from 'next/router';

export default function Header() {
  const user = useUser({ redirectTo: null, redirectIfFound: false });

  const logOut = async (event: MouseEvent<HTMLElement>) => {
    console.log('logging out');
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log(response);
    await Router.push('/login-page');
  };

  return (
    <header className="container">
      {user && (
        <nav>
          <ul>
            <li>
              <strong>@{user.username}</strong>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#" role="button" onClick={logOut}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
