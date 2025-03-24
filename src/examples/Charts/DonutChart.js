import React from "react";
import Chart from "react-apexcharts";

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { donutChartData, donutChartOptions } = this.props;
    this.setState({
      chartData: donutChartData,
      chartOptions: donutChartOptions,
    });
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="donut"
        width="100%"
        height="100%"
      />
    );
  }
}

export default DonutChart;