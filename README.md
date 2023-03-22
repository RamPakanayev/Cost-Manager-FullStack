# Cost-Manager---FullStack

## Changes in the Updated Version

In the updated version of the front-end application, the following changes have been made to connect it to the backend project:

1. **AddCostForm component**: The AddCostForm component has been updated to use the fetch API to send POST requests to the backend when adding a new cost item. The component now sends the form data as JSON to the "/addCost" endpoint.

2. **State management**: The state management has been changed from using local storage to using the backend project for storing and managing the cost data. The useState hooks have been used to manage the state of the sum, category, description, date, and userId fields.

3. **Input validation**: The input validation has been updated to handle the case when the user doesn't select a category. If the user doesn't select a category, the category value will be set to "Other" before sending the request to the backend.

4. **Error handling**: The error handling has been improved to display informative error messages to the user when there's a problem with the input or the backend operation. The error messages are displayed using window.alert().

5. **Form submission**: The form submission process has been updated to clear the input fields after successfully adding a new cost item. This provides a better user experience by indicating that the new cost item has been added and allowing the user to easily add more cost items.

By making these changes, the front-end application is now connected to the backend project, and it uses the backend for data storage and management instead of local storage.
