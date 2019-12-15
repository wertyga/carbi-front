import { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';

import { Form, Button, Message, Input, Checkbox } from 'semantic-ui-react';
import { gfUser, gfCommon } from 'goldfish';
import { createNewUser } from 'redux/actions';
import { useDispatch } from 'react-redux';

import { checkRequireFields } from 'utils';

import './style.scss';

export const UserSignUpForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: {
      value: '',
      require: true,
    },
    email: {
      value: '',
      require: true,
    },
    confirmConditions: {
      value: true,
      require: true,
    },
    errors: {},
    loading: false,
  });

  const handleInputChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: { require: state[name].require, value }, errors: {} })
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { username, email, confirmConditions } = state;
    const { isValid, errors } = checkRequireFields({ username, email, confirmConditions });
    if (!isValid) {
      setState({ ...state, errors });
      return;
    }

    const userObj = { username: username.value, email: email.value };

    try {
      setState({ ...state, loading: true });
      const newUser = await createNewUser(userObj);

      dispatch(newUser);
    } catch (e) {
      setState({ ...state, error: { global: e } });
    } finally {
      setState({ ...state, loading: false });
    }
  };

  const handleConfirmToggle = () => {
    setState({
      ...state,
      confirmConditions: {
        require: state.confirmConditions.require,
        value: !state.confirmConditions.value,
      },
      errors: {},
    });
  }

  const { username, email, confirmConditions, errors, loading } = state;

  return (
    <Form
      className="user-signup-form"
      error={!_isEmpty(errors)}
      onSubmit={handleSubmitForm}
      loading={loading}
    >
      <Message
        error
        content={errors.global}
      />
      <Form.Field>
        <label>{gfUser.usernameLabel.en}</label>
        <Input
          placeholder={gfUser.usernamePlaceholder.en}
          onChange={handleInputChange}
          value={username.value}
          name="username"
          error={!!errors.username}
        />
      </Form.Field>
      <Form.Field>
        <label>{gfUser.emailLabel.en}</label>
        <Input
          placeholder={gfUser.emailPlaceholder.en}
          onChange={handleInputChange}
          value={email.value}
          name="email"
          error={!!errors.email}
        />
      </Form.Field>

      <Form.Field>
        <Checkbox
          label={gfUser.agreeWithConditions.en}
          checked={confirmConditions.value}
          onChange={handleConfirmToggle}
          className={classnames({ 'user-signup-form__confirm-error': errors.confirmConditions })}
        />
      </Form.Field>

      <Button primary>{gfCommon.submit.en}</Button>
    </Form>
  );
};