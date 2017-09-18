<?php
//allow us access to session info
include('functions.php');

//if acctype is not set relocate to login.php
if(!isset($_SESSION['acctype'])){
    header('Location: http://www.alanguagebank.com/employeecenter/login.php');
}
?>