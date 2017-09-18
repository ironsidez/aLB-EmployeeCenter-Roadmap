/**
 *Ajax request to logout,
 *Sends to functions.php
 *Buttontype specifies request
 */
function logout() {
    var postreq = new XMLHttpRequest();
    postreq.onreadystatechange = function() {
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

//Returns the width of browser window.
function checkWidth() {
    var windowsize = $(window).width();
    return windowsize;
}

/*
 *When called and given json from google sheets, returns the JSON in a much easier to use format,
 *row 1 titles must match the gsx values.
 */
function organizeJson() {

    var projectCount = 0; //Counter to find out how many projects we have.
    var projectJson; //variable to hold our finish JSON

    // Set the global configs to synchronous. 
    $.ajaxSetup({
        async: false
    });

    //Sheets Url for projects.
    var JSONURL = 'https://spreadsheets.google.com/feeds/list/1MczO1YTq2FGCgaShFOwQUJfN0gRkafK_4ze6mXYB-iY/1/public/values?alt=json';

    //Retrieve our JSON.
    $.getJSON(JSONURL, function(data) {

        var cells = data.feed.entry; //Our data
        var obj = '{ "projects": ['; //Obj will store our organized JSON.

        //For each row in our sheet we organize the content.
        $(cells).each(function() {

            //Count our projects.
            projectCount++;

            obj +=
                ' { "project":' + JSON.stringify(this.gsx$project.$t) +
                ' , "title":' + JSON.stringify(this.gsx$title.$t) +
                ' , "description":' + JSON.stringify(this.gsx$description.$t) +
                ' , "department":' + JSON.stringify(this.gsx$department.$t) +
                ' , "turnaround":' + JSON.stringify(this.gsx$turnaround.$t) +
                ' , "active":' + JSON.stringify(this.gsx$active.$t) +
                ' , "startBy":' + JSON.stringify(this.gsx$startby.$t) +
                ' , "holdStart":' + JSON.stringify(this.gsx$holdstart.$t) +
                ' , "holdEnd":' + JSON.stringify(this.gsx$holdend.$t) +
                ' , "start":' + JSON.stringify(this.gsx$start.$t) +
                ' , "end":' + JSON.stringify(this.gsx$end.$t) +
                ' , "extensionDate":' + JSON.stringify(this.gsx$extensiondate.$t) +
                ' , "completionDate":' + JSON.stringify(this.gsx$completiondate.$t) +
                ' , "leader":' + JSON.stringify(this.gsx$leader.$t) +
                ' , "member1":' + JSON.stringify(this.gsx$member1.$t) +
                ' , "member2":' + JSON.stringify(this.gsx$member2.$t) +
                ' , "member3":' + JSON.stringify(this.gsx$member3.$t) +
                ' , "member4":' + JSON.stringify(this.gsx$member4.$t) +
                ' , "member5":' + JSON.stringify(this.gsx$member5.$t) +
                ' , "member6":' + JSON.stringify(this.gsx$member6.$t) +
                ' , "member7":' + JSON.stringify(this.gsx$member7.$t) + " }, ";
        });

        //Remove the extra space and comma at end.
        obj = obj.substring(0, obj.length - 2);

        //Close Obj
        obj += " ]}";

        //Parse JSON, put data in variable.
        projectJson = JSON.parse(obj);
    });

    // Set the global configs back to asynchronous. 
    $.ajaxSetup({
        async: true
    });

    // Return our finished JSON and Project Count.
    return {
        projectJson: projectJson,
        projectCount: projectCount
    };
}

function createProjectpanels(x, y) {

    var projectJson = x; //Json data
    var projectCount = y; //Amount of Projects.
    var counterPanels = 0; //Counter for panels examined for creation.
    var activePanels = 0; //Count for Panels created.
    var counterTabs = 0; //Counter for tabs examined for creation.
    var panelsperRow = 3; //Panels allowed in each row.
    var rows = 0; //How many rows of panels we created.
    var content = ""; //String of Html to be inserted on page.
    var mailTo = ""; //Strings that decide
    var mailCc = ""; //who will be
    var mailSubLead = ""; //mailed,
    var mailSubHelp = ""; //what the subjects,
    var mailLead = ""; //and mail content 
    var mailHelp = ""; //will be.

    //Create our project content based on projectCount
    while (counterPanels < projectCount) {
        if (projectJson.projects[counterPanels].active.toLowerCase() == "true") {

            //Build panels for each project.
            content += '<a class="projectTabs proj' + (counterPanels + 1) + ' opens" href="#"><p class="projectTitle">' + projectJson.projects[counterPanels].title + '</p>';

            //Check if there is a required start date, if so add it to panel.
            if (projectJson.projects[counterPanels].startBy) {
                content += '<p class="startBy">Must Start By: ' + projectJson.projects[counterPanels].startBy + '</p>';
            }

            //Close panels.
            content += '</a>';

            //Increment for each panel made.
            activePanels++;
        }

        //If the amount of panels we created are divisible by panels needed in a row, create the tabs for those panels.
        if ((activePanels) % panelsperRow === 0 || counterPanels + 1 === projectCount) {
            content += '<br>';
            rows++;

            //Make tabs until we are caught up to panels in count.
            while (counterTabs <= counterPanels) {

                if (projectJson.projects[counterTabs].active.toLowerCase() == "true") {

                    //Build content for our tabs.
                    content += '<div class = "projectTabs proj' + (counterTabs + 1) + ' projectInfoTabs hideTab"><p class = "projectName" >' + projectJson.projects[counterTabs].title + '</p><p class="projectDescription">' + projectJson.projects[counterTabs].description + '</p><div><p class="projectType">' + projectJson.projects[counterTabs].department + '</p><p class="projectLength">' + projectJson.projects[counterTabs].turnaround + ' weeks</p>';

                    //If there is a start date, add it.
                    if (projectJson.projects[counterTabs].startBy) {
                        content += '<p class="projectStart">Start by: ' + projectJson.projects[counterTabs].startBy + '</p>';
                    }

                    //Finish tabs.
                    content += '</div>';

                    //Fill out variables, like who to mail to and what the subject/ message should be.
                    mailTo = "Chrisc@alanguagebank.com";
                    mailCc = "Angeloc@alanguagebank.com";
                    mailSubLead = "I would like to lead a project!";
                    mailSubHelp = "I would like to help with a project!";
                    mailLead = "I would like to lead the project " + projectJson.projects[counterTabs].title + ".";
                    mailHelp = "I would like to help with the project " + projectJson.projects[counterTabs].title + ".";

                    //Add mail content/buttons.
                    content += '<a class="mailto';

                    //Check if the leader button should be usable or not.
                    if (projectJson.projects[counterTabs].leader) {
                        content += ' beinglead';
                    }

                    //More mail.
                    content += '" href="mailto:' + mailTo + '?cc=' + mailCc + '&subject=' + escape(mailSubLead) + '&body=' + escape(mailLead) + '">Lead</a><a class="mailto';

                    //Check if status is full, if so make help button unusable too.
                    if (projectJson.projects[counterTabs].full.toLowerCase() == "true") {
                        content += ' beinglead'
                    }

                    //Finish mail.
                    content += '" href="mailto:' + mailTo + '?cc=' + mailCc + '&subject=' + escape(mailSubHelp) + '&body=' + escape(mailHelp) + '">Help</a></div>';
                }

                //Increment for each tab made.
                counterTabs++;
            }

            //Add a line break after each tab.
            content += '<br>';
        }



        //Increment for each project attempted to create.
        counterPanels++;

    }

    //Add our finished project content to the page.
    $('div.collapsible-panels.projects').css('min-height', rows * 200 + 500 + 'px');
    $('div.collapsible-panels.projects').html(content);
}

function createProjectgantt(x, y) {

    var projectJson = x; //Json data
    var projectCount = y; //Amount of Projects.
    var counterProject = 0; //Count projects examined.
    var counterActive = 0; //Count projects active.
    var activeProjects = new Array(); //Store active projects.
    var activeMembers = new Array(); //Store active Members on projects.
    var i; //Counter for 'for' loop.
    var chartData = new Array(); //Data used to build chart.
    var chartStructure = new Array(); //Data for chart structure
    var structureCounter = 0;
    var latestDate;
    var earliestDate;

    //Find out which of our projects are active and who is working on them
    while (counterProject < projectCount) {

        //projects that have a start, end date, and leader(means the project has begun)
        if (projectJson.projects[counterProject].start && projectJson.projects[counterProject].end && projectJson.projects[counterProject].leader) {

            //Put active projects into seperate array to work with.
            activeProjects.push(projectJson.projects[counterProject]);

            //check if leader/member is listed in activeMember array, if not push them into the array.
            if (!contains(activeMembers, projectJson.projects[counterProject].leader)) {
                activeMembers.push(projectJson.projects[counterProject].leader);
            }

            for (i = 1; i < 7; i++) {
                var memberNumber = "member" + i;
                if (!contains(activeMembers, projectJson.projects[counterProject][memberNumber]) && projectJson.projects[counterProject][memberNumber]) {
                    activeMembers.push(projectJson.projects[counterProject][memberNumber]);
                }
            }
        }

        counterProject++;
    }
    
    
    /*
    if (activeProjects.length > 0) {
        chartData = [{
            "category": activeMembers[0],
            "segments": [{
                "start": Date.parse(x.projects[1].start).getISOWeek() - Date.january().first().monday().getISOWeek(),
                "duration": Date.parse(x.projects[1].end).getISOWeek() - Date.parse(x.projects[1].start).getISOWeek(),
                "color": "#7B742C",
                "task": "Task #1"
            }]
        }, {
        "category": "Project 2",
        "segments": [{
            "start": 10,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        }]
    }];


    }
    */
    /* chartData = [{
        "category": "Project 1",
        "segments": [{
            "start": Date.parse(x.projects[1].start).getISOWeek() - Date.january().first().monday().getISOWeek(),
            "duration": Date.parse(x.projects[1].end).getISOWeek() - Date.parse(x.projects[1].start).getISOWeek(),
            "color": "#7B742C",
            "task": "Task #1"
        }]
    }, {
        "category": "Project 2",
        "segments": [{
            "start": 10,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        }]
    }, {
        "category": "Project 3",
        "segments": [{
            "start": 12,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        }]
    }, {
        "category": "Project 4",
        "segments": [{
            "start": 9,
            "duration": 6,
            "color": "#7B742C",
            "task": "Task #1"
        }]
    }, {
        "category": "Project 5",
        "segments": [{
            "start": 8,
            "duration": 1,
            "color": "#CF794A",
            "task": "Task #3"
        }]
    }, {
        "category": "Project 6",
        "segments": [{
            "start": 15,
            "duration": 3,
            "color": "#7E585F",
            "task": "Task #2"
        }]
    }];
*/
    if (activeProjects.length > 0) {
        for (j = 0; j < activeMembers.length; j++) {
            chartData.push({});
            chartData[j].category = activeMembers[j];
            chartData[j].segments = [{}];
            chartData[j].segments[0].start = 15;
            chartData[j].segments[0].duration = 3;
            chartData[j].segments[0].color = "#7E585F";
            chartData[j].segments[0].task = "Task #2";
            chartData[j].segments.push({});
            chartData[j].segments[1].start = 18;
            chartData[j].segments[1].duration = 3;
            chartData[j].segments[1].color = "#CF794A";
            chartData[j].segments[1].task = "Task #2";
        }
    }

    for (j = 1; j <= activeProjects.length; j++) {
        chartStructure.push({});
        chartStructure[structureCounter].balloonText = "<b>[[category]]</b><br>starts at [[startTime" + j + "]]<br>ends at [[endTime" + j + "]]";
        chartStructure[structureCounter].colorField = "color" + j;
        chartStructure[structureCounter].fillAlphas = 0.8;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTime" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTime" + j;
        chartStructure[structureCounter].id = "AmGraph-" + j;
        structureCounter++;
    }

    for (j = 1; j <= activeProjects.length; j++) {
        chartStructure.push({});

        if (j == 1) {
            chartStructure[structureCounter].newStack = true
        }
        chartStructure[structureCounter].balloonText = "<b>[[category]]</b><br>starts at [[startTimeExt" + j + "]]<br>ends at [[endTimeExt" + j + "]]";
        chartStructure[structureCounter].colorField = "colorExt" + j;
        chartStructure[structureCounter].fillAlphas = 0.8;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTimeExt" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTimeExt" + j;
        chartStructure[structureCounter].id = "AmGraph-Ext" + j;
        structureCounter++;
    }

    /*
    [{
            "balloonText": "<b>[[category]]</b><br>starts at [[startTime]]<br>ends at [[endTime]]",
            "colorField": "color",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "openField": "startTime",
            "type": "column",
            "valueField": "endTime",
            "id": "AmGraph-1"
        }, {
            "balloonText": "<b>[[category]]</b><br>starts at [[startTime2]]<br>ends at [[endTime2]]",
            "colorField": "color2",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "openField": "startTime2",
            "type": "column",
            "valueField": "endTime2",
            "id": "AmGraph-3"
        }, {
            "balloonText": "<b>[[category]]</b><br>starts at [[startTimeExt]]<br>ends at [[endTimeExt]]",
            "colorField": "colorExt",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "newStack": true,
            "openField": "startTimeExt",
            "type": "column",
            "valueField": "endTimeExt",
            "id": "AmGraph-2"
        },

        {
            "balloonText": "<b>[[category]]</b><br>starts at [[startTime2Ext]]<br>ends at [[endTime2Ext]]",
            "colorField": "color2Ext",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "openField": "startTime2Ext",
            "type": "column",
            "valueField": "endTime2Ext",
            "id": "AmGraph-4"
        }
    ]

    /* chartData.push({
        "category": "Project 7",
        "segments": [ {
            "start": 15,
            "duration": 3,
            "color": "#7E585F",
            "task": "Task #2"
        }]}
        );*/
        //alert(activeProjects.length);
    //alert(JSON.stringify(chartStructure));
    //alert(JSON.stringify(chartData));
   //alert(activeMembers.toString());
    //Data.parse(x.projects[].start)
    //alert(Date.january().first().monday());
    //alert(Date.parse(x.projects[1].start).getISOWeek());

    AmCharts.useUTC = true;
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
       // "period": "WW",
        "dataDateFormat": "YYYY-MM-DD",
      //  "period": "WW",
      //  "dataDateFormat": "YYYY-MM-DD",
      //  "balloonDateFormat": "JJ:NN",
      //  "startDate": Date.january().first().monday(),
        "valueAxes": [{
            "minimumDate": Date.january().first().monday(),
    "type": "date",
    //"minPeriod": "WW",
    "period": "WW",
    "maximum": "2016-01-01"
        }],
        "dataProvider": [{
            "name": "Angelo",
            "startTime1": "2015-07-06",
            "endTime1": "2015-11-21",
            "color1": "#587CAF",
            "startTimeExt1": "2015-11-21",
            "endTimeExt1": "2015-11-21",
            "colorExt1": "#8F9194",
            "startTime2": "2015-07-06",
            "endTime2": "2015-11-14",
            "color2": "#A6C0E4",
            "startTimeExt2": "2015-11-14",
            "endTimeExt2": "2015-11-21",
            "colorExt2": "#8F9194",
            "startTime3": "",
            "endTime3": "",
            "color3": "",
            "startTimeExt3": "",
            "endTimeExt3": "",
            "colorExt3": "",
            "startTime4": "2015-07-20",
            "endTime4": "2015-09-07",
            "color4": "#587CAF",
            "startTimeExt4": "2015-09-07",
            "endTimeExt4": "2015-09-07",
            "colorExt4": "#8F9194",
            "startTime5": "",
            "endTime5": "",
            "color5": "",
            "startTimeExt5": "",
            "endTimeExt5": "",
            "colorExt5": "",
            "startTime6": "",
            "endTime6": "",
            "color6": "",
            "startTimeExt6": "",
            "endTimeExt6": "",
            "colorExt6": ""
        }, {
            "name": "Joe",
            "startTime": 10,
            "endTime": 13,
            "color": "#FF9E01",
            "startTime2": 8,
            "endTime2": 11,
            "color2": "#FF0F00",
            "startTime3": 8,
            "endTime3": 11,
            "color3": "#FF0F00"
        }, {
            "name": "Susan",
            "startTime": 11,
            "endTime": 18,
            "color": "#F8FF01",
            "startTime2": 8,
            "endTime2": 11,
            "color2": "#FF0F00",
            "startTime3": 8,
            "endTime3": 11,
            "color3": "#FF0F00"
        }, {
            "name": "Eaton",
            "startTime": 15,
            "endTime": 19,
            "color": "#04D215",
            "startTime2": 8,
            "endTime2": 11,
            "color2": "#FF0F00",
            "startTime3": 8,
            "endTime3": 11,
            "color3": "#FF0F00"
        }],
        "guides": [],
        "trendLines": [],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "startDuration": 1,
        "graphs": chartStructure,
        "rotate": true,
        //"columnWidth": 1,
        "categoryField": "name",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "position": "left"
        },
        "export": {
            "enabled": true
        }
    });
    
    alert(activeProjects.length);
    /*
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "gantt",
        "theme": "light",
        "marginRight": 70,
        "period": "WW",
        "dataDateFormat": "YYYY-MM-DD",
        "balloonDateFormat": "JJ:NN",
        "columnWidth": 0.5,
        "valueAxis": {
            "type": "date",
            "minimum": 0,
            "maximum": 52
        },
        "brightnessStep": 10,
        "graph": {
            "fillAlphas": 1,
            "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDate": Date.january().first().monday(),
        "startField": "start",
        "endField": "end",
        "durationField": "duration",
        "dataProvider": chartData
        /*[ {
        "category": "Project 1",
        "segments": [ {
            "start": Date.parse(x.projects[1].start).getISOWeek() - Date.january().first().monday().getISOWeek() ,
            "duration": 2,
            "color": "#7B742C",
            "task": "Task #1"
        } ]
    }, {
        "category": "Project 2",
        "segments": [ {
            "start": 10,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        } ]
    }, {
        "category": "Project 3",
        "segments": [ {
            "start": 12,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        } ]
    }, {
        "category": "Project 4",
        "segments": [ {
            "start": 9,
            "duration": 6,
            "color": "#7B742C",
            "task": "Task #1"
        } ]
    }, {
        "category": "Project 5",
        "segments": [ {
            "start": 8,
            "duration": 1,
            "color": "#CF794A",
            "task": "Task #3"
        } ]
    }, {
        "category": "Project 6",
        "segments": [ {
            "start": 15,
            "duration": 3,
            "color": "#7E585F",
            "task": "Task #2"
        } ]
    } ]*/
    /*
        ,
        //"chartScrollbar": {},
        "chartCursor": {
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0.1,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "fullWidth": true
        },
        "export": {
            "enabled": true
        }
    });
*/
}

function addClicks() {
    /**
     *CODE TO MAKE COLLAPSIBLE PANELS WORK ON CLICK
     */

    //Hide all div containers.
    $('div.collapsible-panels div').css('display', 'inline-block');
    $('div.collapsible-panels div.hideTab').hide();

    //Append click event to the a element.
    $('div.collapsible-panels a.opens').click(function() {

        //Declare our variables
        var clickedButton = $(this); //jquery object for the clicked button

        var collapsibleGroupClass = "." + clickedButton.attr('class').split(' ')[0]; //Class identifier for the clickedbutton's group of buttons and tabs
        var collapsibleTargetClass = "." + clickedButton.attr('class').split(' ')[1]; //Class identifier for the clickedbutton's tab identifier

        var targetTab = $("div.collapsible-panels div" + collapsibleGroupClass + collapsibleTargetClass); //Jquery object for targetted Tab

        var tabbedButton = $("div.collapsible-panels a.tabbed" + collapsibleGroupClass); //Jquery object for tabbed button
        var openTab = $("div.collapsible-panels div.open" + collapsibleGroupClass); //Jquery object for opened tab
        var openTargetTab = $("div.collapsible-panels div" + collapsibleGroupClass + collapsibleTargetClass + ".open"); //Jquery object for open targetted tab

        /**
         *Stop all previous animations
         *clear queue of animations
         *end immediately because new
         *animation is coming!
         */
        $('div.collapsible-panels div').stop(true, true);

        //If the no tab or only the target tab is open.
        if (openTab.length == 0 || openTargetTab.length != 0) {

            //Toggle clicked button to tabbed.
            clickedButton.toggleClass('tabbed');

            //Toggle selected tab and open status.
            targetTab.first().slideToggle(100).toggleClass('open');

            //Else (tab besides our target tab are open)
        } else {

            //Toggle tabbed buttons off.
            tabbedButton.toggleClass('tabbed');

            //Toggle clicked button to tabbed.
            clickedButton.toggleClass('tabbed');

            /**
             *Originally chose closing animation with callback,
             *however this has issues with fast and repeated clicks.
             *Tried other options and didn't like how they worked.
             *Decided upon instantly hide closing tabs and speeding
             *up all opening animations.
             */

            //Hide open tabs and remove open class. 
            openTab.hide().toggleClass('open');

            //Toggle target tab and open status
            targetTab.first().slideToggle(100).toggleClass('open');

            //End if/else statement
        }

        //return false to prevent default click event
        return false;

        //End click event
    });
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/*
AmCharts.ready(function() {
AmCharts.useUTC = true;
var chart = AmCharts.makeChart( "chartdiv", {
    "type": "gantt",
    "theme": "light",
    "marginRight": 70,
    "period": "hh",
    "dataDateFormat":"YYYY-MM-DD",
    "balloonDateFormat": "JJ:NN",
    "columnWidth": 0.5,
    "valueAxis": {
        "type": "date",
        "minimum": 7,
        "maximum": 31
    },
    "brightnessStep": 10,
    "graph": {
        "fillAlphas": 1,
        "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
    },
    "rotate": true,
    "categoryField": "category",
    "segmentsField": "segments",
    "colorField": "color",
    "startDate": "2015-01-01",
    "startField": "start",
    "endField": "end",
    "durationField": "duration",
    "dataProvider": [ {
        "category": "Project 1",
        "segments": [ {
            "start": 7,
            "duration": 2,
            "color": "#7B742C",
            "task": "Task #1"
        } ]
    }, {
        "category": "Project 2",
        "segments": [ {
            "start": 10,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        } ]
    }, {
        "category": "Project 3",
        "segments": [ {
            "start": 12,
            "duration": 2,
            "color": "#7E585F",
            "task": "Task #2"
        } ]
    }, {
        "category": "Project 4",
        "segments": [ {
            "start": 9,
            "duration": 6,
            "color": "#7B742C",
            "task": "Task #1"
        } ]
    }, {
        "category": "Project 5",
        "segments": [ {
            "start": 8,
            "duration": 1,
            "color": "#CF794A",
            "task": "Task #3"
        } ]
    }, {
        "category": "Project 6",
        "segments": [ {
            "start": 15,
            "duration": 3,
            "color": "#7E585F",
            "task": "Task #2"
        } ]
    } ],
    "chartScrollbar": {},
    "chartCursor": {
        "valueBalloonsEnabled": false,
        "cursorAlpha": 0.1,
        "valueLineBalloonEnabled": true,
        "valueLineEnabled": true,
        "fullWidth": true
    },
    "export": {
        "enabled": true
     }
} );
});
*/


$(document).ready(function() {

    //checkWidth();

    /**
     *Organize Json, which then builds our project panel content,
     *and adds appropriate click events GetJSON is asynchronous,
     *so I have each function call each other to prevent click events
     *getting added before building content. Order is organizeJson(),
     *createProjectpanels(), addClicks().
     **/


    var jsonData = organizeJson();


    createProjectpanels(jsonData.projectJson, jsonData.projectCount);
    createProjectgantt(jsonData.projectJson, jsonData.projectCount);

    //Add click events to everything after content is added
    addClicks();

    //End self-initiating function
});