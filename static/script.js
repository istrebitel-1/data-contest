window.onload = function() {

$nationsString='';  
function ajaxRequest(){
  return $.ajax({
      type:"GET",
      url:"/db_natdata",
      data:'nations'
      });
  }
  $nations=ajaxRequest();
  $nations
  .done(function(data){
      nationsString=data.split(';');
  });
for (let i=0; i<12; i++){ 
  var nationsData=nationsString[i].split['-'];
  document.getElementById("name_nac_proj"+i+"").innerHTML=nationsData[0];
  document.getElementById("budjet"+i+"").innerHTML=nationsData[1];
  document.getElementById("kolichfedproj"+i+"").innerHTML=nationsData[2];
  var ctxP = document.getElementById("labelChart"+i+"").getContext('2d');
  Chart.defaults.global.defaultFontColor = 'white';
  var myPieChart = new Chart(ctxP, {
    plugins: [ChartDataLabels],
    type: 'pie',
    data: {
      labels: ["Реализовано", "Осталось"],
      fontColor: 'white',
      datasets: [{
        data: [Number(nationsData[3]), Number(nationsData[4])],
        backgroundColor: ["#FF715B", "#2EC4B6"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          boxWidth: 10
        }
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            let percentage = (value * 100 / sum).toFixed(2) + "%";
            return percentage;
          },
          color: 'white',
          labels: {
            title: {
              font: {
                size: '16'
              }
            }
          }
        }
      }
    }
  });
 }
}