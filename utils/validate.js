import _isEmpty from 'lodash/isEmpty';
import { gfErrors } from 'goldfish';

export const validateEmail = (value) => {
  if (!value) return false;

  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
};

// { name: { value: 'value', require: true/false/undefined } }
export const checkRequireFields = (data = {}) => {
  const errors = {};

  const requireFields = Object.entries(data)
    .reduce((init, [key, value]) => {
      if (!value.require) return init;

      return [...init, [key, value]];
    }, []);

  requireFields.forEach(([key, { value }]) => {
    if (key === 'email') {
      const correctEmail = validateEmail(value);
      if (!correctEmail) {
        errors.email = gfErrors.emailError(value).en;
      }
    } else if (!value) {
      errors[key] = gfErrors.emptyField.en;
    }
  });

  return {
    isValid: _isEmpty(errors),
    errors,
  };
};
