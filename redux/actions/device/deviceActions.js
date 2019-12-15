import MobileDetect from 'mobile-detect';
import { deviceConstants } from '../../constants';

const { SET_DEVICE } = deviceConstants;

export const getDevice = (headers) => {
  const md = new MobileDetect(headers['user-agent']);
  return {
    type: SET_DEVICE,
    data: {
      isMobile: md.mobile(),
    },
  };
};