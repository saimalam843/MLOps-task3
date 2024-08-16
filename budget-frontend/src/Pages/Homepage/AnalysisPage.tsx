import { Typography } from "@mui/material";
import "../CSS/AnalysisPage.css";
import { Card } from "antd";
import Chart from "../../Components/Chart/Chart";
import { useEffect, useState } from "react";
import { api as apiService } from "../../api";

const AnalysisPage = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const response = await apiService.getMonthlyExpenses();
        const expenses = response.data;

        // Prepare data for the chart
        const chartData = [];
        const chartLabels = [];

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        for (let i = 0; i < 12; i++) {
          const monthExpense = expenses.find((exp: { _id: number; totalExpenses: number }) => exp._id - 1 === i);
          chartData.push(monthExpense ? monthExpense.totalExpenses : 0);
          chartLabels.push(monthNames[i]);
        }

        setData(chartData);
        setLabels(chartLabels);
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }
    };

    fetchMonthlyExpenses();
  }, []);

  return (
    <div>
      <div className="analysis-top">
        <Typography variant="h3">Analysis</Typography>
      </div>
      <div className="graph-div">
        <Card title="Analysis" className="card">
          <Chart data={data} labels={labels} />
        </Card>
      </div>
    </div>
  );
};

export default AnalysisPage;
