<?php include( 'loggedout.php'); ?>

<!DOCTYPE html>

<!--
The aLB Employee Center
Author: Angelo Carbonaro
Contact: Angeloc@alanguagebank.com
Updated: 1/28/2015
Copyright: 2015
-->

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="description" content="The aLB Employee Center">
  <meta name="keywords" content="aLanguageBank, Employee Center">
  <meta name="author" content="Angelo Carbonaro">
  <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
  <title>aLB Employee Policies</title>

  <script src="scripts/jquery-1.11.2.min.js"></script>
  <script src="scripts/employeemanual.js"></script>
  <script src="scripts/scroll.js"></script>

  <link type="text/css" href="css/employeeman-1.2.css" rel="stylesheet">
  <link type="text/css" href="css/misc-1.26.css" rel="stylesheet">
  <link type="text/css" href="css/cssreset-1.1.css" rel="stylesheet">
  <link rel="stylesheet" href="css/font-awesome-4.3.0/css/font-awesome.min.css">

</head>

<body>
  <div class='logcontrols'>
    <p class="loggedin">
      <?php echo 'You are logged in as '.$_SESSION[ 'firstname']. ' '.$_SESSION[ 'lastname']. '!' ?>
    </p>
    <br>
    <input type='button' class='manuallogout' value='Logout' onClick='logout()' />
  </div>

  <a class="home" title="Home" href="employeehq.php"><i class="fa fa-2x fa-inverse fa-home"></i></a>
  <img class="logo" src="images/alblogo.png" />

  <div title="Back to Top" class="scroll-top-wrapper">
    <span class="scroll-top-inner">
      <i class="fa fa-2x fa-arrow-circle-up"></i>
	</span>
  </div>

  <div id="Section1">
    <p class="numbered">All Content from this Page has been removed to protect my past employers propietary information</p>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

</body>

</html>
