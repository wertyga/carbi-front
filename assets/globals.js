import _get from 'lodash/get';

global.getServerError = e => _get(e, 'response.data.errors[0]', e.message);