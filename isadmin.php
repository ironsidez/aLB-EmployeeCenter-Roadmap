<?php

//Allow access to session info
include('functions.php');

//If we don't have an account type we aren't logged in, relocate to login.php
if(isset($_SESSION['acctype']) == False){
    header('Location: http://www.alanguagebank.com/employeecenter/login.php');
}

//If not an admin relocate to employee hq page
if( $_SESSION['acctype'] != 'admin') {
    header('Location: http://www.alanguagebank.com/employeecenter/employeehq.php');
}

?>