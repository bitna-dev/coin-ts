import { getCoins } from "@/api";
import { isDarkAtom } from "@/atoms";
import Loader from "@/components/Loader";
import { ICoin } from "@/types/general";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], getCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleAtomTheme = () => setDarkAtom((prev) => !prev);

  if (isLoading) return <Loader />;
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={toggleAtomTheme}>Toggle</button>
      </Header>
      <CoinsList>
        {data?.slice(0, 100).map((coin) => (
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
  background-color: ${(props) => props.theme.bgSecondColor};
  color: ${(props) => props.theme.color};
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
