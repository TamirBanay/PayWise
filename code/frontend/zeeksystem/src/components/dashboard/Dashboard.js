import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
  const seriesData = [20, 43, 50, 54];

  const sum = seriesData.reduce((total, num) => total + num, 0);

  const theme = useTheme();
  const isMobileMs = useMediaQuery(theme.breakpoints.down("sm"));
  // const isMobileLg = useMediaQuery(theme.breakpoints.up("lg"));

  // console.log(isMobileLg);
  return (
    <div>
      {isMobileMs ? (
        <Chart
          type="donut"
          series={seriesData}
          options={{
            labels: [
              "מזון וצריכה",
              "ביגוד והנעלה",
              "חשמל ואלקטרוניקה",
              "שונות",
            ],
            title: {
              style: {
                fontSize: "18px",
                fontWeight: "bold",
                // fontFamily: "Helvetica, Arial, sans-serif",
                color: "#263238",
              },
              align: "center",
              text: sum + " :סכום הזיכויים שלך",
            },

            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 400,
                    height: 300,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
            noData: { text: "Empty wallet" },
          }}
        />
      ) : (
        <Chart
          type="donut"
          height={350}
          series={seriesData}
          options={{
            labels: [
              "מזון וצריכה ",
              "ביגוד והנעלה",
              "חשמל ואלקטרוניקה",
              "שונות",
            ],
            title: {
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                // fontFamily: undefined,
                color: "#263238",
              },
              align: "center",
              text: sum + " :סכום הזיכויים שלך",
            },
            legend: {
              position: "bottom",
            },
            noData: { text: "Empty wallet" },
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
