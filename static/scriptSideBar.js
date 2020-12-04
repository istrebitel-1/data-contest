function FederalProject(elmnt) {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById('federalList').innerHTML='';
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

      for (let i=0; i<nationsString.length; i++){
        var federalsData=nationsString[i].split('$');
        var parent_el = document.getElementById('federalList');
        html_str1="";
        html_str1+="<button type='submit' class='btn' onclick='OpenFederal(this)' id='"+federalsData[0]+"'>"+federalsData[1]+"</button>";
        var ele=document.createElement("div");
        ele.setAttribute("class",'col-12');
        parent_el.appendChild(ele).innerHTML = html_str1;
      }
    });
}
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}