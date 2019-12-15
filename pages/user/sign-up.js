import { PageLayout } from 'layouts/PageLayout/PageLayout';
import { UserSignUpForm } from 'components/User/UserSignUpForm/UserSignUpForm';

import { gfUser, gfMainPage } from 'goldfish';

import 'assets/pagesStyles/signupPage.scss';

export default () => {
  return (
    <PageLayout
      className="user-signup-page"
      fluid
      header={gfUser.signupPageHeader.en}
      image={gfMainPage.mainBg.src}
      imageAlt={gfMainPage.mainBg.alt.en}
    >
      <UserSignUpForm />
    </PageLayout>
  );
};
