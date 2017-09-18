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

//ready function
$(document).ready(function () { 
   //get calendar icon contents for current date
    document.getElementById("Day").innerHTML = "<em> " + Date.today().toString("dddd") + "</em><strong> " + Date.today().toString("MMMM") + "</strong><span> " + Date.today().toString("dd") + "</span>";

//click event for yearly goals tab
$('a.yearly-goals').click(function() {

        $(this).toggleClass('showing-goals');
        $('.the-goals').toggleClass('goals-hidden');

        //return false to prevent default click event
        return false;

        //End click event
    });

//click event for yearly goals X
$('i.goals-closer').click(function() {

        $('a.yearly-goals').toggleClass('showing-goals');
        $('.the-goals').toggleClass('goals-hidden');

        //return false to prevent default click event
        return false;

        //End click event
    });
});