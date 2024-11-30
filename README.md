# Project: Email Scheduler

### **Project Overview**
**Email Scheduler** is a web-based application built using the MERN stack (MongoDB, Express, React, Node.js) with React Flow integration for an intuitive and dynamic workflow visualization. This application allows users to schedule tasks and send emails efficiently, leveraging the **Nodemailer** library. The backend is deployed on **Render.com**, and the frontend is hosted on **Netlify**.

### **Deployed Application**

-   **Live Demo**: [Email Scheduler](https://email-flow-scheduler.netlify.app/) || https://email-flow-scheduler.netlify.app
-   **GitHub Repository**: [GitHub - Email Scheduler](https://github.com/VivekAsole/email-scheduler) || https://github.com/VivekAsole/email-scheduler

----------
## **API Endpoints**

### **1. User Management**

-   **POST** `/api/user/login`  
    Authenticate user credentials.
    
-   **POST** `/api/user/register`  
    Register a new user.
    
-   **POST** `/api/user/editflow`  
    Update an existing workflow for the authenticated user.
    

### **2. Workflow Execution**

-   **POST** `/api/execute/workflow`  
    Execute the defined workflow and trigger corresponding actions (e.g., sending emails).

----------

## **Key Features**

1.  **User Authentication**:
    
    -   **Login**: Secure user login functionality.
    -   **Registration**: New users can sign up with credentials.
2.  **Dynamic Workflow Editing**:
    
    -   Utilize **React Flow** for creating and visualizing workflows.
    -   Edit (save, delete) workflows in a user-friendly interface.
3.  **Email Scheduling**:
    
    -   Schedule tasks using the **Agenda** library.
    -   Send automated emails through **Nodemailer**.
4.  **API Integration**:
    
    -   Comprehensive REST APIs for user and workflow management.

----------