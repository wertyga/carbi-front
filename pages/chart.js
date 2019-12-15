import { useEffect, useState } from 'react';
import UCookie from 'universal-cookie';

import { gfUser } from 'goldfish';
import { Loader } from 'components/UI/Loader/Loader';
import { PageLayout } from 'layouts/PageLayout/PageLayout';
import { ChartPageItem } from 'components/Chart/ChartPageItem/ChartPageItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketsWithPairs, saveCharts, getPriceByPairsMarkets, getUserCharts } from 'redux/actions';
// import { getSavedCharts } from 'components/MarketsPairs/MarketsPairsWrapper/helpers';

import { gfCharts } from 'goldfish';

import 'assets/pagesStyles/chartPage.scss';

const storeSelector = ({
                         errorStore: { marketsPairs },
  userStore: { token },
  marketsPairsStore: { prices },
                       }) => ({
  globalError: marketsPairs,
  token,
  prices,
});

const meta = {
  title: gfCharts.pageTitle.en,
};

const ChartPage = ({ marketsData }) => {
  const dispatch = useDispatch();
  const { globalError, token, prices } = useSelector(storeSelector);

  const [loading, setLoading] = useState(false);

  const getInitialData = async () => {
    if (!token) return;
    const charts = await getUserCharts(dispatch, prices, token);
  };

  const getPrices = async (charts) => {
    setLoading(true);
    await getPriceByPairsMarkets(dispatch, charts);

    setLoading(false);
  }

  useEffect(() => {
    // getInitialData();
    // const charts = getSavedCharts();
    // dispatch(saveCharts(charts));
    dispatch(marketsData);
    // getPrices(charts);
  }, []);

  return (
    <PageLayout
      className="chart-page"
      meta={meta}
    >
      {loading && <Loader />}
      {globalError && <span className="chart-page__error">{globalError}</span>}
      <ChartPageItem />
    </PageLayout>
  );
};

ChartPage.getInitialProps = async ({ req: { headers: { cookie } } }) => {
  const token = new UCookie(cookie).get(gfUser.userToken);

  const marketsData = await getMarketsWithPairs(token);

  return { marketsData };
};

export default ChartPage;


