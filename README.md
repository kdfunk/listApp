ListApp

ListApp is a user tool that allows users to create lists by adding items. It demonstrates CRUD functions while prioritizing web security. The platform uses Node.js and Express for the backend and standard HTML/JavaScript for the frontend interface.

Prerequisites
Before getting started make sure you have the following requirements, in place;

 Node.js (version 14 or newer)
 npm (version 6 or newer)

Installation

Follow these steps to install ListApp;

Clone the repository;

git clone https;//github.com/yourusername/listapp.git
cd listapp

Install the npm packages;

npm install

Configuration
The application utilizes SQLite for data storage with the database file being created if it doesn't already exist.

Running the Application
To launch the application execute the following command in the root directory;

npm start

Accessing the Application
Once the application is up and running you can access it by opening your web browser and navigating to;

arduino 
http;//localhost;3000 


You will then be directed to the ListApp interface where you can begin adding items to your list.

Security Considerations
This application showcases web vulnerabilities, like SQL Injection, XSS and Sensitive Data Exposure.

Troubleshooting;
Problem; The application won't launch.

Fix; Double check that Node.js and npm are properly set up and run npm install to install all dependencies.
Problem; Unable to add items, to the list.

Fix; Look into the browsers console for any errors. Ensure that the SQLite database is accessible and not being used by another process.
