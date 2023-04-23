import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChartPie from "./ChartPie.css";
import Divider from "@mui/joy/Divider";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {Vouchers} from "../../services/atom"

const Dashboard = () => {
  let location = useLocation();
  const vouchers = useRecoilValue(Vouchers)
  const [labels, setLabels] = useState([])
  
  const totalAmmount = vouchers.reduce((total, voucher) => {
    return total + parseFloat(voucher.fields.ammount);
  }, 0);

  
  function getUniqueNumOfStoreTypes(vouchers) {
    let storeTypes = [];
    let StoreSeries = [];
    if (vouchers && vouchers.length > 0) {
      vouchers.forEach((voucher) => {
        if (!storeTypes.includes(voucher.fields.storeType)) {
          storeTypes.push(voucher.fields.storeType)
          StoreSeries.push(1);
          
        }
      });
    }
    return StoreSeries;
  }

  function getUniqueArrOfStoreTypes(vouchers) {
    let storeTypes = [];
    if (vouchers && vouchers.length > 0) {
      vouchers.forEach((voucher) => {
        if (!storeTypes.includes(voucher.fields.storeType)) {
          storeTypes.push(voucher.fields.storeType)         
        }
      });
    }
    return storeTypes;
  }
  
  const seriesData = getUniqueNumOfStoreTypes(vouchers);
  const label = getUniqueArrOfStoreTypes(vouchers);
  
  const theme = useTheme();
  const isMobileMs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      {isMobileMs ? (
        /* if its mobile */
        <div>
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
                text: totalAmmount + " :סכום הזיכויים שלך",
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
                      // show: false,
                    },
                  },
                },
              ],
              noData: { text: "Empty wallet" },
            }}
          />
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
                  text: totalAmmount + " :סכום הזיכויים שלך",
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
            <div
              style={{
                position: location.pathname == "/profile" ? "relative" : "",
                right: location.pathname == "/profile" ? "630px" : "",
                marginTop: location.pathname == "/profile" ? "20px" : "",
              }}
            >
              <Chart
                type="donut"
                height={location.pathname == "/profile" ? 300 : 450}
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
                      color: "#263238",
                    },
                    align: "center",

                    text:
                      location.pathname == "/profile"
                        ? "total:" + totalAmmount
                        : totalAmmount + " :סכום הזיכויים שלך",
                  },
                  legend: {
                    position: "bottom",
                  },
                  noData: { text: "Empty wallet" },
                  dataLabels: {
                    enabled: location.pathname == "/profile" ? false : true,
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
