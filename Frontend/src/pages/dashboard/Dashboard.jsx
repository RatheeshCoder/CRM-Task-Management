import React, { useState, useEffect } from 'react'
import * as Style from './Style'
import ArcChart from './ArcChart/ArcChart'
import AreaChart from './AreaChart/AreaChart'
import WeeklyTaskChart from './WeeklyTaskChart/WeeklyTaskChart'
import StudentTaskChart from './StudentTaskChart/StockChart'
import studentData from './StudentTaskChart/studentData.json';
import RadarChart from './RadarChart/RadarChart'
import MixedChart from './MixedChart/MixedChart'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleViewAll = ()  =>{
    navigate('/notifications')
  }
  useEffect(() => {
    setData(studentData);
  }, []);

  const sampleData = [
    { date: '2023-01-01', close: 100 },
    { date: '2023-01-02', close: 105 },
    { date: '2023-01-03', close: 98 },
    { date: '2023-01-04', close: 102 },
    { date: '2023-01-05', close: 110 },
    { date: '2023-01-06', close: 108 },
    { date: '2023-01-07', close: 112 },
    { date: '2023-01-08', close: 115 },
    { date: '2023-01-09', close: 113 },
    { date: '2023-01-10', close: 118 },
    { date: '2023-01-11', close: 120 },
    { date: '2023-01-12', close: 122 },
    { date: '2023-01-13', close: 119 },
    { date: '2023-01-14', close: 125 },
    { date: '2023-01-15', close: 128 },
    { date: '2023-01-16', close: 130 },
    { date: '2023-01-17', close: 127 },
    { date: '2023-01-18', close: 132 },
    { date: '2023-01-19', close: 135 },
    { date: '2023-01-20', close: 133 }
  ];

  return (
    <Style.Dashboard>
      <Style.LeftData>
        <Style.Title>Dashboard</Style.Title>

        <Style.TopChart>
          <Style.LeftChart>
            <div style={{width:'30%'}}>
              <ArcChart />
            </div>
            <Style.DataRight>
              <h3>Task progress</h3>
              <h1>98/124</h1>
              <h3>This Month</h3>
            </Style.DataRight>
          </Style.LeftChart>

          <Style.LeftChart>
            <div style={{width:'100%'}}>
              <AreaChart data={sampleData} />
            </div>
          </Style.LeftChart>
        </Style.TopChart>

        <Style.MidChart>
          <Style.Title>Task Management Summaries</Style.Title>
          <Style.ChartTopMid>
            <h1>126 Task</h1>
            <p>This Week task</p>
            <div style={{width:'100%', height:'80%'}}>
              <WeeklyTaskChart />
            </div>
          </Style.ChartTopMid>
        </Style.MidChart>

        <Style.BottomChart>
          {data && <StudentTaskChart data={data} />}
        </Style.BottomChart>
      </Style.LeftData>


      <Style.RightData>
        <RadarChart/>
        <MixedChart />

        <Style.OverAllTask>
          <Style.Heading>Completed Task</Style.Heading>
          <Style.Content>
         <h1>44 Task</h1>
          <button onClick={handleViewAll}>View All</button>

          </Style.Content>


        </Style.OverAllTask>
      </Style.RightData>
    </Style.Dashboard>
  )
}

export default Dashboard