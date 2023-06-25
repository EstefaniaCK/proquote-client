# ProQuote

ProQuote is a user-friendly web application catered specifically to general contractors, aiming to streamline the process of receiving quotes from subcontractors. The goal is to simplify the process of obtaining quotes from subcontractors who are bidding on construction projects. This intuitive platform allows subcontractors to easily upload itemized or lump sum price quotes. The platform then presents the quotes in a single table, making it much simpler to compare and identify the lowest price without the need for multiple screens. This web application will greatly expedite the price comparison process for general contractors when closing a project. By offering an efficient and transparent platform, my web application empowers general contractors to make well-informed decisions and choose the most suitable subcontractor for their projects.


## Installation
To run ProQuote locally, please follow these steps:

Clone the repository from GitHub:

```bash
  git clone https://github.com/Estefck/proquote-client.git
```
Navigate to the project directory:

```bash
  cd proquote-client
```
Install the dependencies:

```bash
 npm install
```
Start the development server:

```bash
npm start
```
Open your browser and visit http://localhost:3000 to access ProQuote.


## Authors

Estefania Cordova 
- [ProQuote - client](https://github.com/Estefck/proquote-client)

## Tech Stack 

**Client:** React, Material UI, CSS, JavaScript and Sass


## Usage
ProQuote provides the following pages and routes:

**Home Page**: The landing page of the application. Accessible through the root URL ("/").
**Projects Page**: Displays a list of projects. Accessible through the "/projects" route.
**Items Page**: Displays the items for a specific project. Accessible through the "/projects/:projectid/items" route, where ":projectid" represents the project's ID.
**Bids Page**: Displays the bids for a specific project. Accessible through the "/projects/:projectid/bids" route, where ":projectid" represents the project's ID.
**404 Not Found Page**: Displayed when the requested page or route does not exist. Accessible through any invalid or non-existing route.
