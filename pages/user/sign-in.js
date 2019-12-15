import { PageLayout } from 'layouts/PageLayout/PageLayout';
import { gfUser } from 'goldfish';
import { UserSignInForm } from 'components/User/UserSignInForm/UserSignInForm';

export default () => {
  return (
    <PageLayout
      className="user-sign-in-page"
      meta={gfUser.signInMeta.en}
      header={gfUser.signinPageHeader.en}
    >
      <UserSignInForm />
    </PageLayout>
  );
};