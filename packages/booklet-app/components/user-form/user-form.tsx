import { ChangeEvent, useRef } from 'react';

import { UserInput } from '@cardo-booklet/booklet-utils';

export interface UserFormProps {
  onConfirm: (input: UserInput) => void;
}

export function UserForm(props: UserFormProps) {
  const { onConfirm } = { ...props };
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    onConfirm({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue=""
          ref={usernameRef}
          required
          minLength={4}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue=""
          ref={passwordRef}
          required
          minLength={4}
        />

        <footer>
          <button id="confirmBtn" type="submit">
            Submit
          </button>
        </footer>
      </form>
    </article>
  );
}

export default UserForm;
