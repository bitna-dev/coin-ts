const BASE_URL = "https://api.coinpaprika.com/v1";
// all coins
export const getCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

// single coin
export const getCoin = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

// price
export const getPrice = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

// coin Detail
export const getCoinDetail = (coinId: string) => {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((res) => res.json());
};
