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
    var projectJson; //variable to hold our finished JSON

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

/*
 *When called and given json from google sheets, returns the JSON in a much easier to use format,
 *row 1 titles must match the gsx values.
 */
function employeeJson() {

    var employeeCount = 0; //Counter for amount of current employees in chart
    var employeeJson; //variable for current employee JSON data
    var oldEmployeeCount = 0; //Counter for amount of past employees in chart
    var oldEmployeeJson; //variable for past employee JSON data

    // Set the global configs to synchronous. 
    $.ajaxSetup({
        async: false
    });

    //Sheets Url for projects.
    var JSONURL = 'https://spreadsheets.google.com/feeds/list/1MczO1YTq2FGCgaShFOwQUJfN0gRkafK_4ze6mXYB-iY/2/public/values?alt=json';

    //Retrieve our JSON.
    $.getJSON(JSONURL, function(data) {

        var cells = data.feed.entry; //Our data

        var obj = '{ "employees": ['; //Obj will store our organized JSON.

        //For each row in our sheet we organize the content.
        $(cells).each(function() {

            if (this.gsx$employees.$t.length != 0) {
                //Count our employees.
                employeeCount++;

                obj += JSON.stringify(this.gsx$employees.$t) + ", ";
            }
        });

        //Remove the extra space and comma at end.
        obj = obj.substring(0, obj.length - 2);

        //Close Obj
        obj += " ]}";

        //Parse JSON, put data in variable.
        employeeJson = JSON.parse(obj);

        var obj = '{ "past_employees": ['; //Obj will store our organized JSON.

        $(cells).each(function() {
            if (this.gsx$pastemployees.$t.length != 0) {
                //Count our past employees.
                oldEmployeeCount++;

                obj += JSON.stringify(this.gsx$pastemployees.$t) + ", ";
            }
        });

        //Remove the extra space and comma at end.
        obj = obj.substring(0, obj.length - 2);

        //Close Obj
        obj += " ]}";

        //Parse JSON, put data in variable.
        oldEmployeeJson = JSON.parse(obj);

    });

    // Set the global configs back to asynchronous. 
    $.ajaxSetup({
        async: true
    });

    // Return our finished JSON and Project Count.
    return {
        employeeJson: employeeJson,
        employeeCount: employeeCount,
        oldEmployeeJson: oldEmployeeJson,
        oldEmployeeCount: oldEmployeeCount
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

                    /*  //Check if status is full, if so make help button unusable too.
                 if (projectJson.projects[counterTabs].full.toLowerCase() == "true") {
                    content += ' beinglead'
                 }*/

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
    var endDate = 0; //Latest end date
    var startDate = 0; //Earliest start date
    var dateVar = 0; //placeholder variable for 
    var activeProjects = new Array(); //Store active projects.
    var activeMembers = new Array(); //Store active Members on projects.
    var shownMembers = new Array(); //Array for members currently supposed to be displayed.
    var chartData = new Array(); //Data used to build chart.
    var chartStructure = new Array(); //Data for chart structure.
    var endDateArray = new Array(); //End dates for active projects
    var i; //Counter for 'for' loop.
    var structureCounter = 0;
    var teamMembers = ""; //Project team members in string format for balloontext.
    var overdueStart = ""; //String representing start of overdue for balloontext.
    var overdueEnd = ""; //String representing end of overdue for balloontext.
    var displayedProj = 0; //Int var to check if a project as any members that are displayed.
    var chartDivHeight = 0;

    //get shownMembers
    shownMembers = employeesShown();

    //Find out which of our projects are active, who is working on them, and earliest project start and end dates.
    while (counterProject < projectCount) {
        displayedProj = 0;

        //If a project has a start and end date it has begun.
        if (projectJson.projects[counterProject].start && projectJson.projects[counterProject].end) {

            if (contains(shownMembers, projectJson.projects[counterProject].leader)) {
                displayedProj = 1;

                //check if leader is listed in activeMember array, if not push them into the array.
                if (!contains(activeMembers, projectJson.projects[counterProject].leader) && projectJson.projects[counterProject].leader) {
                    activeMembers.push(projectJson.projects[counterProject].leader);
                }
            }

            //check if member is listed in activeMember array, if not push them into the array.
            for (i = 1; i < 7; i++) {
                var memberNumber = "member" + i;
                if (contains(shownMembers, projectJson.projects[counterProject][memberNumber])) {
                    displayedProj = 1;
                    if (!contains(activeMembers, projectJson.projects[counterProject][memberNumber]) && projectJson.projects[counterProject][memberNumber]) {
                        activeMembers.push(projectJson.projects[counterProject][memberNumber]);
                    }
                }
            }

            //Check if those in activeMembers should be displayed.
            if (displayedProj === 1) {

                //Find the earliest date by comparing the date from the current activeProject to our current earliest date.
                dateVar = Date.parse(projectJson.projects[counterProject].start);
                if (startDate == 0 || Date.compare(dateVar, startDate) == -1) {
                    startDate = dateVar;
                }

                //Find the latest date for the project based on completion, hold, extension, or current day.
                dateVar = Date.parse(projectJson.projects[counterProject].end);
                if (projectJson.projects[counterProject].extensionDate && Date.parse(projectJson.projects[counterProject].extensionDate) > dateVar) {
                    dateVar = Date.parse(projectJson.projects[counterProject].extensionDate);
                }
                if (projectJson.projects[counterProject].holdEnd && Date.parse(projectJson.projects[counterProject].holdEnd) > dateVar) {
                    dateVar = Date.parse(projectJson.projects[counterProject].holdEnd);
                }
                if (projectJson.projects[counterProject].completionDate) {
                    if (Date.parse(projectJson.projects[counterProject].completionDate) > dateVar) {
                        dateVar = Date.parse(projectJson.projects[counterProject].completionDate);
                    }
                } else {
                    if (Date.parse(Date.today()) > dateVar) {
                        dateVar = Date.parse(Date.today());
                    }
                }
                if (endDate == 0 || Date.compare(dateVar, endDate) == 1) {
                    endDate = dateVar;
                }

               // console.log(activeProjects.length);
                if (activeProjects.length === 0) {
                 // alert("t");
                    endDateArray.push(dateVar);
                    activeProjects.push(projectJson.projects[counterProject]);
                } 
                else {
                    i = 0;
                    alert(i);
                    while (i < activeProjects.length) {
                        //alert(dateVar);
                        //alert(endDateArray[i]);
                        //alert(Date.compare(dateVar, endDateArray[i]));
                        if (Date.compare(dateVar, endDateArray[i]) == -1) {
                            endDateArray.splice(i, 0, dateVar);
                            activeProjects.splice(i, 0, projectJson.projects[counterProject]);
                            //alert("s");
                        } 
                        else {
                            if (i == activeProjects.length-1) {
                                 //alert("d");
                                endDateArray.push(dateVar);
                                activeProjects.push(projectJson.projects[counterProject]);
                            }
                        }
                        i++;
                    }

                }





                //Put active projects into seperate array to work with.
               // activeProjects.push(projectJson.projects[counterProject]);
            }
        }

        counterProject++;
    }



    /*
   If we have any active projects.
   Build our chart data, otherwise 
   data will remain empty.
   */
    if (activeProjects.length > 0) {
        //Create data for each active member.
        for (j = 0; j < activeMembers.length; j++) {

            //Add new empty object to data
            chartData.push({});

            //Set name of current object (name of active member)
            chartData[j].name = activeMembers[j];

            //For each active project that the current member is a member or leader of, add data.
            for (i = 0; i < activeProjects.length; i++) {
                if (activeMembers[j] == activeProjects[i].leader || activeMembers[j] == activeProjects[i].member1 || activeMembers[j] == activeProjects[i].member2 || activeMembers[j] == activeProjects[i].member3 || activeMembers[j] == activeProjects[i].member4 || activeMembers[j] == activeProjects[i].member5 || activeMembers[j] == activeProjects[i].member6 || activeMembers[j] == activeProjects[i].member7) {

                    /*
               Record project start and end,
               and set project color(dark blue 
               or light blue) depending on leader 
               status.
               */

                    chartData[j]["startTime" + i] = Date.parse(activeProjects[i].start);
                    chartData[j]["endTime" + i] = Date.parse(activeProjects[i].end);

                    if (Date.parse(activeProjects[i].holdStart) < Date.parse(activeProjects[i].end) && Date.parse(activeProjects[i].holdEnd) > Date.parse(activeProjects[i].end)) {
                        chartData[j]["endTime" + i] = Date.parse(activeProjects[i].holdStart);
                    }

                    if (activeMembers[j] == activeProjects[i].leader) {
                        chartData[j]["color" + i] = "#587CAF";
                    } else {
                        chartData[j]["color" + i] = "#A6C0E4";
                    }

                    //Reset overdue Start and End values.             
                    overdueStart = "";
                    overdueEnd = "";

                    //Record project overdue start and end.

                    //Make sure there isn't a hold without an end.
                    if (!activeProjects[i].holdStart || activeProjects[i].holdEnd) {
                        //Check for a hold that ends after projected end.
                        if (activeProjects[i].holdEnd && Date.parse(activeProjects[i].holdEnd) > Date.parse(activeProjects[i].end)) {
                            //If so set our overdue based on the holdEnd (does not account for possible hold starts after a project is already overdue).
                            if (Date.parse(Date.today()) > Date.parse(activeProjects[i].holdEnd)) {
                                overdueStart = Date.parse(activeProjects[i].holdEnd);
                                overdueEnd = Date.parse(Date.today());
                            }
                            if (activeProjects[i].completionDate && Date.parse(activeProjects[i].completionDate) > Date.parse(activeProjects[i].holdEnd)) {
                                overdueStart = Date.parse(activeProjects[i].holdEnd);
                                overdueEnd = Date.parse(activeProjects[i].completionDate);
                            }
                        }
                        //Check for extension
                        if (activeProjects[i].extensionDate && Date.parse(activeProjects[i].extensionDate) > Date.parse(activeProjects[i].end)) {
                            //Keep our dates the same unless holdEnd doesn't exist or it ends before the extension does.
                            if (!activeProjects[i].holdEnd || Date.parse(activeProjects[i].holdEnd) < Date.parse(activeProjects[i].extensionDate)) {
                                //Otherwise use extension for our overdue dates.
                                if (Date.parse(Date.today()) > Date.parse(activeProjects[i].extensionDate)) {
                                    overdueStart = Date.parse(activeProjects[i].extensionDate);
                                    overdueEnd = Date.parse(Date.today());
                                }
                                if (activeProjects[i].completionDate && Date.parse(activeProjects[i].completionDate) > Date.parse(activeProjects[i].extensionDate)) {
                                    overdueStart = Date.parse(activeProjects[i].extensionDate);
                                    overdueEnd = Date.parse(activeProjects[i].completionDate);
                                }
                            }
                        }
                        //Check if there is no extension as well as no hold or the hold ends before projected end.
                        if (!Date.parse(activeProjects[i].extensionDate) && (!activeProjects[i].holdEnd || Date.parse(activeProjects[i].holdEnd) < Date.parse(activeProjects[i].end))) {
                            //Set project using projected end.
                            if (Date.parse(Date.today()) > Date.parse(activeProjects[i].end)) {
                                overdueStart = Date.parse(activeProjects[i].end);
                                overdueEnd = Date.parse(Date.today());
                            }
                            if (activeProjects[i].completionDate && Date.parse(activeProjects[i].completionDate) > Date.parse(activeProjects[i].end)) {
                                overdueEnd = Date.parse(activeProjects[i].completionDate);
                            }
                        }
                    }

                    //Special cases

                    //Hold in the middle of overdue, no extension. Or Hold after overdue, no extension.
                    if (activeProjects[i].holdEnd && Date.parse(activeProjects[i].holdEnd) > Date.parse(activeProjects[i].end) && Date.parse(activeProjects[i].holdStart) > Date.parse(activeProjects[i].end) && !activeProjects[i].extensionDate) {
                        overdueStart = Date.parse(activeProjects[i].end);
                        overdueEnd = Date.parse(activeProjects[i].holdStart);
                        if (Date.parse(Date.today()) > Date.parse(activeProjects[i].holdEnd)) {
                            overdueEnd = Date.parse(Date.today());
                        }
                        if (activeProjects[i].completionDate && Date.parse(activeProjects[i].completionDate) > Date.parse(activeProjects[i].holdEnd)) {
                            overdueEnd = Date.parse(activeProjects[i].completionDate);
                        }
                    }

                    //Hold in the middle of overdue with extension. Or Hold after overdue with extension.
                    if (activeProjects[i].holdEnd && activeProjects[i].extensionDate && Date.parse(activeProjects[i].holdEnd) > Date.parse(activeProjects[i].extensionDate) && Date.parse(activeProjects[i].holdStart) > Date.parse(activeProjects[i].extensionDate)) {
                        overdueStart = Date.parse(activeProjects[i].extensionDate);
                        overdueEnd = Date.parse(activeProjects[i].holdStart);
                        if (Date.parse(Date.today()) > Date.parse(activeProjects[i].holdEnd)) {
                            overdueEnd = Date.parse(Date.today());
                        }
                        if (activeProjects[i].completionDate && Date.parse(activeProjects[i].completionDate) > Date.parse(activeProjects[i].holdEnd)) {
                            overdueEnd = Date.parse(activeProjects[i].completionDate);
                        }
                    }

                    //Add to our activeProjects data for later use.
                    activeProjects[i].overdueStart = overdueStart;
                    activeProjects[i].overdueEnd = overdueEnd;

                    //Add to our data chart.
                    chartData[j]["startTimeOverdue" + i] = overdueStart;
                    chartData[j]["endTimeOverdue" + i] = overdueEnd;

                    chartData[j]["colorOverdue" + i] = "#CF4D4D";

                    /*
               Record project ext start and end,
               and set color for extensions.
               */
                    //chartData[j]["startTimeExt" + i] = Date.parse(activeProjects[i].end);
                    if (activeProjects[i].extensionDate) {
                        if (activeProjects[i].holdEnd && Date.parse(activeProjects[i].holdEnd) > Date.parse(activeProjects[i].end)) {
                            if (Date.parse(activeProjects[i].extensionDate) > Date.parse(activeProjects[i].holdEnd)) {
                                chartData[j]["startTimeExt" + i] = Date.parse(activeProjects[i].holdEnd);
                                chartData[j]["endTimeExt" + i] = Date.parse(activeProjects[i].extensionDate);
                            }
                            if (Date.parse(activeProjects[i].extensionDate) < Date.parse(activeProjects[i].holdStart)) {
                                chartData[j]["startTimeExt" + i] = Date.parse(activeProjects[i].end);
                                chartData[j]["endTimeExt" + i] = Date.parse(activeProjects[i].extensionDate);
                            }
                        } else {
                            chartData[j]["startTimeExt" + i] = Date.parse(activeProjects[i].end);
                            chartData[j]["endTimeExt" + i] = Date.parse(activeProjects[i].extensionDate);
                        }

                    }

                    chartData[j]["colorExt" + i] = "#8F9194";

                    /*
               Record project hold start and end,
               and set color for hold.
               End of a hold will be same as todays
               date unless hold end date is set.
               */
                    if (activeProjects[i].holdStart) {
                        chartData[j]["startTimeHold" + i] = Date.parse(activeProjects[i].holdStart);
                        if (activeProjects[i].holdEnd) {
                            chartData[j]["endTimeHold" + i] = Date.parse(activeProjects[i].holdEnd);
                        } else if (activeProjects[i].completionDate) {
                            chartData[j]["endTimeHold" + i] = Date.parse(activeProjects[i].completionDate);
                            activeProjects[i].holdEnd = activeProjects[i].completionDate;
                        } else {
                            chartData[j]["endTimeHold" + i] = Date.parse(Date.today());
                            activeProjects[i].holdEnd = Date.parse(Date.today());
                        }
                    }

                    chartData[j]["colorHold" + i] = "#EFE69F";


                    /*
               Record project completionDate,
               and set color for complete.
               End of a hold will be same as todays
               date unless hold end date is set.
               */
                    if (activeProjects[i].completionDate) {
                        chartData[j]["startTimeCompletion" + i] = Date.parse(activeProjects[i].completionDate);
                        chartData[j]["endTimeCompletion" + i] = Date.parse(activeProjects[i].completionDate).add(1).days();
                    }

                    chartData[j]["colorComplete" + i] = "#333435";
                }
            }
        }
    }



    //Structure for Completion date portions
    for (j = 0; j < activeProjects.length; j++) {
        chartStructure.push({});

        if (j == 0) {
            chartStructure[structureCounter].newStack = true
        }

        chartStructure[structureCounter].colorField = "colorComplete" + j;
        chartStructure[structureCounter].fillAlphas = 1;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTimeCompletion" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTimeCompletion" + j;
        chartStructure[structureCounter].id = "AmGraph-Complete" + j;
        chartStructure[structureCounter].balloonText = "<b>" + activeProjects[j].title + "</b><br>Completed: " + activeProjects[j].completionDate;
        structureCounter++;
    }

    //Structure for on hold portions
    for (j = 0; j < activeProjects.length; j++) {
        chartStructure.push({});

        if (j == 0) {
            chartStructure[structureCounter].newStack = true
        }
        chartStructure[structureCounter].colorField = "colorHold" + j;
        chartStructure[structureCounter].fillAlphas = 1;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTimeHold" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTimeHold" + j;
        chartStructure[structureCounter].id = "AmGraph-Hold" + j;
        chartStructure[structureCounter].balloonText = "<b>" + activeProjects[j].title + "</b><br>On Hold from: " + activeProjects[j].holdStart.toString("M/d/yyyy") + "<br>Until: " + activeProjects[j].holdEnd.toString("M/d/yyyy");
        structureCounter++;
    }

    //Structure for Extensions
    for (j = 0; j < activeProjects.length; j++) {
        chartStructure.push({});

        if (j == 0) {
            chartStructure[structureCounter].newStack = true
        }

        chartStructure[structureCounter].colorField = "colorExt" + j;
        chartStructure[structureCounter].fillAlphas = 1;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTimeExt" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTimeExt" + j;
        chartStructure[structureCounter].id = "AmGraph-Ext" + j;
        chartStructure[structureCounter].balloonText = "<b>" + activeProjects[j].title + "</b><br>Extended Until: " + activeProjects[j].extensionDate;
        structureCounter++;
    }

    //Structure for Overdue portions
    for (j = 0; j < activeProjects.length; j++) {
        chartStructure.push({});

        if (j == 0) {
            chartStructure[structureCounter].newStack = true
        }

        chartStructure[structureCounter].colorField = "colorOverdue" + j;
        chartStructure[structureCounter].fillAlphas = 1;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTimeOverdue" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTimeOverdue" + j;
        chartStructure[structureCounter].id = "AmGraph-Overdue" + j;
        chartStructure[structureCounter].balloonText = "<b>" + activeProjects[j].title + "</b><br>Overdue from: " + activeProjects[j].overdueStart.toString("M/d/yyyy") + "<br>Until: " + activeProjects[j].overdueEnd.toString("M/d/yyyy");
        structureCounter++;
    }

    //Structure for regular bars
    for (j = 0; j < activeProjects.length; j++) {
        chartStructure.push({});

        if (j == 0) {
            chartStructure[structureCounter].newStack = true
        }

        //Build teammember list string.
        teamMembers = ""; //Ensure String is empty before we start.

        for (h = 1; h <= 7; h++) {
            if (activeProjects[j]["member" + h] && h > 1) {
                teamMembers += ', ';
            }
            teamMembers += activeProjects[j]["member" + h];
        }

        chartStructure[structureCounter].colorField = "color" + j;
        chartStructure[structureCounter].fillAlphas = 1;
        chartStructure[structureCounter].lineAlpha = 0;
        chartStructure[structureCounter].openField = "startTime" + j;
        chartStructure[structureCounter].type = "column";
        chartStructure[structureCounter].valueField = "endTime" + j;
        chartStructure[structureCounter].id = "AmGraph-" + j;
        chartStructure[structureCounter].balloonText = "<b>" + activeProjects[j].title + "</b><br>Lead By: " + activeProjects[j].leader + "<br>Team members: " + teamMembers + "<br>Begins: " + activeProjects[j].start + "<br>Ends: " + activeProjects[j].end;
        structureCounter++;
    }

    if (Date.parse(startDate) != null) {
        Date.parse(startDate).add(-14).days();
        Date.parse(endDate).add(14).days()
    }

    chartDivHeight = activeProjects.length * activeMembers.length * 14;

    if (chartDivHeight > 500) {
        $('#chartdiv').css('height', chartDivHeight + 'px');
    }

    AmCharts.useUTC = true;
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "period": "WW",
        "dataDateFormat": "MMM-DD-YYYY",
        //  "period": "WW",
        //  "dataDateFormat": "YYYY-MM-DD",
        //  "balloonDateFormat": "JJ:NN",
        //  "startDate": Date.january().first().monday(),
        "valueAxes": [{
            "minimumDate": startDate,
            "maximumDate": endDate,
            "type": "date",
            "minPeriod": "WW",
            "period": "WW"
        }],
        "dataProvider": chartData,
        "guides": [],
        "trendLines": [],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "startDuration": 0,
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

        //If no tab or only the target tab is open.
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

/**
 *contains function that searchs for a in array obj
 *and returns true if found, otherwise returns fals.
 */
function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function employeesShown() {
    var rows = document.getElementsByName('employees');
    var selectedRows = [];
    for (var i = 0, l = rows.length; i < l; i++) {
        if (rows[i].checked) {
            selectedRows.push(rows[i].value);
        }
    }

    if (document.getElementsByName('oldEmployees')[0].checked) {
        var employeeData = employeeJson();
        console.log(employeeData);
        for (var i = 0, l = employeeData.oldEmployeeCount; i < l; i++) {
            selectedRows.push(employeeData.oldEmployeeJson.past_employees[i]);
        }
    }


    // alert(rows[3].value);

    // alert(selectedRows.length);
    //alert(JSON.stringify(selectedRows));
    return selectedRows;
}

function update() {
    createProjectgantt(jsonData.projectJson, jsonData.projectCount);
}

var jsonData;

$(document).ready(function() {

    //checkWidth();

    /**
     *Organize Json, which then builds our project panel content,
     *and adds appropriate click events GetJSON is asynchronous,
     *so I have each function call each other to prevent click events
     *getting added before building content. Order is organizeJson(),
     *createProjectpanels(), addClicks().
     **/


    jsonData = organizeJson();

    createProjectpanels(jsonData.projectJson, jsonData.projectCount);
    createProjectgantt(jsonData.projectJson, jsonData.projectCount);

    //Add click events to everything after content is added
    addClicks();

    //End self-initiating function
});