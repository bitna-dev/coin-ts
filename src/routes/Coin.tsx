import { getCoin, getPrice } from "@/api";
import Loader from "@/components/Loader";
import { InfoData, PriceData } from "@/types/general";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

const Coin = () => {
  const location = useLocation();
  const { state } = location;
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(
    ["info", coinId],
    () => getCoin(coinId as string)
  );
  const { isLoading: priceLoading, data: priceInfo } = useQuery<PriceData>(
    ["price", coinId],
    () => getPrice(coinId as string),
    {
      refetchInterval: 5000,
    }
  );

  if (infoLoading || priceLoading) return <Loader />;
  return (
    <Container>
      <Helmet>
        <title>{coinId}</title>
      </Helmet>
      <Header>
        <Img src={`${info?.logo}`} />
        <Title>{state?.name ? state?.name : info?.name}</Title>
      </Header>
      <Content>
        <ContentItem>
          <Item>
            <ItemTitle>Rank</ItemTitle>
            <ItemDesc>{info?.rank}</ItemDesc>
          </Item>
          <Item>
            <ItemTitle>SYMBOL</ItemTitle>
            <ItemDesc>${info?.symbol}</ItemDesc>
          </Item>
          <Item>
            <ItemTitle>Price</ItemTitle>
            <ItemDesc>${priceInfo?.total_supply.toFixed(2)}</ItemDesc>
          </Item>
        </ContentItem>
        <ContentItem>
          <Item>
            <ItemDesc>{info?.description}</ItemDesc>
          </Item>
        </ContentItem>
        <ContentItem>
          <Item>
            <ItemTitle>TOTAL SUPLY</ItemTitle>
            <ItemDesc>{priceInfo?.total_supply}</ItemDesc>
          </Item>
          <Item>
            <ItemTitle>MAX SUPLY</ItemTitle>
            <ItemDesc>{priceInfo?.max_supply}</ItemDesc>
          </Item>
        </ContentItem>
      </Content>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to="chart">Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to="price">Price</Link>
        </Tab>
      </Tabs>
      <Outlet />
    </Container>
  );
};

export default Coin;

// STYLE
const Container = styled.div`
  padding: 0px 1.2rem;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin-bottom: 1rem;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.bgSecondColor};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 14px;
  color: ${(props) => props.theme.color};
  padding: 0.5rem 1rem;
`;

const Img = styled.img`
  height: 100%;
`;
const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemTitle = styled.span`
  font-size: 0.7rem;
`;
const ItemDesc = styled.span`
  line-height: 1.3;
  font-size: 0.9rem;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  color: ${(props) => props.theme.bgSecondColor};
`;
const Tab = styled.span<{ isActive: boolean }>`
  width: 100%;
  border-radius: 14px;
  text-align: center;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgSecondColor};
  color: ${(props) => (props.isActive ? props.theme.color : props.theme.color)};
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.6rem 1rem;
  }
`;
