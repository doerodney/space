# Description
This document describes tasks to implement an air traffic control simultor for drones.

## Tasks
1.	Create set of node module that creates a set of locations to be used by 
simulated drones.
1.	Create the simplest drone simulator that can possibly work.  It must 
simulate flight between specified locations.  Emit the position of the drone
to the console.
1.	Implement a standard argument parser for arguments used by the drone 
simulator.
1.	Change the drone simulator to report positions to a specified sqlite 
database file.  Absent a specification, the sqlite database should be a memory
database.
1.	Create a shell script to launch multiple flights as background tasks.  
Verify that the sqlite database handles multiple flights correctly.
1.	Create a server application that monitors database content.  Its purpose is
to monitor database content.  It should calculate future closest points of 
approach for independent flights and record them in the database.
1.	Modify the server application to depict the air traffic context in a 
Scalable Vector Graphics (SVG) syntax.
1.	Create an HTML file that loads the SVG file.
1.	Demonstrate how drones can collide.
1.	Modify the server to detect potential collisions, and put course changes to
prevent collisions into the database.
1.	Modify the drone simulator to check the database for course change commands.
1.	Demonstrate how drones do not collide.


