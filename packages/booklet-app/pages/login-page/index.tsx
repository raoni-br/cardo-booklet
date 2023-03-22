import Router from 'next/router';

import { UserInput } from '@cardo-booklet/booklet-utils';
import UserForm from 'packages/booklet-app/components/user-form/user-form';
import { useUser } from 'packages/booklet-app/lib/user-hooks';
// import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  useUser({ redirectTo: '/', redirectIfFound: true });

  const onLogin = async (input: UserInput) => {
    console.log('attempting logging', input);
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log(await response.text());
    if (response.status === 200) {
      Router.push('/');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <UserForm onConfirm={onLogin}></UserForm>
      <a href="/signup-page">Sign up</a>
    </div>
  );
}

export default LoginPage;
