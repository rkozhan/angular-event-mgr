# Web UI Application for Event Management System built on Spring Boot
https://github.com/rkozhan/spring-event-manager-app

**Note: This platform is currently in beta and still under development.**

## Overview

This project is an Event Management Platform built with Angular. It provides a user-friendly interface for creating, managing, and exploring events. The application supports different user roles, such as general users and editors, offering features like event creation, registration.

## Features

- **User Authentication & Authorization**: Secure login and role-based access control, including specific features for users and editors.
- **Event Creation & Management**: Users can create new events, which include details like title, description, date, time, location, and category. Editors can also manage events, including deleting them.
- **Event Filtering & Search**: Users can search for events using keywords, with results filtered by criteria like title, description, date, location, and category.
- **Event Registration**: Users can register for events and manage their registrations.

## Planned Features

- **Styling**: (Angular Material, Primeng)
- **Favorite Events**: Ability to mark events as favorites for quick access.
- **Password Recovery**: A feature to allow users to reset their passwords if forgotten.
- **Image Uploads**: Support for adding images to events for better visual representation.
- **Email Verification**: A feature requiring email confirmation when creating an editor account, to ensure the validity and security of the account.

## Technologies Used

- **Frontend**: Angular, TypeScript, RxJS, SCSS
- **Backend**: Spring Boot (API)
- **Other Tools**: RxJS for reactive programming, Angular Router for navigation

## Installation & Setup

1. **Clone the repository:**:
   ```bash
   git clone https://github.com/rkozhan/angular-event-mgr.git

2. **Navigate to the project directory:**:
   ```bash
   cd event-app

3. **Install dependencies:**:
    ```bash
   npm install

4. **Run the application:**:
    ```bash
   ng serve

The application will start on http://localhost:4200.
