//If enter key is pressed (keycode 13) click the login button
$(document).ready(function () {
  $(document).keypress(function (e) {
    if (e.keyCode == 13)
      $('.button-link').click();
  });
});

//validate our information before we proceed
function validate() {

  // Username validation
  var userName = document.getElementById("Username");

  //Check if username isn't blank
  if (userName.value.length === 0) {
    alert("Name field cannot be empty.");
    event.returnValue = false;
    return;
  }

  // Password validation
  var userPassword = document.getElementById("Password");

  // Check if password exists
  if (userPassword.value.length === 0) {
    alert("Password field cannot be empty.");
    event.returnValue = false;
    return;
  }

  //proceed with ajax login request
  ajaxGet();
}

//login request
function ajaxGet() {
  var postreq = new XMLHttpRequest();
  postreq.onreadystatechange = function () {
    if (postreq.readyState === 4) {
      if (postreq.status === 200 || window.location.href.indexOf("http") == -1) {
        var JSONObject = postreq.responseText;
        var obj = JSON.parse(JSONObject);
        
        //If error logging in, give corresponding message
        if (obj.login === 'a' || obj.login === 'b') {
          document.getElementById("result2").innerHTML = obj.error;
        //Otherwise logged in and redirect to employeeHQ
        } else {   
          window.location.replace("http://www.alanguagebank.com/employeecenter/employeehq.php");
        }
      } else {
        alert("An error has occured making the request");
      }
    }
  }
  
  //Post our info along with button of type login
  var buttontypeval = encodeURIComponent("login");
  var namevalue = encodeURIComponent(document.getElementById("Username").value);
  var passvalue = encodeURIComponent(document.getElementById("Password").value);
  var parameters = "buttontype=" + buttontypeval + "&name=" + namevalue + "&pass=" + passvalue;
  postreq.open("POST", "http://www.alanguagebank.com/employeecenter/functions.php", true);
  postreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  postreq.send(parameters);
}