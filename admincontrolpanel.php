<?php include('isadmin.php'); ?>

<!DOCTYPE html>

<!-- 
The aLB Employee Center
Author: Angelo Carbonaro
Contact: Angeloc@alanguagebank.com
Updated: 5/29/2015
Copyright: 2015
-->

<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="description" content="The aLB Employee Center" />
  <meta name="keywords" content="aLanguageBank, Employee Center" />
  <meta name="author" content="Angelo Carbonaro" />
  <meta content="images/alblogo.png" itemprop="image" />
  <title>aLB Employee Center</title>

  <script src="scripts/jquery-1.11.2.min.js"></script>
  <script src="scripts/admincontrolpanel.js"></script>
  <script src="scripts/scroll.js"></script>

  <link rel="stylesheet" type="text/css" href="css/employeehq-1.2.css" />
  <link rel="stylesheet" type="text/css" href="css/misc-1.26.css" />
  <link rel="stylesheet" type="text/css" href="css/cssreset-1.1.css" />
  <link rel="stylesheet" href="css/font-awesome-4.3.0/css/font-awesome.min.css">
  <link rel="icon" type="image/png" href="images/alblogo.png" />

</head>

<body>

  <div class='logcontrols'>
    <p class="loggedin">
    <?php
    echo 'You are logged in as '.$_SESSION['firstname'].' '.$_SESSION['lastname'].'!'
    ?>
    </p>
    <br>
    <input type='button' value='Logout' onClick='logout()' />
  </div>    
 
  <a class="home" title="Home" href="employeehq.php"><i class="fa fa-2x fa-inverse fa-home"></i></a>
  
  <div title="Back to Top" class="scroll-top-wrapper" style="visibility: hidden;">
    <span class="scroll-top-inner">
      <i class="fa fa-2x fa-arrow-circle-up"></i>
    </span>
  </div>

  <div>
    <img class="logo" src="images/alblogo.png" alt="aLB Logo" />
  </div>
  <br><br><br><br><br><br><br>
  <div id="register">

        <form method="POST" enctype="text/plain">

            <h3>Register new employee</h3>
            <label for="username">Username</label>
            <p>
                <input type="text" id="username" name="username" size="25" />
            </p>
            <label for="password">Password</label>
            <p>
                <input type="password" id="password" name="password" size="25" />
            </p>
            <label for="firstname">First Name</label>
            <p>
                <input type="text" id="firstname" name="firstname" size="25" />
            </p>
            <label for="lastname">Last Name</label>
            <p>
                <input type="text" id="lastname" name="lastname" size="25" />
            </p>
            <label for="email">Email</label>
            <p>
                <input type="text" id="email" name="email" size="25" />
            </p>
            <label for="accounttype">Account Type</label>
            <p>
                <input type="text" id="accounttype" name="accounttype" size="25" />
            </p>
            <input class="button-link" type="button" value="Submit" onClick="registeruser()" />
        </form>


        <div id="result2">

        </div>

    </div>
</body>

</html>