function login_check(){
    let login=document.getElementById('InputLogin').value;
    let password=document.getElementById('InputPassword').value;
    function ajaxRequest(){
    return $.ajax({
        type:"GET",
        url:"/admin/login/check",
        data:{login, password}
        });
    };
    $admin=ajaxRequest();
    $admin
    .done(function(data){
        //document.location.href=data;
        html_str1="<a href='"+data+">переход</a>";
        var ele=document.createElement("div");
        body.appendChild(ele).innerHTML = html_str1;
    });
}