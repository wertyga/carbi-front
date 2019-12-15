import { chartsConstants } from '../../constants';

const { ADD_CHART, SAVE_CHARTS, DELETE_CHART, UPDATE_CHART } = chartsConstants;

export const chartsStore = (state = [], { type, data }) => {
  switch(type) {
    case ADD_CHART:
      return [data, ...state];

    case UPDATE_CHART:
      return state.map(item => {
        if (item.chartId === data.chartId) return data;

        return item;
      });

    case SAVE_CHARTS:
      return data;

    case DELETE_CHART:
      return state.filter(({ chartId }) => chartId !== data.chartId);

    default:
      return state;
  }
}