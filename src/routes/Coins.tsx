import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface CoinInter {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInter[]>([]);
  const getCoins = async () => {
    const res = await (
      await fetch(`https://api.coinpaprika.com/v1/coins`)
    ).json();
    setCoins(res.slice(0, 100));
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      <CoinsList>
        {coins?.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{ name: coin.name }}>
              <Img
                src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
              />
              {coin.name} ➡️
            </Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;

// STYLE

const Container = styled.div`
  padding: 0px 1.2rem;
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: #fff;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  a {
    display: flex;
    transition: color 0.2s ease-in;
    align-items: center;
    gap: 10px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
`;
