import Router from 'next/router';

// app imports
import { UserInput } from '@cardo-booklet/booklet-utils';
import UserForm from 'packages/booklet-app/components/user-form/user-form';
import { useUser } from 'packages/booklet-app/lib/user-hooks';
import { fetchBookletApi } from 'packages/booklet-app/lib/booklet-api-utils';

/* eslint-disable-next-line */
export interface SignupPageProps {}

export function SignupPage(props: SignupPageProps) {
  useUser({ redirectTo: '/', redirectIfFound: true });

  const onSignup = async (input: UserInput) => {
    const response = await fetchBookletApi({
      urlPath: '/api/auth/signup',
      body: JSON.stringify(input),
      method: 'POST',
    });

    console.log(await response.text());
    if (response.status === 200) {
      Router.push('/');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <UserForm onConfirm={onSignup}></UserForm>
      <a href="/login-page">Login</a>
    </div>
  );
}

export default SignupPage;
