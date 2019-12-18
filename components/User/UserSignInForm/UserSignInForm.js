import { useState } from 'react';
import { gfUser, gfCommon } from 'goldfish';

import { clearUserError, submitUser } from 'redux/actions';

import { Loader } from 'components/UI';
import { Form, Input, Button, Icon, Message } from 'semantic-ui-react';
import { BotLink } from 'components/Common/Telegram';

import { useSelector, useDispatch } from 'react-redux';
import storeSelector from './selectors';

import './style.scss';

export const UserSignInForm = () => {
  const  dispatch = useDispatch();
  const { userStore: { error: userError } } = useSelector(storeSelector);
  const [state, setState] = useState({
    password: '',
    loading: false,
    showPass: false,
  });

  const handleInputChange = ({ target: { name, value } }) => {
    userError && dispatch(clearUserError());
    setState({
      ...state,
      [name]: value,
    });
  };

  const showPassToggle = () => setState({ ...state, showPass: !state.showPass });

  const submit = async () => {
    const { password } = state;

    try {
      await submitUser(dispatch, { password });

      setState({
        password: '',
        loading: false,
      });
    } catch (e) {
      setState({
        ...state,
        loading: false,
      });
    }
  };

  const { password, loading, showPass } = state;
  const disableSubmit = loading || !password;

  return (
    <div className="user-signin-form">

      {loading && <Loader active />}

      <Form onSubmit={submit} error={!!userError}>
        <Message
          error
          content={userError}
        />
        <Form.Field>
          <label>{gfUser.password.en}</label>
          <Input
            type={showPass ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <Icon
            className="user-signin-form__show-pass"
            name={showPass ? 'eye' : 'eye slash'}
            size="large"
            onClick={showPassToggle}
          />
        </Form.Field>

        <Button
          disabled={!!disableSubmit}
        >
          {gfCommon.submit.en}
        </Button>
      </Form>

      <BotLink />
      
      <p dangerouslySetInnerHTML={{ __html: gfUser.descriptionSignIn.en }} className="user-signin-form__description" />
    </div>
  );
};