import { useEffect, useState } from 'react';

import { Segment } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

import { ChartItseltButtons } from '../ChartItseltButtons/ChartItseltButtons';

import { useSelector } from 'react-redux';
import storeSelector from './selectors';

import { getMarketsPrices, collectChartData } from './helpers';

import './style.scss';

export const ChartItself = ({ markets = [], pair, handleDelete, handleEdit }) => {
  const [chartWidth, setChartWidth] = useState(0);

  const { prices, isMobile } = useSelector(storeSelector);

  useEffect(() => {
    const width = !isMobile ? window.innerWidth * 0.5 : '100%';
    setChartWidth(width)
  }, []);

  const { chart, options } = collectChartData(markets, pair, prices);
  const chartDescription = getMarketsPrices(markets, pair, prices);

  return (
    <div className="chart-itself">
      {chart &&
        <Chart
          chartType="ColumnChart"
          data={chart}
          options={options}
          width={chartWidth}
          height={!isMobile && 300}
        />
      }
      <Segment.Group className="chart-itself__description">
        {chartDescription.map(({ market, price, color }) => (
          <Segment
            className="chart-itself__description__item"
            key={market}
            // color={color}
            inverted
          >
            <span className="chart-itself__description__name">{`${market}:`}</span>
            <span className="chart-itself__description__value">{price}</span>
          </Segment>
        ))}
      </Segment.Group>

      <ChartItseltButtons
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

    </div>
  );
};