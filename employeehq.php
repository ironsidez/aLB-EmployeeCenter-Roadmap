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
   <meta charset="UTF-8" />
   <meta name="description" content="The aLB Employee Center" />
   <meta name="keywords" content="aLanguageBank, Employee Center" />
   <meta name="author" content="Angelo Carbonaro" />
   <meta content="images/alblogo.png" itemprop="image" />
   <title>aLB Employee Center</title>
   <script src="scripts/jquery-1.11.2.min.js"></script>
   <script src="scripts/employeehq.js"></script>
   <script src="scripts/scroll.js"></script>
   <script src="scripts/date.js"></script>
   <link rel="stylesheet" type="text/css" href="css/employeehq-1.2.css" />
   <link rel="stylesheet" type="text/css" href="css/misc-1.26.css" />
   <link rel="stylesheet" type="text/css" href="css/cssreset-1.1.css" />
   <link rel="stylesheet" href="css/font-awesome-4.3.0/css/font-awesome.min.css">
   <meta name="viewport" content="width=device-width, initial-scale=.6, user-scalable=no">
   <link rel="icon" type="image/png" href="images/alblogo.png" />
</head>

<body>
   <div class='logcontrols'>
      <p class="loggedin">
         <?php echo 'You are logged in as '.$_SESSION[ 'firstname']. ' '.$_SESSION[ 'lastname']. '!'; if( $_SESSION[ 'acctype']=='admin' ) { echo '</p><br><p class="loggedin"><a href="http://www.alanguagebank.com/employeecenter/admincontrolpanel.php">Go to Admin Control Panel</a> '; } ?>

      </p>
      <br>
      <input type='button' value='Logout' onClick='logout()' />
   </div>

   <div title="Back to Top" class="scroll-top-wrapper" style="visibility: hidden;">
      <span class="scroll-top-inner">
        <i class="fa fa-2x fa-arrow-circle-up"></i>
      </span>
   </div>
   <a title="Yearly Goals" class="yearly-goals" href="#">
      <div class="goals-inner">2016 Goals</div>
   </a>
   <div title="The Goals" class="the-goals goals-hidden">
      <br>
      <p>Our 2016 Goals!</p>
      <i class="goals-closer fa fa-times"></i>
      <div class="goal-info-wrapper">
         <h1>Sales</h1>
         <p>(1) Monthly Marketing check-in</p>
         <p>(1) Monthly Event</p>
         <p>(1) Quarterly Innovation meeting (and follow-up)</p>
         <p>Quarterly CRM calls (key clients)</p>
         <br>
         <h1>Margins</h1>
         <table>
            <th></th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
            <th>EOY</th>
            <tr>
               <td>Translation</td>
               <td>57</td>
               <td>57</td>
               <td>58</td>
               <td>58</td>
               <td>57.5</td>
            </tr>
            <tr>
               <td>Interpretation</td>
               <td>28</td>
               <td>28</td>
               <td>29</td>
               <td>29</td>
               <td>28.5</td>
            </tr>
            <tr>
               <td>Transcription</td>
               <td>55</td>
               <td>55</td>
               <td>55</td>
               <td>55</td>
               <td>55</td>
            </tr>
            <tr>
               <td>Media</td>
               <td>70</td>
               <td>70</td>
               <td>70</td>
               <td>70</td>
               <td>70</td>
            </tr>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
            </tr>
            <tr class="table-bold">
               <td>OVERALL</td>
               <td>46</td>
               <td>47</td>
               <td>49</td>
               <td>50</td>
               <td>48</td>
            </tr>
         </table>
      </div>
   </div>
   <div>
      <img class="logo" src="images/alblogo.png" alt="aLB Logo" />
      <p class="CompanyQuote">"We connect brands with their global customers by developing engaging in-language content"</p>

      <p class="Title">aLanguageBank</p>
      <p class="Title">EMPLOYEE CENTER</p>
      <div class="toplinks">
         <div class="calendar">
            <time class="icon">
               <a target="_blank" href="http://www.keepandshare.com/calendar/show.php?i=2220134&vw=month">
                  <div id="Day"></div>
               </a>
            </time>
            <a class="link" target="_blank" href="http://www.keepandshare.com/calendar/show.php?i=2220134&vw=month">View aLB Calendar</a>
         </div>
         <div class="conference">
            <p>Conference
               <br>Room
               <br>Bookings
               <br>(view only)
            </p>
            <rooms>
               <a target="_blank" href="https://www.google.com/calendar/embed?src=6iop3ok0g7m28ju81hohit8ing@group.calendar.google.com">Large Front</a>
               <a target="_blank" href="https://www.google.com/calendar/embed?src=38ojrfktrkita574dndk7rmaig@group.calendar.google.com">Small Front</a>
               <a target="_blank" href="https://www.google.com/calendar/embed?src=dho0th8dpnk7kiqlmc3m1jejtg%40group.calendar.google.com">Back Room</a>
            </rooms>
         </div>
         <div class="button-link">
            <a href="employeemanual.php">Employee Manual</a>
            <a target="_blank" href="dokuwiki/doku.php">Wiki</a>
         </div>
         <div class="button-link2ndrow">
            <a target="_blank" href="http://moodle.alanguagebank.com/login/index.php">Moodle Login</a>
            <a href="roadmap.php">Road Map</a>
         </div>

      </div>
      <p class="copyright">
         The aLB Employee Center and all of its contents are CONFIDENTIAL and PROTECTED.
      </p>
      <p class="copyrightfp">
         (While some standard legal or compliance language has been copied, all other content is original and proprietary. Copyrighted &copy;2015.)
      </p>
   </div>
</body>

</html>