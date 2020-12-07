function FederalProject(elmnt) {
  var tempid=elmnt.id;
  function ajaxRequest(){
    return $.ajax({
        type:"GET",
        url:"/db_fedList",
        data:{tempid}
        });
    }
    $federals=ajaxRequest();
    $federals
    .done(function(data){
      federalsString=data.split(';');

      for (let i=0; i<federalsString.length; i++){
        var federalsData=federalsString[i].split('$');
        parent_el = document.getElementById('ONav'+tempid+'');
        html_str1="";
        html_str1+="<button type='submit' class='btn btn-fedlist font-weight-bold' onclick='OpenFederal(this)' id='"+tempid+";"+federalsData[1]+"'>"+federalsData[0]+"</button>";
        var ele=document.createElement("div");
        ele.setAttribute("class",'col-12 CN'+tempid+'');
        parent_el.appendChild(ele).innerHTML = html_str1;

        if (i==federalsString.length-1){
          html_str1="";
          html_str1+="<button type='submit' class='btn btn-fedback font-weight-bold' onclick='FederalBack(this)' id='"+tempid+"'>назад</button>";
          var ele=document.createElement("div");
          ele.setAttribute("class",'col-12 CN'+tempid+'');
          parent_el.appendChild(ele).innerHTML = html_str1;
        }

      }
      tabcontent = document.getElementsByClassName("ON"+tempid+"");
      for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      }
      document.getElementById('ONav'+tempid+'').style.background='linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)';
    });
}
function FederalBack(elmnt) {
  var tempid=elmnt.id;

  tabcontent = document.getElementsByClassName("CN"+tempid+"");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  tabcontent = document.getElementsByClassName("ON"+tempid+"");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "block";
    }
    document.getElementById('ONav'+tempid+'').style.background='linear-gradient(90deg, #7764CA 0%, #6474CA 100%)';  
}