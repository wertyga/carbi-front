import Link from 'next/link';
import { gfErrors, gfCommon } from 'goldfish';

import './style.scss';

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{gfErrors.notFoundDescription.en}</p>
      <Link href="/">
        <a>{gfCommon.goBack.en}</a>
      </Link>
    </div>
  );
};