window.onload = function() {

let nationsString;  
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

for (let i=0; i<nationsString.length; i++){

  var nationsData=nationsString[i].split('$');

  var parent_el = document.getElementById('dynamic');
  html_str1="";
  html_str1+="<div class='row naccard card'>";
  html_str1+="<div class='padcard'>";
  html_str1+="<div class='col-12 mb-4'>";
  html_str1+="<img src="+nationsData[5]+">";
  html_str1+="</div>";
  html_str1+="<div class='col-12 mb-4'>";
  html_str1+="<div class='h3 font-weight-bold' id='name_nac_proj"+i+"'></div>";
  html_str1+="</div>";
  html_str1+="<div class='col-12 mb-4'>";
  html_str1+="<span class='h5 font-weight-bold'>Бюджет&nbsp;</span><span class='h4 font-weight-bold money' id='budjet"+i+"'>&nbsp;</span>";
  html_str1+="</div>";
  html_str1+="<div class='col-12 mb-4' id='canva"+i+"'>";
  html_str1+="<canvas id='labelChart"+i+"'></canvas>";
  html_str1+="</div>";
  html_str1+="<div class='col-12 mb-4'>";
  html_str1+="<button type='submit' class='btn fed-btn' onclick='FederalProject(this)' id='natPr"+i+"'>";
  html_str1+="<span class='h5 font-weight-bold'>Федеральные проекты&nbsp;</span><span class='h5 font-weight-bold' id='kolichfedproj"+i+"'></span>";
  html_str1+="</button>";
  html_str1+="</div>";
  html_str1+="</div>";
  html_str1+="</div>";
  var ele=document.createElement("div");
  ele.setAttribute("class",'col-12 col-md-6 col-xl-4 nacproekt b'+i+'');
  parent_el.appendChild(ele).innerHTML = html_str1;

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
        position: 'bottom',
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
});
}
