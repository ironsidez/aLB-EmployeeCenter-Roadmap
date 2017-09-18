//ajax request to logout, sends to functions.php, buttontype tells functions what our request wants to be done.
function logout() {
    var postreq = new XMLHttpRequest();
    postreq.onreadystatechange = function () {
        if (postreq.readyState == 4) {
            if (postreq.status == 200 || window.location.href.indexOf("http") == -1) {
                location.reload();
            } else {
                alert("An error has occured making the request");
            }
        }
    }
    var buttontypeval = encodeURIComponent("logout");
    var parameters = "buttontype=" + buttontypeval;
    postreq.open("POST", "http://www.alanguagebank.com/employeecenter/functions.php", true);
    postreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    postreq.send(parameters);

}