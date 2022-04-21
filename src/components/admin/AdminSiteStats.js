import './AdminSiteStats.css';
import Chart from 'chart.js/auto';
import {Line, Bar} from 'react-chartjs-2';
import {useState} from "react";

const fakeSS = [
  {
    "id": 1,
    "totalUserNum": 12,
    "loginUserNum": 5,
    "adUploadNum": 20,
    "adEditNum": 11,
    "adDeleteNum": 0,
    "totalAdNum": 50,
    "tapRequestNum": 14,
    "markRequestNum": 12,
    "unmarkRequestNum": 11,
    "searchRequestNum": 40,
    "date": "April 03 2022"
  },
  {
    "id": 2,
    "totalUserNum": 12,
    "loginUserNum": 5,
    "adUploadNum": 20,
    "adEditNum": 11,
    "adDeleteNum": 0,
    "totalAdNum": 50,
    "tapRequestNum": 14,
    "markRequestNum": 12,
    "unmarkRequestNum": 11,
    "searchRequestNum": 40,
    "date": "April 04 2022"
  },
  {
    "id": 3,
    "totalUserNum": 12,
    "loginUserNum": 5,
    "adUploadNum": 20,
    "adEditNum": 11,
    "adDeleteNum": 0,
    "totalAdNum": 50,
    "tapRequestNum": 14,
    "markRequestNum": 12,
    "unmarkRequestNum": 11,
    "searchRequestNum": 40,
    "date": "April 05 2022"
  },
  {
    "id": 4,
    "totalUserNum": 12,
    "loginUserNum": 5,
    "adUploadNum": 20,
    "adEditNum": 11,
    "adDeleteNum": 0,
    "totalAdNum": 50,
    "tapRequestNum": 14,
    "markRequestNum": 12,
    "unmarkRequestNum": 11,
    "searchRequestNum": 40,
    "date": "April 06 2022"
  },
  {
    "id": 5,
    "totalUserNum": 12,
    "loginUserNum": 5,
    "adUploadNum": 20,
    "adEditNum": 11,
    "adDeleteNum": 0,
    "totalAdNum": 50,
    "tapRequestNum": 14,
    "markRequestNum": 12,
    "unmarkRequestNum": 11,
    "searchRequestNum": 40,
    "date": "April 07 2022"
  }
];

// https://www.chartjs.org/docs/latest/getting-started/integration.html
// https://react-chartjs-2.js.org/examples/line-chart
export default function AdminSiteStats() {
  const [data5Days, setData5Days] = useState(fakeSS);
  const [dataToday, setDataToday] = useState(fakeSS[0]);

  const convertDate = (s) => {
    let ans = '';
    let d = new Date(Date.parse(s));
    return `${d.getMonth()+1}/${d.getDate()}`;
  };

  const getChartOptions = () => {
    return {
      responsive: true
    };
  };

  // todo universal helper func?
  const getDataTotalUser = (dataType) => {
    let ans = {labels: [], datasets: []};
    ans.labels = data5Days.map(day => convertDate(day.date));
    let dataset = {
      label: 'Total User Count',
      data: data5Days.map(day => day.totalUserNum),
      backgroundColor: '#57068C'
    };
    ans.datasets.push(dataset);
    return ans;
  };

  return (
    <div className={'MyPostsCanvas card non-text'}>
      <div className={'MyPostsCanvas-children'}>
        <div className={'row-title-card'}>
          <p>Site Statistics</p>
        </div>

        <div className={'AdminSSTodayCard card'}>
          <div className={'AdminSSTodayCard-each'}>
            <p style={{fontWeight: 'bold'}}>Today</p>
          </div>
          <div className={'AdminSSTodayCard-each'}>
            <p>#loginUser: {dataToday.loginUserNum}</p>
          </div>
          <div className={'AdminSSTodayCard-each'}>
            <p>#adUpload: {dataToday.adUploadNum}</p>
          </div>
          <div className={'AdminSSTodayCard-each'}>
            <p>#adDelete: {dataToday.adDeleteNum}</p>
          </div>
          <div className={'AdminSSTodayCard-each'}>
            <p>#tap: {dataToday.tapRequestNum}</p>
          </div>
          <div className={'AdminSSTodayCard-each'}>
            <p>#mark: {dataToday.markRequestNum}</p>
          </div>

        </div>

        <div className={'AdminSSWidgetCard-container'}>
          <AdminSSWidgetCard options={getChartOptions()} data={getDataTotalUser()}/>
          <AdminSSWidgetCard options={getChartOptions()} data={getDataTotalUser()}/>
          <AdminSSWidgetCard options={getChartOptions()} data={getDataTotalUser()}/>
          <AdminSSWidgetCard options={getChartOptions()} data={getDataTotalUser()}/>
        </div>


      </div>
    </div>
  );
}

function AdminSSWidgetCard({
  options={},
  data={}
                           }) {
  return (
    <div className={'AdminSSWidgetCard card'}>
      <Line options={options} data={data}/>
    </div>
  );
}





