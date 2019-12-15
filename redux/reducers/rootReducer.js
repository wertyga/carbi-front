import { combineReducers } from 'redux';

import { userStore } from './userStore/userStore';
import { menuStore } from './menuStore/menuStore';
import { chartsStore } from './chartsStore/chartsStore';
import { marketsPairsStore } from './marketsPairsStore/marketsPairsStore';
import { deviceStore } from './deviceStore/deviceStore';
import { cookiesStore } from './cookiesStore/cookiesStore';
import { errorStore } from './errorStore/errorStore';

export const rootReducer = combineReducers({
  userStore,
  menuStore,
  chartsStore,
  marketsPairsStore,
  deviceStore,
  cookiesStore,
  errorStore,
});