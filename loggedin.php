<?php
//allow us access to session info
include('functions.php');

//If account type is set no need to login, because we already are, relocate to employee HQ
//Originally did this by checking if acctype was either employee or admin, not sure why
//if($_SESSION['acctype'] == 'employee' || $_SESSION['acctype'] == 'admin') {
if( isset($_SESSION['acctype'])) {
    header('Location: http://www.alanguagebank.com/employeecenter/employeehq.php');
}
?>