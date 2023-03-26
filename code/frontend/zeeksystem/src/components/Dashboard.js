import React, { Component } from "react";
import Chart from "react-apexcharts";

class Dashboard extends Component {
  render() {
    const seriesData = [20, 43, 50, 54];
    const options = {
      labels: ["zara", "pull and bear", "castro", "rami levi"],
    };

    return (
      <div>
        <h1>Dashboard</h1>
        <Chart
          type="donut"
          width={1049}
          height={450}
          series={seriesData}
          options={options}
        />
      </div>
    );
  }
}

export default Dashboard;
