import Link from 'next/link';

import { gfMenu } from 'goldfish';

import './style.scss';

export const MenuUserSignup = () => {
  return (
    <div className="menu-user-signup">

      <Link href="/user/sign-in">
        <a>{gfMenu.signin.en}</a>
      </Link>
      <Link href="/user/sign-up">
        <a>{gfMenu.signup.en}</a>
      </Link>

    </div>
  );
};