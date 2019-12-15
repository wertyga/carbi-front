import { gfCommon } from 'goldfish';

const getSavedCharts = () => {
  if (typeof window === 'undefined') return [];
  const key = gfCommon.tradingStorageKey;

  return JSON.parse(window.localStorage.getItem(key)) || [];
}

const saveCharts = (charts) => {
  if (typeof window === 'undefined') return [];
  const key = gfCommon.tradingStorageKey;

  window.localStorage.setItem(key, JSON.stringify(charts));
};

export const saveUserTrading = (data, isUpdate) => {
  const existSessions = getSavedCharts();

  let objToSave;

  if (isUpdate) {
    objToSave = existSessions.map(item => {
      if (item.chartId === data.chartId) return data;

      return item;
    });
  } else {
    objToSave = [
      data,
      ...existSessions,
    ];
  }

  saveCharts(objToSave);
};

export const deleteChart = (chartId) => {
  const charts = getSavedCharts();

  const filteredCharts = charts.filter(item => item.chartId !== chartId);

  saveCharts(filteredCharts);
};