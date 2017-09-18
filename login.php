<?php include( 'loggedin.php'); ?>

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
  <title>Login</title>

  <script src="scripts/jquery-1.11.2.min.js"></script>
  <script type="text/javascript" src="scripts/login.js"></script>

  <link rel="stylesheet" type="text/css" href="css/loginpage-1.1.css" />

</head>

<body>

  <div id="result">

    <form method="POST" enctype="text/plain">

      <h3>Login</h3>
      <label for="Username">Username</label>
      <p>
        <input type="text" id="Username" name="Username" size="25" />
      </p>
      <label for="Password">Password</label>
      <p>
        <input type="password" id="Password" name="Password" size="25" />
      </p>
      <input class="button-link" type="button" value="Submit" onClick="validate()" />
    </form>


    <div id="result2">

    </div>

  </div>

</body>

</html>