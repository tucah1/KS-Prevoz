# KS Prevoz - Public transport web application

KSPrevoz is a web application that will provide arrival time of public transport vehicles in the
Canton Sarajevo and appropriate routes from point A to point B. It will also make schedule updating
and notification sharing easier for administration of public transport company.

The web application is created in JavaScript. The frontend was implemented using React.js (with Redux as state manager) while the backend was done using Node.js, Express, and mySQL. Web application utilizes Google Maps API for
routes finding, as well as Google Drive API for file storage (.csv files that contain schedules information). All schedule data shown on the website is scraped from https://gras.ba/bs/.

Check out the application by following [this link](https://ksprevoz.herokuapp.com/).

## System Features

The list of all system features for KSPrevoz as well as their brief explanations, user requirements and corresponding functional requirements can be seen below:

1.  **Account:** _Users can create, manage, and use personal account. Users of this application are able to use their account to add lines to their favorites list for personalized schedule access._

    UR1.1 Create account

        FR1.1.1 The user shall be able to enter their name, email, and password to create an account.
        FR1.1.2 The user shall be able to create an account using their Google account.
        FR1.1.3 The system shall not allow a user to create an account with an email that is being used by another account.

    UR1.2 Log into account

        FR1.2.1 The user shall be able to access their account by entering their email and corresponding password on the log in page.
        FR1.2.2 The user shall be able to access their account using their Google account log in.

    UR1.3 Manage account

        FR1.3.1 The user shall be able to change their password.
        FR1.3.2 The user shall be able to change their email.
        FR1.3.3 The user shall be able to delete their account.

2.  **Favorites list:** _Users that have an account and are logged in are able to manage their favorites list. They are able to add and remove lines to this list to be able to create personalized view of schedules._

    UR2.1 Add line to the list

        FR2.1.1 The user shall be able to add a line to the list by clicking “Add to favorites” on the list of all lines and on the page with opened schedule for that specific line.

    UR2.2 Remove line from the list

        FR2.2.1 The user shall be able to remove line from the favorites list by clicking “Remove” on the list of all favorite lists

    UR2.3 View their favorites list

        FR2.3.1 The user shall be able to view favorites list immediately after they logged in and they should have option to open up favorites list from the navigation menu.

3.  **Schedule:** _Viewing and modifying transport schedules. Admin account will have option to add new, update and remove existing schedules/lines. User account is able to view all the schedules._

    UR3.1 Modify schedule

        FR3.1.1 The admin shall be able to add a new line to the schedule.
        FR3.1.2 The admin shall be able to update schedule of any line.
        FR3.1.3 The admin shall be able to remove a line from the schedule.

    UR3.2 View schedule

        FR3.2.1 The user shall be able to search a line by the name of the line.
        FR3.2.2 The system shall be able to display schedule for a line as a table.

4.  **Information sharing:** _Sharing of important information via notifications. Update of any schedule will send automatic email notification to all users that have that particular schedule/line in their favorites list. Admin is able to send custom email notifications to users._

    UR4.1 Send notification

        FR4.1.1 The system shall be able to send email notifications to users when admin updates schedule.
        FR4.1.2 Admin shall be able to send custom message to all users that have an account as an email notification.

    UR4.2 Receive notification

        FR4.2.1 The user shall be able to receive notifications about changes in the schedule via email address for the lines that are in their favorites list.

    UR4.3 View notification

        FR4.3.1 The system shall be able to display all notifications that admin sent as a list.

5.  **Path finding:** _Finding optimal route between two points._

    UR5.1 Find routes between two points

        FR5.1.1 The user shall be able to find routes between point A and point B.

## Authors

This web application is a project done for CS308 Software Engineering class, Spring 2021 at International University of Sarajevo (IUS). Application was created by:

-   Harun Tucaković - [@tucah1](https://github.com/tucah1)
-   Muhammed Mušanović - [@mm105](https://github.com/mm105)
-   Šejla Burnić - [@jinx244](https://github.com/jinx244)
-   Fejsal Perva - [@FejsalP](https://github.com/FejsalP)

## Docs

For more information about the application and the project please refer to [KSPrevoz_Final_Report.pdf](/docs/KSPrevoz_Final_Report.pdf)
