let temptemp2;
let temptemp;
function OpenFederal(elmnt){
 if((temptemp!=undefined)&& ($('#'+temptemp+'none').is(':visible'))){
  toMenu(temptemp, temptemp2);
 }
  var fp_id=elmnt.id;
  var stringId=fp_id.split(';');
  fp_id= stringId[1];

  function ajaxRequest(){
    return $.ajax({
        type:"GET",
        url:"/db_fedwindow",
        data:{fp_id}
        });
    }
  $federals=ajaxRequest();
  $federals
  .done(function(data){
      var federalString = JSON.parse(data);
      var elem=document.getElementById(''+stringId[0]+'ID');
      elem.classList.remove("col-md-6","col-xl-4");

      tabcontent = document.getElementsByClassName("CN"+stringId[0]+"");
        for (let i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";  
        }
      html_str1="";
      html_str1+="<div class='container contfed'>";
      html_str1+="<div class='row'>";
      html_str1+="<div class='col-12 col-md-4 mb-4 mar-top'>";
      html_str1+="<buttton class='btn btn-backtmNac mb-4' onclick='toMenu(temptemp, temptemp2)'>";
      html_str1+="<div class='h3 font-weight-bold'>"+federalString[0][0]+"</div>";
      html_str1+="</button></div>";
      html_str1+="<div class='col-12 col-md-8 mb-4 mar-top'>";
      html_str1+="<div class='h3 font-weight-bold'>"+federalString[0][1]+"</div>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Количество контрактов</p>";
      html_str1+="<p class='bodyItem'>"+federalString[0][2]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Сумма контрактов</p>";
      html_str1+="<p class='bodyItem'>"+federalString[0][3]+"&#8381;</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Количество субсидий</p>";
      html_str1+="<p class='bodyItem'>"+federalString[0][4]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Сумма субсидий</p>";
      html_str1+="<p class='bodyItem'>"+federalString[0][5]+"&#8381;</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-12 d-flex justify-content-around mb-4'>";
      html_str1+="<div class='h3 font-weight-bold'>Субсидии</div>";
      html_str1+="<form>";

      if (federalString[1][0]!=undefined){

        html_str1+="<span class='headItem'>года реализации</span>";
        html_str1+="<select id='year"+fp_id+"' class='form-control' name='year_name' onchange='getSubs(this)'>";
        html_str1+='<option value="'+federalString[1][federalString[1].length-1]+'">'+federalString[1][federalString[1].length-1]+'</option>';
        for (let i=0; i<federalString[1].length-1; i++){
          html_str1+='<option value="'+federalString[1][i]+'">'+federalString[1][i]+'</option>';
        }

        html_str1+="</select>";
        html_str1+="</form>";
        html_str1+="</div>";
        html_str1+="<div class='row' id='subsinfo"+fp_id+"'>";
        for (let i=0; i<federalString[2].length; i+=5){
          html_str1+="<a href='"+federalString[2][i]+"' id='row"+i+"' target='_blank'>"
          html_str1+="<div class='row Subsbackground'>"
          html_str1+="<div class='col-md-6 col-lg-3 col-12 mb-4'>";
          html_str1+="<p class='headItem SubsHead"+fp_id+" h6'>Распорядитель</p>";
          html_str1+="<p class='bodyItem SubsBody"+fp_id+"'>"+federalString[2][i+1]+"</p>";
          html_str1+="</div>";
          html_str1+="<div class='col-md-6 col-lg-5 col-12 mb-4'>";
          html_str1+="<p class='headItem SubsHead"+fp_id+" h6'>Получатель</p>";
          html_str1+="<p class='bodyItem SubsBody"+fp_id+"'>"+federalString[2][i+2]+"</p>";
          html_str1+="</div>";
          html_str1+="<div class='col-md-6 col-lg-2 col-6 mb-4'>";
          html_str1+="<p class='headItem SubsHead"+fp_id+" h6'>Сумма</p>";
          html_str1+="<p class='bodyItem SubsBody"+fp_id+"'>"+federalString[2][i+3]+"&#8381;</p>";
          html_str1+="</div>";
          html_str1+="<div class='col-md-6 col-lg-2 col-6 mb-4'>";
          html_str1+="<p class='headItem SubsHead"+fp_id+" h6'>Срок реализации</p>";
          html_str1+="<p class='bodyItem SubsBody"+fp_id+"'>"+federalString[2][i+4]+"</p>";
          html_str1+="</div>";
          html_str1+="</div></a>";
        };
        html_str1+="</div>";
      }else{
        html_str1+="</div>";
        html_str1+="<div class='col-12'>";
        html_str1+="<div class='row Subsbackground' id='row0'>"
        html_str1+="<div class='alert alert-danger col-12'><strong>Ошибка!</strong> Данный запрос не выдал результатов.</div>";
        html_str1+="</div>";
      };
        temptemp=stringId[0]+'ID';
        temptemp2='CN'+stringId[0];
        html_str1+="<div class='col-12'><buttton class='btn btn-backtm mb-4' onclick='toMenu(temptemp, temptemp2)'>назад</button></div>";
        html_str1+="</div>";
        html_str1+="</div>";
      if (document.getElementById(temptemp+'none')==null){  
        var ele=document.createElement("div");
        ele.setAttribute("class",'col-12');
        ele.setAttribute("id",""+temptemp+'none');
        elem.appendChild(ele).innerHTML = html_str1;
      }else{
        document.getElementById(temptemp+'none').innerHTML = html_str1;
        document.getElementById(temptemp+'none').style.display='block';
        document.getElementById(temptemp+'none').style.paddingLeft='0px';
        document.getElementById(temptemp+'none').style.paddingRight='0px';
      }

      $(window).scrollTop($(elem).offset().top);
      document.getElementById('ONav'+stringId[0]+'').style.background='linear-gradient(90deg, #7764CA 0%, #6474CA 100%)';
      var tabcontent = document.getElementsByClassName("Subsbackground");
      for (let i=0; i<tabcontent.length; i++){
        if ((i%3)!=1){
          tabcontent[i].style.backgroundColor="#fff";
        }  
      }
      var subscontent= document.getElementsByClassName('SubsHead'+fp_id+'');
      for (let i=0; i<subscontent.length; i++){
        if ((i!=4)&&(i!=5)&&(i!=6)&&(i!=7)){
          subscontent[i].style.color='#3b49a8';
          document.getElementsByClassName('SubsBody'+fp_id+'')[i].style.color='rgb(5, 5, 5)';
        }
      } 
  });
}

function getSubs(elmnt){
  var n=document.getElementById(elmnt.id).options.selectedIndex;    
  var year = document.getElementById(elmnt.id).options[n].value;
  var temp_federal_id=elmnt.id.split('year');
  federal_id=temp_federal_id[1];
  function ajaxRequest(){
    return $.ajax({
        type:"GET",
        url:"/db_fedwindow/year",
        data:{federal_id, year}
        });
    }
  $subs=ajaxRequest();
  $subs
  .done(function(data){
    console.log(data);
    subs_info = JSON.parse(data);
    document.getElementById("subsinfo"+federal_id+"").innerHTML='';
    html_str1='';
    for (let i=0; i<subs_info.length; i++){
      html_str1+="<a href='"+subs_info[i][0]+"' id='row"+i*5+"' target='_blank'>"
      html_str1+="<div class='row Subsbackground'>"
      html_str1+="<div class='col-md-6 col-lg-3 col-12 mb-4'>";
      html_str1+="<p class='headItem SubsHead"+federal_id+" h6'>Распорядитель</p>";
      html_str1+="<p class='bodyItem SubsBody"+federal_id+"'>"+subs_info[i][1]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-6 col-lg-5 col-12 mb-4'>";
      html_str1+="<p class='headItem SubsHead"+federal_id+" h6'>Получатель</p>";
      html_str1+="<p class='bodyItem SubsBody"+federal_id+"'>"+subs_info[i][2]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-6 col-lg-2 col-6 mb-4'>";
      html_str1+="<p class='headItem SubsHead"+federal_id+" h6'>Сумма</p>";
      html_str1+="<p class='bodyItem SubsBody"+federal_id+"'>"+subs_info[i][3]+"&#8381;</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-6 col-lg-2 col-6 mb-4'>";
      html_str1+="<p class='headItem SubsHead"+federal_id+" h6'>Срок реализации</p>";
      html_str1+="<p class='bodyItem SubsBody"+federal_id+"'>"+subs_info[i][4]+"</p>";
      html_str1+="</div>";
      html_str1+="</div></a>";
      };
    document.getElementById("subsinfo"+federal_id+"").innerHTML=html_str1;
    var tabcontent = document.getElementsByClassName("Subsbackground");
      for (let i=0; i<tabcontent.length; i++){
        if ((i%3)!=1){
          tabcontent[i].style.backgroundColor="#fff";
        }  
      }
      var subscontent= document.getElementsByClassName('SubsHead'+federal_id+'');
      for (let i=0; i<subscontent.length; i++){
        if ((i!=4)&&(i!=5)&&(i!=6)&&(i!=7)){
          subscontent[i].style.color='#3b49a8';
          document.getElementsByClassName('SubsBody'+federal_id+'')[i].style.color='rgb(5, 5, 5)';
        }
      } 
  })
};

function toMenu(id, block){
  var elem=document.getElementById(id);
  elem.classList.add("col-md-6","col-xl-4");
  document.getElementById(id+'none').style.display="none";
  tabcontent = document.getElementsByClassName(block);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "block";  
  }
  $(window).scrollTop($(elem).offset().top);
}