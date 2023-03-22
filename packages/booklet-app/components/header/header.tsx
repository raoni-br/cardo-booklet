import { MouseEvent } from 'react';
import Router from 'next/router';

// app imports
import { useUser } from '../../lib/user-hooks';
import { fetchBookletApi } from 'packages/booklet-app/lib/booklet-api-utils';

export default function Header() {
  const user = useUser({ redirectTo: null, redirectIfFound: false });

  const logOut = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    await fetchBookletApi({
      urlPath: '/api/auth/logout',
      method: 'POST',
    });
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
