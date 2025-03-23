import { getCoinDetail } from "@/api";
import Loader from "@/components/Loader";
import { IChartData } from "@/types/general";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import styled from "styled-components";

const Charts = () => {
  const { coinId } = useParams();
  console.log(coinId);
  const { isLoading, data } = useQuery<IChartData[]>(
    ["Chart", coinId],
    () => getCoinDetail(coinId as string),
    {
      refetchInterval: 5000,
    }
  );

  {
    if (isLoading) return <Loader />;
  }
  return (
    <ChartContainer>
      <Chart
        type="line"
        options={{
          theme: {
            mode: "dark",
          },
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["blue"] },
            colors: ["red"],
          },

          chart: {
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
          },
          stroke: {
            curve: "smooth",
            width: 5,
          },
        }}
        series={[
          {
            name: "Price",
            data: data?.map((price) => Number(price.close)) as number[],
          },
        ]}
      ></Chart>
    </ChartContainer>
  );
};

export default Charts;

const ChartContainer = styled.div`
  max-width: 480px;
`;
