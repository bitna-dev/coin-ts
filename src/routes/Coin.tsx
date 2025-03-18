import { InfoData, PriceData } from "@/types/general";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

const Coin = () => {
  const location = useLocation();
  const { state } = location;
  const { coinId } = useParams();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const [load, setLoad] = useState(true);

  const getInfo = async () => {
    const infoRes = await (
      await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    ).json();
    setInfo(infoRes);
    const priceRes = await (
      await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    ).json();
    setPriceInfo(priceRes);
    setLoad(false);
  };
  useEffect(() => {
    getInfo();
  }, [coinId]);
  console.log(info);
  console.log(priceInfo);
  return (
    <Container>
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
            <ItemTitle>SOURCE</ItemTitle>
            <ItemDesc>{info?.open_source ? "Yes" : "No"}</ItemDesc>
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
      <Routes>
        <Route path={`${info?.id}/price`} element={<Price />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Container>
  );
};

export default Coin;

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
  margin-bottom: 1rem;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.color};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  color: ${(props) => props.theme.bgColor};
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
