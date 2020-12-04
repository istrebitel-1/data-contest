function FederalProject(elmnt) {
  
  if (document.body.clientWidth>=768) {
    var sidesize=document.getElementsByClassName("card")[0].clientWidth;
    document.getElementById("mySidenav").style.width = ''+sidesize*2+'px';
    var sidesize=$(".card").offset().top;
    document.getElementById("mySidenav").style.top=''+sidesize+'px';
  } else {
    document.getElementById("mySidenav").style.width = ''+document.body.clientWidth+'px';
    document.getElementById("mySidenav").style.top=0;
  }
  var sidesize=document.getElementsByClassName("card")[0].clientHeight;
  document.getElementById("mySidenav").style.height=''+sidesize+'px';

}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}