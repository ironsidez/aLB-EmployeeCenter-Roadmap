<?php

//need to start our session first, of course
session_start(); 

$login       = 'login';
$logout      = 'logout';
$sesh        = 'session';
$addemployee = 'addemployee';

// Database Information
$DB_HOST = 'prd.db.alanguagebank.com';
$DB_USER = 'alb_ec_admin';
$DB_PASS = 'AC8629ac';
$DB_NAME = 'alb_employee_center';

//If our buttontype is login, we login
if ($_POST['buttontype'] == $login) {
    
    //Connect to DB
    $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    
    // Check connection
    if ($mysqli->connect_errno) {
        echo "<p>MySQL error no {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
        exit();
    }
    
    //Get username and Password, then prepare for DB
    $username = $_POST['name'];
    $password = $_POST['pass'];
    $username = stripslashes($username);
    $password = stripslashes($password);
    $username = $mysqli->real_escape_string($username);
    $password = $mysqli->real_escape_string($password);
    
    //Select from DB where username and password match
    $sql = "SELECT * from users WHERE username='$username' AND password='$password' LIMIT 1";
    
    //Store result in variable $result
    $result = $mysqli->query($sql);
    
    //Get our accounttype for that username (admin or employee)
    $sql = "SELECT account_type from users WHERE username='$username'";
    
    //store result in variable $atype
    $atype = $mysqli->query($sql);
    $atype = mysqli_fetch_assoc($atype);
    
    //If our results from user/pass combination didn't return 1 exact match
    if ($result->num_rows != 1) {
        
        //set a var $results to 'a' for first possible outcome (username incorrect)
        $results = 'a';
        
        //Check if username is in database
        $sql    = "SELECT * from users WHERE username='$username'";
        $result = $mysqli->query($sql);
        
        //If it does return one result, name is in DB and therefore password must be incorrect
        if ($result->num_rows == 1) {
            
            //Set var $results to 'b' instead for (incorrect password)
            $results = 'b';
        }
        
    //else user/pass is correct 
    //If admin account $results is 'd' for admin loggin
    //Else 'c' for regular log in
    } else if ($atype[account_type] === 'admin') {
        $results = 'd';
    } else {
        $results = 'c';
    }
    
    //Get our info for the current user
    $sql    = "SELECT * from users WHERE username='$username'";
    $result = $mysqli->query($sql);
    $result = mysqli_fetch_assoc($result);
    
    //If $results was 'a' user is invalid
    if ($results === 'a') {
        $error = "the username " . $user . " is invalid.";
        
        $string = '{"login" : "a","error" : "' . $error . '"}';
        echo $string;
        exit();
    }
    
    //If $results was 'b' pass is invalid
    else if ($results === 'b') {
        $error  = 'Your password is incorrect';
        $string = '{"login" : "b","error": "' . $error . '"}';
        echo $string;
        exit();
    }
    
    //If $results was 'c' user is a regular employee, so set session info accordingly
    else if ($results === 'c') {
        $_SESSION['username']  = $_POST['name'];
        $_SESSION['acctype']   = 'employee';
        $_SESSION['firstname'] = $result[first_name];
        $_SESSION['lastname']  = $result[last_name];
        $_SESSION['email']     = $result[email];
        $string                = '{"login" : "c"}';
        echo $string;
        
    //If $results was 'd' user is an admin, so set session info accordingly
    } else {
        $_SESSION['username']  = $_POST['name'];
        $_SESSION['acctype']   = 'admin';
        $_SESSION['firstname'] = $result[first_name];
        $_SESSION['lastname']  = $result[last_name];
        $_SESSION['email']     = $result[email];
        $string                = '{"login" : "d"}';
        echo $string;
    }
}

//If buttontype is equal to logout, unset session values and destroy session
if ($_POST['buttontype'] == $logout) {
    session_unset();
    session_destroy();
    exit();
}

//admin control panel can add new employees without going to DB
if ($_POST['buttontype'] == $addemployee) {
    
    $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
  
    //Check connection
    if ($mysqli->connect_errno) {
        echo "<p>MySQL error no {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
        $mysqli->close();
        exit();
    }
    
    //Get new employee information, then prepare for DB
    $acctype   = $_POST['account_type'];
    $username  = $_POST['name'];
    $password  = $_POST['pass'];
    $firstname = $_POST['first_name'];
    $lastname  = $_POST['last_name'];
    $email     = $_POST['email'];
    
    $acctype   = stripslashes($acctype);
    $username  = stripslashes($username);
    $password  = stripslashes($password);
    $firstname = stripslashes($firstname);
    $lastname  = stripslashes($lastname);
    $email     = stripslashes($email);
    
    $acctype   = $mysqli->real_escape_string($acctype);
    $username  = $mysqli->real_escape_string($username);
    $password  = $mysqli->real_escape_string($password);
    $firstname = $mysqli->real_escape_string($firstname);
    $lastname  = $mysqli->real_escape_string($lastname);
    $email     = $mysqli->real_escape_string($email);
    
    //Check if email or username is in use
    $sql    = "SELECT * from users WHERE email='$email' OR username='$username'";
    $result = $mysqli->query($sql);
    if ($result->num_rows != 0) {
        echo "Username or email already in use!";
      
    //if not insert that information into database
    } else {
        $sql = "INSERT  INTO users (id, account_type, username, password, first_name, last_name, email) 
    VALUES (NULL, '{$acctype}', '{$username}', '{$password}', '{$firstname}', '{$lastname}', '{$email}')";
        
        if ($mysqli->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $mysqli->error;
        }
        $mysqli->close();
    }
    exit();
}
?>