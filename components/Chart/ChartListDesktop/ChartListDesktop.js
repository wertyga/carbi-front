import { useState, useEffect } from 'react';

import { Menu } from 'semantic-ui-react';

import { useSelector } from 'react-redux';
import storeSelector from './selectors';

import { ChartItself } from '../ChartItself/ChartItself';

import './style.scss';

export const ChartListDesktop = ({ handleDelete, handleEdit, clearMenuData }) => {
  const { chartsStore } = useSelector(storeSelector);

  const [chartChosen, setChart] = useState('');

  useEffect(() => {
    setChart((chartsStore[0] || {}).chartId);
  }, [chartsStore.length]);


  const handleChartChange = chartId => () => {
    clearMenuData();
    setChart(chartId);
  };

  const chosenChartData = () => {
    return chartsStore.find(({ chartId }) => chartId === chartChosen);
  };

  return (
    <div className="charts-list-desktop">

      <Menu tabular attached="top" inverted>
        {chartsStore.map(item => (
          <Menu.Item
            key={item.chartId}
            active={chartChosen === item.chartId}
            onClick={handleChartChange(item.chartId)}
            name={item.pair}
          >
          </Menu.Item>
        ))}
      </Menu>

      {!!chartsStore.length &&
        <ChartItself
          handleDelete={handleDelete(chartChosen)}
          handleEdit={handleEdit(chartChosen)}
          {...chosenChartData()}
        />
      }

    </div>
  );
};