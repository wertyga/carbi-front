export default ({
                  marketsPairsStore: { marketsPairs },
  deviceStore: { isMobile },
                }) => ({
  marketsData: marketsPairs,
  isMobile,
});