**Project Overview**


The project is a budget-tracking application. The Postman Collection documentation for the project can be found below:

https://documenter.getpostman.com/view/30427442/2sA3s4nBFk




The application has the following core features:


**User Management:**

Users can sign up and log in.
Admin users have additional privileges to view and manage all users.


**Expense Management:**

Users can add, update, and delete their expenses.
Users can filter, sort, and paginate through their list of expenses.
Admins can view all expenses of all users.


**Notifications:**

Users receive notifications whenever they add, update, or delete an expense.
Users can fetch their notifications to stay informed about changes to their expenses.



**Implemented Functionality**
1. User Management
Signup and Login: JWT-based authentication is used. Tokens are signed with user data and used for securing routes.
Profile Management: Users can view and update their profiles.
Admin Capabilities: Admin users can view and update any user’s information.
2. Expense Management
Add, Update, and Delete Expenses: Users can manage their expenses. Each operation triggers a corresponding notification.
Fetching Expenses: Users can filter, sort, and paginate their expenses.
3. Notifications
Notification Storage: Notifications are stored in the user’s document in MongoDB.
Fetching Notifications: Users can fetch their notifications to see messages related to their expense activities.



How This Fits Together

**User Flow**: A user logs in, performs expense management operations, and receives notifications for those operations. Admin users can manage and view data across the system.

**Security**: JWT tokens ensure that only authenticated users can perform actions and view their data.

**Data Consistency**: Notifications are tied directly to expense actions, ensuring that users are always aware of changes.
