function OpenFederal(elmnt){
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

    federalmassive=data;

    var elem=document.getElementById(''+stringId[0]+'ID');
    elem.classList.remove("col-md-6","col-xl-4");
    var ele=document.createElement("div");
    ele.setAttribute("class",'row');
    ele.setAttribute("id",'row'+fp_id+'');
    elem.appendChild(ele).innerHTML = html_str1;

    tabcontent = document.getElementsByClassName("CN"+stringId[0]+"");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
      }
    var federalString=federalmassive[0].split('$');
    html_str1="";
    html_str1+="<div class='col-6'>";
    html_str1+="<div class='h3 font-weight-bold' id='name_nac_proj'>"+federalString[0]+"</div>";
    html_str1+="</div>";
    html_str1+="<div class='col-6'>";
    html_str1+="<div class='h3 font-weight-bold' id='name_nac_proj'>"+federalString[1]+"</div>";
    html_str1+="</div>";
    html_str1+="<div class='col-md-3 col-6'>";
    html_str1+="<p class='headItem h6'>Количество контрактов</p>";
    html_str1+="<p class='bodyItem'>"+federalString[2]+"</p>";
    html_str1+="</div>";
    html_str1+="<div class='col-md-3 col-6''>";
    html_str1+="<p class='headItem h6'>Сумма контрактов</p>";
    html_str1+="<p class='bodyItem'>"+federalString[3]+"</p>";
    html_str1+="</div>";
    html_str1+="<div class='col-md-3 col-6''>";
    html_str1+="<p class='headItem h6'>Количество субсидий</p>";
    html_str1+="<p class='bodyItem'>"+federalString[4]+"</p>";
    html_str1+="</div>";
    html_str1+="<div class='col-md-3 col-6'>";
    html_str1+="<p class='headItem h6'>Сумма субсидий</p>";
    html_str1+="<p class='bodyItem'>"+federalString[5]+"</p>";
    html_str1+="</div>";
    html_str1+="<div class='col-6 h3 font-weight-bold'>Субсидии</div>";
    html_str1+="<div class='col-6 d-flex justify-content-center'>";
    html_str1+="<form>";
    html_str1+="<span>года реализации</span>";
    html_str1+="<select id='year' class='form-control' name='year_name' onchange='getSubs(this)'>";
    html_str1+='<option value="2020">2020</option>';

    federalString=federalmassive[1].split('$');
    for (let i=0; i<federalString.length; i++){
      html_str1+='<option value="'+federalData[i]+'">'+federalData[i]+'</option>';
    }

    html_str1+="</select>";
    html_str1+="</form>";
    html_str1+="</div>";

    federalString=federalmassive[2].split('$');
    for (let i=0; i<federalString.length; i++){
      html_str1+="<div class='col-md-3 col-6''>";
      html_str1+="<p class='headItem h6'>Распорядитель</p>";
      html_str1+="<p class='bodyItem' id='"+fp_id+i+"'>"+federalString[i]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6''>";
      html_str1+="<p class='headItem h6'>Получатель</p>";
      html_str1+="<p class='bodyItem' id='"+fp_id+i+"'>"+federalString[i]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6''>";
      html_str1+="<p class='headItem h6'>Сумма</p>";
      html_str1+="<p class='bodyItem' id='"+fp_id+i+"'>"+federalString[i]+"</p>";
      html_str1+="</div>";
      html_str1+="<div class='col-md-3 col-6''>";
      html_str1+="<p class='headItem h6'>Срок реализации</p>";
      html_str1+="<p class='bodyItem' id='"+fp_id+i+"'>"+federalString[i]+"</p>";
      html_str1+="</div>";
    }; 
      html_str1+="<div class='col-12'><buttton class='btn btn-backtm' onclick='toMenu('"+stringId[0]+"ID', 'CN"+stringId[0]+"')'>назад</button></div>";
    var ele=document.createElement("div");
    ele.setAttribute("class",'col-12');
    ele.setAttribute("id",""+stringId[0]+"IDnone");
    elem.appendChild(ele).innerHTML = html_str1;

    $(window).scrollTop($(elem).offset().top);
    document.getElementById('ONav'+stringId[0]+'').style.background='linear-gradient(90deg, #7764CA 0%, #6474CA 100%)';
  }); 
}

function getSubs(elmnt){
  var n=document.getElementById(elmnt).options.selectedIndex;    
  var val = document.getElementById(elmnt).options[n].value;

  function ajaxRequest(){
    return $.ajax({
        type:"GET",
        url:"/db_fedwindow/year",
        data:{val}
        });
    }
  $subs=ajaxRequest();
  $subs
  .done(function(data){
    subs_info=data.split('$');
    for (let i=0; i<subs_info.length; i++){
      document.getElementById(fp_id+i).innerHTML=subs_info[i];
    }
  });
}

function toMenu(id, block){
  var elem=document.getElementById(id);
  elem.classList.add("col-md-6","col-xl-4");
  document.getElementById(id+'none').style.display=none;
  tabcontent = document.getElementsByClassName(block);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "block";  
  }
}