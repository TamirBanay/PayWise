import React, { Component } from "react";
import Chart from "react-apexcharts";
class Dashboard extends Component {
  render() {
    const seriesData = [20, 43, 50, 54];

    return (
      <div>
        <br />
        <Chart
          type="donut"
          width={650}
          height={350}
          series={seriesData}
          options={{
            labels: [
              "Clothing",
              "Food",
              "Retailing",
              "Electricity & Electronics",
            ],
            legend: {
              position: "bottom",
            },
            title: { text: "Your wallet" },
            noData: { text: "Empty wallet" },
          }}
          style={{ position: "fixed", left: "400px", marginTop: "100px" }}
        />

        <div style={{ textAlign: "center" }}></div>
      </div>
    );
  }
}

export default Dashboard;
