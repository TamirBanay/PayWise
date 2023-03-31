import React from "react";
import Chart from "react-apexcharts";
import { styled, alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
  const seriesData = [20, 43, 50, 54];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sx"));
  return (
    <div>
      {isMobile ? (
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
            plotOptions: {
              pie: {
                donut: {
                  size: "65%",
                },
              },
            },

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
              "מזון וצריכה",
              "ביגוד והנעלה",
              "חשמל ואלקטרוניקה",
              "שונות",
            ],

            noData: { text: "Empty wallet" },
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
