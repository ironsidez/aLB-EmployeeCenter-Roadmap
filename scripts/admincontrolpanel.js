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

///Ajax request to register a new user
function registeruser() {
    var postreq = new XMLHttpRequest();
    postreq.onreadystatechange = function () {
        if (postreq.readyState == 4) {
            if (postreq.status == 200 || window.location.href.indexOf("http") == -1) {
                document.getElementById("result2").innerHTML = postreq.responseText;
            } else {
                alert("An error has occured making the request");
            }
        }
    }
    
    //Get and store our new user info then post this to functions.php, buttontype tells functions what our request wants to be done.
    var buttontypeval = encodeURIComponent("addemployee");
    var usernamevalue = encodeURIComponent(document.getElementById("username").value);
    var passvalue = encodeURIComponent(document.getElementById("password").value);
    var firstnamevalue = encodeURIComponent(document.getElementById("firstname").value);
    var lastnamevalue = encodeURIComponent(document.getElementById("lastname").value);
    var emailvalue = encodeURIComponent(document.getElementById("email").value);
    var accounttypevalue = encodeURIComponent(document.getElementById("accounttype").value);
    var parameters = "buttontype=" + buttontypeval + "&name=" + usernamevalue + "&pass=" + passvalue + "&first_name=" + firstnamevalue + "&last_name=" + lastnamevalue + "&email=" + emailvalue + "&account_type=" + accounttypevalue;
    postreq.open("POST", "http://www.alanguagebank.com/employeecenter/functions.php", true);
    postreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    postreq.send(parameters);

}







