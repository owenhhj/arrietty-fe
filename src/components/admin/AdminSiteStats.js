import './AdminSiteStats.css';
import {useEffect, useState} from "react";
import Chart from 'chart.js/auto';  // don't remove this
import {Line} from 'react-chartjs-2';
import {dataFetch} from "../common/common";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// https://www.chartjs.org/docs/latest/getting-started/integration.html
// https://react-chartjs-2.js.org/examples/line-chart
export default function AdminSiteStats() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const STATS = process.env.REACT_APP_API_ADMIN_STATISTICS;
  const [data5Days, setData5Days] = useState([]);
  const [dataToday, setDataToday] = useState({});
  const [chartTypes, setChartTypes] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}${STATS}`,
      {method: 'GET'},
      (res) => {
        let temp = res.sort((d1, d2) => Date.parse(d1.date) - Date.parse(d2.date));
        setData5Days(temp);
        setDataToday(temp[temp.length-1]);
      },
      (err) => {
        console.warn(err);
        alert('fetch() error');
      }
    );
  }, []);

  useEffect(() => {
    let temp = data5Days;
    let types = [];
    if (temp.length>0) {
      let curr = temp[0];
      for (let k of Object.keys(curr)) {
        if (!['id', 'date'].includes(k)) {
          types.push(k);
        }
      }
    }
    setChartTypes(types);
  }, [data5Days]);

  const convertDate = (s) => {
    let d = new Date(Date.parse(s));
    return `${d.getMonth()+1}/${d.getDate()}`;
  };

  const getChartOptions = () => {
    return {
      responsive: true
    };
  };

  const getDataForChart = (type) => {
    let ans = {labels: [], datasets: []};
    ans.labels = data5Days.map(day => convertDate(day.date));
    let dataset = {
      label: type,
      data: data5Days.map(day => day[type]),
      backgroundColor: '#57068C'
    };
    ans.datasets.push(dataset);
    return ans;
  };

  return (
    <div className={'MyPostsCanvas card non-text'} style={{height: 'min-content', width: '1300px'}}>
      <div className={'MyPostsCanvas-children'}>
        <div className={'row-title-card'}>
          <p>Site Statistics</p>
        </div>

        <div className={'AdminSSTodayCard card'}>
          <div className={'AdminSSTodayCard-each'}>
            <p style={{fontWeight: 'bold'}}>Today</p>
          </div>
          {chartTypes.slice(0, 6).map(type => {
            return (
              <div key={type} className={'AdminSSTodayCard-each'}>
                <p>{type}: {dataToday[type]}</p>
              </div>
            );
          })}

          {/*<div className={'AdminSSTodayCard-each'}>*/}
          {/*  <p style={{fontWeight: 'bold'}}>Today</p>*/}
          {/*</div>*/}
          {/*<div className={'AdminSSTodayCard-each'}>*/}
          {/*  <p>#loginUser: {dataToday.loginUserNum}</p>*/}
          {/*</div>*/}
          {/*<div className={'AdminSSTodayCard-each'}>*/}
          {/*  <p>#adUpload: {dataToday.adUploadNum}</p>*/}
          {/*</div>*/}
          {/*<div className={'AdminSSTodayCard-each'}>*/}
          {/*  <p>#adDelete: {dataToday.adDeleteNum}</p>*/}
          {/*</div>*/}

        </div>

        <div className={'AdminSSWidgetCard-container'}>
          {chartTypes.map(type => {
            return (
              <AdminSSWidgetCard key={type} options={getChartOptions()} data={getDataForChart(type)}/>
            );
          })}
        </div>

        <div style={{height: '3rem'}}>
          {/* placeholder for padding */}
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





