export default ({
                  chartsStore,
  marketsPairsStore: { prices },
  deviceStore: { isMobile },
  userStore: { token },
                }) => ({
  chartsStore,
  prices,
  isMobile,
  token,
});
