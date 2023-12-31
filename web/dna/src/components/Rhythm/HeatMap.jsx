import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import useNotification from "../Notification/useNotification";
const HeatMap = () => {
  // ----------------------------------------------------------------------------
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const [step, setStep] = useState("--");

  const socket = new WebSocket("ws://115.95.222.206:100");
  const firstSteps = useNotification("걸음수 달성", {
    body: `5,000걸음 달성!\n10,000걸음에 도전하세요!`,
    icon: `${process.env.PUBLIC_URL}/images/ic_launcher.png`,
    badge: `${process.env.PUBLIC_URL}/images/ic_launcher.png`,
    tag: "Rhythm Care",
    requireInteraction: true,
  });

  const secondSteps = useNotification("걸음수 달성", {
    body: `10,000걸음 달성!\n오늘 하루도 고생하셨습니다!`,
    icon: `${process.env.PUBLIC_URL}/images/ic_launcher.png`,
    badge: `${process.env.PUBLIC_URL}/images/ic_launcher.png`,
    tag: "Rhythm Care",
    requireInteraction: true,
  });

  // 걸음수 받아오기
  if (loginData != null) {
    socket.addEventListener("message", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.data);
      if (data.id == loginData.id && data.steps != step) {
        setStep(data.steps);
        if (parseInt(data.steps) == 5000) {
          firstSteps();
        } else if (parseInt(data.steps) == 10000) {
          secondSteps();
        }
      }
    });
  }

  // ----------------------------------------------------------------------------

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; // 월 목록
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // 요일 목록

  const generateData = (count, yrange, startDay) => {
    let i = 0;
    const series = [];

    while (i < count) {
      const x = new Date(2023, 0, startDay + i * 7); // 각 주의 시작일
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x.getTime(),
        y: y,
      });
      i++;
    }
    return series;
  };

  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 400,
      width: 600,
      type: "heatmap",
      toolbar: {
        show: false, // 툴바를 숨김
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#4ab134"],
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        // rotateAlways: true,
        // rotate: -45,/
        datetimeFormatter: {
          month: "MMM", // 월 표시
        },
      },
    },
    yaxis: {
      categories: daysOfWeek,
      reversed: true,
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: function (val) {
          const date = new Date(val);
          return months[date.getMonth()] + " " + date.getDate();
        },
      },
    },
    responsive : [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 250,
            width: 320
          }
        }
        
      }
    ]
  });

  const [chartSeries, setChartSeries] = useState([
    { name: "Sun", data: generateData(12, { min: 0, max: 20000 }, 1) },
    { name: "Mon", data: generateData(12, { min: 0, max: 20000 }, 2) },
    { name: "Tue", data: generateData(12, { min: 0, max: 20000 }, 3) },
    { name: "Wed", data: generateData(12, { min: 0, max: 20000 }, 4) },
    { name: "Thu", data: generateData(12, { min: 0, max: 20000 }, 5) },
    { name: "Fri", data: generateData(12, { min: 0, max: 20000 }, 6) },
    { name: "Sat", data: generateData(12, { min: 0, max: 20000 }, 7) },
  ]);

  useEffect(() => {
    // 차트 초기화
    setChartOptions((prevOptions) => ({
      ...prevOptions,
    }));
    setChartSeries((prevSeries) => [...prevSeries]);
  }, []);
  return (
    <HeatmapBox>
      <GrassBox>
        <StepText>
          <h2>걸음수 잔디밭</h2>
          <p>
            오늘의 걸음수에 따라 잔디를 채울 수 있어요
          </p>
          <p id="step">{step}걸음</p>
        </StepText>
        <div>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="heatmap"
            width={600}
            height={400}
          />
        </div>
      </GrassBox>
    </HeatmapBox>
  );
};

export default HeatMap;


const HeatmapBox = styled.div`
  margin-top: 70px;
`;

const GrassBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:100px;

  @media only screen and (max-width: 1300px) {
   flex-direction : column ;
   margin: -50px 0 0 0;
   gap: 0px;
  }
`

const StepText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & h2 {
    font-size: 30px;
    color: #212e3d;
  }

  & p {
      margin-top: -10px;
    font-size: 20px;
  }
  & #step {
    font-size: 45px;
    font-weight: bold;
    color: #212e3d;
    margin-top: 150px;

  }

  @media only screen and (max-width: 1300px) {
    padding: 0 20px 0 20px;

    & h2 {
      font-size: 23px;
    }
    & p {
      font-size: 15px;
    }
    & #step {
      font-size: 40px;
      margin-top: 10px;
      text-align: right;
    }
}
`;
