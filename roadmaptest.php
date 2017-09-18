<?php include( 'loggedout.php'); ?>
<!DOCTYPE html>
<!--
The aLB Employee Center
Author: Angelo Carbonaro
Contact: Angeloc@alanguagebank.com
Updated: 1/13/2016
Copyright: 2016
-->
<html lang="en">

<head>
   <meta charset="UTF-8" />
   <meta name="description" content="The aLB Employee Center" />
   <meta name="keywords" content="aLanguageBank, Employee Center" />
   <meta name="author" content="Angelo Carbonaro" />
   <meta content="images/alblogo.png" itemprop="image" />
   <meta name="viewport" content=" user-scalable=no">

   <title>aLB Employee Center</title>

   <script src="scripts/jquery-1.11.2.min.js"></script>
   <script src="scripts/roadmaptest8.js" async></script>
   <script src="scripts/scroll.js" async></script>
   <script src="scripts/amcharts.js"></script>
   <script src="scripts/serial.js"></script>
   <script src="scripts/light.js"></script>
   <script src="scripts/gantt.js"></script>
   <script src="scripts/date.js"></script>

   <link rel="stylesheet" type="text/css" href="css/roadmap-1.0.css" />
   <link rel="stylesheet" type="text/css" href="css/misc-1.26.css" />
   <link rel="stylesheet" type="text/css" href="css/cssreset-1.1.css" />
   <link rel="stylesheet" href="css/font-awesome-4.3.0/css/font-awesome.min.css">
   <link rel="icon" type="image/png" href="images/alblogo.png" />
</head>

<body>
   <div class='logcontrols'>
      <p class="loggedin">
         <?php echo 'You are logged in as '.$_SESSION[ 'firstname']. ' '.$_SESSION[ 'lastname']. '!' ?>
      </p>
      <br>
      <input type='button' value='Logout' onClick='logout()' />
      <br>
      <a class="home" title="Home" href="employeehq.php"><i class="fa fa-2x fa-inverse fa-home"></i></a>
   </div>

   <div title="Back to Top" class="scroll-top-wrapper">
      <span class="scroll-top-inner">
        <i class="fa fa-2x fa-arrow-circle-up"></i>
      </span>
   </div>
   <div>
      <img class="logo" src="images/alblogo.png" alt="aLB Logo" />
   </div>
   <div class="title">
      <p>Road Map</p>
   </div>
   <div class="collapsible-panels tabs">
      <a class="whyTabs ylead opens" href="#">Why Should I Lead?</a>
      <a class="whyTabs yhelp opens" href="#">Why Should I Help?</a>
      <br>
      <div class="whyTabs ylead yanswer hideTab">
         <p>If you lead a project you can...</p>
         <br>
         <ul>
            <li>Show management what you can do.</li>
            <li>Make decisions.</li>
            <li>Add to your resume.</li>
            <li>*Earn money or time off.*</li>
         </ul>
         <br>
         <p class="smallfont">*eligible for Tasks with 6+ week turnarounds</p>
      </div>
      <div class="whyTabs yhelp yanswer hideTab">
         <p>If you help with a project you can...</p>
         <br>
         <ul>
            <li>Show management what you can do.</li>
            <li>Learn something new.</li>
            <li>Help make decisions.</li>
            <li>Add to your resume.</li>
         </ul>
      </div>
   </div>

   <div id="colorkey">
      <p class="sectiontitle">Projects in Progress</p>
      <span>Leader</span>
      <a class="dbluebox"></a>
      <span>Helper</span>
      <a class="lbluebox"></a>
      <span>Deadline Extended</span>
      <a class="greybox"></a>
      <span>On Hold</span>
      <a class="yellowbox"></a>
      <span>Overdue</span>
      <a class="redbox"></a>
   </div>

   <div id="chartdiv"></div>

   <select class="projectCount" name="forma" onchange="update();">
      <option value=5>5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="15">20</option>
      <option value="15">25</option>
   </select>

   <div class="arrows">
      <a class="doubleLeft" href=#>
         <i class="fa fa-angle-double-left"></i>
      </a>
      <a class="Left" href=#>
         <i class="fa fa-angle-left"></i>
      </a>
      <span></span>
      <a class="Right" href=#>
         <i class="fa fa-angle-right"></i>
      </a>
      <a class="doubleRight" href=#>
         <i class="fa fa-angle-double-right"></i>
      </a>


   </div>

   <input type=checkbox name="employees" value="Angelo" onclick="update();" checked>Angelo
   <input type=checkbox name="employees" value="Chris" onclick="update();" checked>Chris
   <input type=checkbox name="employees" value="Matt" onclick="update();" checked>Matt
   <input type=checkbox name="employees" value="Karim" onclick="update();" checked>Karim
   <input type=checkbox name="employees" value="Andrew" onclick="update();" checked>Andrew
   <input type=checkbox name="employees" value="Yeojin" onclick="update();" checked>Yeojin
   <input type=checkbox name="oldEmployees" onclick="update();">Include Former Employees

   <div class="collapsible-panels projects"></div>
</body>

</html>