function FederalProject(elmnt) {
  var np_id=elmnt.id;
  function ajaxRequest(){
    return $.ajax({
        type:"GET",
        url:"/db_fedList",
        data:{np_id}
        });
    }
    $federals=ajaxRequest();
    $federals
    .done(function(data){
      var federalsData = JSON.parse(data);
      if(document.getElementsByClassName("CN"+np_id+"")[0]==null){
        for (let i=0; i<federalsData.length; i++){
          parent_el = document.getElementById('ONav'+np_id+'');
          html_str1="";
          html_str1+="<button type='submit' class='btn btn-fedlist font-weight-bold' onclick='OpenFederal(this)' id='"+np_id+";"+federalsData[i][1]+"'>"+federalsData[i][0]+"</button>";
          var ele=document.createElement("div");
          ele.setAttribute("class",'col-12 CN'+np_id+'');
          parent_el.appendChild(ele).innerHTML = html_str1;

          if (i==federalsData.length-1){
            parent_el = document.getElementById('ONav'+np_id+'');
            html_str1="";
            html_str1+="<button type='submit' class='btn btn-fedback font-weight-bold' onclick='FederalBack(this)' id='"+np_id+"'>назад</button>";
            var ele=document.createElement("div");
            ele.setAttribute("class",'col-12 CN'+np_id+'');
            parent_el.appendChild(ele).innerHTML = html_str1;
          }

        }
    }else{
      tabcontent = document.getElementsByClassName("CN"+np_id+"");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "block";
    }
    }
      tabcontent = document.getElementsByClassName("ON"+np_id+"");
      for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      }
      document.getElementById('ONav'+np_id+'').style.background='linear-gradient(90deg, #7764CA 0%, #6474CA 100%);';
    });
}
function FederalBack(elmnt) {
  var np_id=elmnt.id;

  tabcontent = document.getElementsByClassName("CN"+np_id+"");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  tabcontent = document.getElementsByClassName("ON"+np_id+"");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "block";
    }
    document.getElementById('ONav'+np_id+'').style.background='linear-gradient(90deg, #7764CA 0%, #6474CA 100%)';  
}