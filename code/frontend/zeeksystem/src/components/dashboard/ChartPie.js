import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/joy/Divider";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { _Vouchers } from "../../services/atom";

const Dashboard = () => {
  let location = useLocation();
  const vouchers = useRecoilValue(_Vouchers);
  const [labels, setLabels] = useState([]);

  const totalAmount = vouchers.reduce((total, voucher) => {
    if (!voucher.fields.redeemed) {
      return total + parseFloat(voucher.fields.ammount);
    } else {
      return total;
    }
  }, 0);

  function getUniqueNumOfStoreTypes(vouchers) {
    let storeTypes = [];
    let StoreSeries = [];
    let i = 0;
    if (vouchers && vouchers.length > 0) {
      vouchers.forEach((voucher) => {
        if (!storeTypes.includes(voucher.fields.storeType)) {
          storeTypes.push(voucher.fields.storeType);
          StoreSeries.push(1);
        } else {
          for (i = 0; i < storeTypes.length; i++) {
            if (storeTypes[i] == voucher.fields.storeType) StoreSeries[i]++;
          }
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
          storeTypes.push(voucher.fields.storeType);
        }
      });
    }
    return storeTypes;
  }

  const seriesData = getUniqueNumOfStoreTypes(
    vouchers.filter((voucher) => !voucher.fields.redeemed)
  );
  const label = getUniqueArrOfStoreTypes(
    vouchers.filter((voucher) => !voucher.fields.redeemed)
  );
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
              labels: label,
              title: {
                style: {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#263238",
                },
                align: "center",
                text: totalAmount + " :סכום הזיכויים שלך",
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
                  text: totalAmount + " :סכום הזיכויים שלך",
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
                        ? "total:" + totalAmount
                        : totalAmount + " :סכום הזיכויים שלך",
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
