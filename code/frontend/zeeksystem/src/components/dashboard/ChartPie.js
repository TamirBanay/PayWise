import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dashbord from "./dashbord.css";
import Divider from "@mui/joy/Divider";

const Dashboard = () => {
  const seriesData = [20, 43, 50, 54];

  const sum = seriesData.reduce((total, num) => total + num, 0);

  const theme = useTheme();
  const isMobileMs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      {isMobileMs ? (
        /* if its mobile */
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
                        width: 350,
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
      ) : (
        /* if its normal screen */
        <div className="main-container">
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
                        width: 350,
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
              type="pie"
              height={450}
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
                    fontSize: "30px",
                    fontWeight: "bold",
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
      )}
    </div>
  );
};

export default Dashboard;
