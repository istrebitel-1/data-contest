let temptemp2;
let temptemp;
function OpenFederal(elmnt){
 if((temptemp!=undefined)&& ($('#'+temptemp+'none').is(':visible'))){
  console.log(temptemp+'none');  
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
      federalString=data.split('$');
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
      html_str1+="<div class='row'>";
      html_str1+="<div class='col-12'><img src="+federalString[0]+"></div>";
      html_str1+="<div class='col-12 h3 font-weight-bold'>"+federalString[1]+"</div>";
      html_str1+="</div>";
      html_str1+="</div>";
      html_str1+="<div class='col-12 col-md-8 mb-4 mar-top'>";
      html_str1+="<div class='h3 font-weight-bold'>"+federalString[2]+"</div>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Количество контрактов</p>";
      html_str1+="<p class='bodyItem'>"+federalString[3]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Сумма контрактов</p>";
      html_str1+="<p class='bodyItem'>"+federalString[4]+"&#8381;</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Количество субсидий</p>";
      html_str1+="<p class='bodyItem'>"+federalString[5]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Сумма субсидий</p>";
      html_str1+="<p class='bodyItem'>"+federalString[6]+"&#8381;</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-12 d-flex justify-content-around mb-4'>";
      html_str1+="<div class='h3 font-weight-bold'>Субсидии</div>";
      html_str1+="<form>";
      html_str1+="<span>года реализации</span>";
      html_str1+="<select id='year"+fp_id+"' class='form-control' name='year_name' onchange='getSubs(this)'>";
    
      federalData=federalString[7].split(';');
      html_str1+='<option value="'+federalData[federalData.length-1]+'">'+federalData[federalData.length-1]+'</option>';
      for (let i=0; i<federalData.length-1; i++){
        html_str1+='<option value="'+federalData[i]+'">'+federalData[i]+'</option>';
      }

      html_str1+="</select>";
      html_str1+="</form>";
      html_str1+="</div>";
      if (federalString[8]!=undefined){
        federalData=federalString[8].split(';');
        for (let i=0; i<federalData.length; i+=4){
          html_str1+="<div class='row Subsbackground' id='row"+i+"'>"
          html_str1+="<div class='col-md-3 col-lg-3 col-6 mb-4'>";
          html_str1+="<p class='headItem h6'>Распорядитель</p>";
          html_str1+="<p class='bodyItem'>"+federalData[i]+"</p>";
          html_str1+="</div>";
          html_str1+="<div class='col-md-3 col-lg-5 col-6 mb-4'>";
          html_str1+="<p class='headItem h6'>Получатель</p>";
          html_str1+="<p class='bodyItem'>"+federalData[i+1]+"</p>";
          html_str1+="</div>";
          html_str1+="<div class='col-md-3 col-lg-2 col-6 mb-4'>";
          html_str1+="<p class='headItem h6'>Сумма</p>";
          html_str1+="<p class='bodyItem'>"+federalData[i+2]+"&#8381;</p>";
          html_str1+="</div>";
          html_str1+="<div class='col-md-3 col-lg-2 col-6 mb-4'>";
          html_str1+="<p class='headItem h6'>Срок реализации</p>";
          html_str1+="<p class='bodyItem'>"+federalData[i+3]+"</p>";
          html_str1+="</div>";
          html_str1+="</div>";
        };
      }else{
        html_str1+="<div class='col-12'>";
        html_str1+="<div class='row Subsbackground' id='row0'>"
        html_str1+="<div class='col-12 h3 font-weight-bold'>Данный запрос не выдал результатов</div>";
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
      }

      $(window).scrollTop($(elem).offset().top);
      document.getElementById('ONav'+stringId[0]+'').style.background='linear-gradient(90deg, #7764CA 0%, #6474CA 100%)';
      var tabcontent = document.getElementsByClassName("Subsbackground");
      for (let i=0; i<tabcontent.length; i++){
        if (i!=1){
          tabcontent[i].style.backgroundColor="#D3E0EE";
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
    subs_info=data.split(';');
    var tabcontent = document.getElementsByClassName("Subsbackground");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].innerHTML = "";
    } 
    for (let i=0; i<subs_info.length; i+=4){
      html_str1='';
      html_str1+="<div class='col-md-3 col-lg-3 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Распорядитель</p>";
      html_str1+="<p class='bodyItem'>"+subs_info[i]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-lg-5 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Получатель</p>";
      html_str1+="<p class='bodyItem'>"+subs_info[i+1]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-lg-2 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Сумма</p>";
      html_str1+="<p class='bodyItem'>"+subs_info[i+2]+"&#8381;</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-lg-2 col-6 mb-4'>";
      html_str1+="<p class='headItem h6'>Срок реализации</p>";
      html_str1+="<p class='bodyItem'>"+subs_info[i+3]+"</p>";
      html_str1+="</div>";
      var rowelem=document.getElementById('row'+i);
      rowelem.innerHTML = html_str1;
    }
  });
}

function toMenu(id, block){
  var elem=document.getElementById(id);
  elem.classList.add("col-md-6","col-xl-4");
  document.getElementById(id+'none').style.display="none";
  tabcontent = document.getElementsByClassName(block);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "block";  
  }
}