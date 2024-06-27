# Two Minute Mornings

Inspired by [Neil Pasricha](https://www.neil.blog/)'s transformative practice, this app provides daily journaling prompts to cultivate gratitude, focus, and a positive mindset. Reflect for just two minutes each morning and experience the power of mindful journaling.

## How to use this app

Two Minute Mornings is designed to integrate seamlessly into your daily routine. Each day, you'll receive three simple prompts:

- Today I will focus on...
- Today I am grateful for...
- Today I will let go of...

These prompts are brief but impactful, allowing you to maintain this positive practice even on your busiest days. There's no minimum text requirement – the key is regular engagement to foster mindfulness and self-improvement.

## Features

- **Daily journaling prompts** receive three thought-provoking prompts each morning.
- **Quick & easy entries**: spend just two minutes reflecting on your day.
- **Read, create, edit, & delete entries**: maintain complete control over your journaling history.
- **User accounts & login**: securely access your entries and profile information.
- **Profile management**: edit your profile and reset your password.
- **Daily email reminders**: receive a gentle nudge to journal at 8 pm if you haven't yet that day.
- **Stats**: maintain your writing streak and look at other personal journaling metrics to keep you motivated.

## API Documentation

# Two Minute Mornings

Inspired by [Neil Pasricha](https://www.neil.blog/)'s transformative practice, this app provides daily journaling prompts to cultivate gratitude, focus, and a positive mindset. Reflect for just two minutes each morning and experience the power of mindful journaling.

## How to use this app

Two Minute Mornings is designed to integrate seamlessly into your daily routine. Each day, you'll receive three simple prompts:

- Today I will focus on...

- Today I am grateful for...

- Today I will let go of...

These prompts are brief but impactful, allowing you to maintain this positive practice even on your busiest days. There's no minimum text requirement – the key is regular engagement to foster mindfulness and self-improvement.

## Features

- **Daily journaling prompts** receive three thought-provoking prompts each morning.

- **Quick & easy entries**: spend just two minutes reflecting on your day.

- **Read, create, edit, & delete entries**: maintain complete control over your journaling history.

- **User accounts & login**: securely access your entries and profile information.

- **Profile management**: edit your profile and reset your password.

- **Daily email reminders**: receive a gentle nudge to journal at 8 pm if you haven't yet that day.

- **Stats**: maintain your writing streak and look at other personal journaling metrics to keep you motivated.

## Schemas

**Entry**
\
This schema defines the structure of a journal entry in the application.

- **focusPrompt (string):** The prompt for the user to focus on during their journaling session.
- **gratefulPrompt (string):** The prompt for the user to reflect on things they are grateful for.
- **letGoPrompt (string):** The prompt for the user to identify things they want to let go of.
- **creator (ObjectId):** A reference to the user who created the journal entry.

**User**
\
This schema defines the structure of a user in the application.

- **email** (string)
- **password** (string)
- **name** (string)
- **entries** (ObjectID): A reference to the array of entries the user has created.

## API Documentation

This document describes the API endpoints for a journaling application. It's assumed you have a user account and are authenticated before calling any endpoints that require it (indicated by `isAuthenticated` in the request).

### Entry Endpoints

**1. GET /api/entries (Authenticated)**

- Description: Retrieves all journal entries for the authenticated user.
- Response Format: JSON Array
- Example Response:
  `{ 
"_id": "ObjectId(abcdef0123456789abcdef012345)", 
"focusPrompt": "What are you focusing on today?", "gratefulPrompt": "What are you grateful for today?", "letGoPrompt": "What do you want to let go of today?", "creator": "ObjectId(abcdef0123456789abcdef012345)", 
"createdAt": "2024-06-26T00:00:00.000Z", 
"updatedAt": "2024-06-26T00:00:00.000Z" 
}`

**2. GET /api/entries/:entryId (Authenticated)**

- Description: Retrieves a specific journal entry by its ID.
- Request Parameters:
  - `entryId` (string): The unique identifier of the journal entry.
- Response Format: JSON Object (including all entry fields)
- Example Response:
  `
{ "_id": "ObjectId(abcdef0123456789abcdef012345)",  "focusPrompt": "What are you focusing on today?", "gratefulPrompt": "What are you grateful for today?", "letGoPrompt": "What do you want to let go of today?", "creator": "ObjectId(abcdef0123456789abcdef012345)", "createdAt": "2024-06-26T00:00:00.000Z", "updatedAt": "2024-06-26T00:00:00.000Z" }`

**3. POST /api/entries (Authenticated)**

- Description: Creates a new journal entry for the authenticated user.
- Request Body:
  - `focusPrompt` (string): The prompt for the user to focus on during their journaling session.
  - `gratefulPrompt` (string): The prompt for the user to reflect on things they are grateful for.
  - `letGoPrompt` (string): The prompt for the user to identify things they want to let go of.
- Response Format: JSON Object (including the newly created entry)
- Example Response:
  `{ "newEntry": { "_id": "ObjectId(abcdef0123456789abcdef012345)", // Replace with a sample ObjectID "focusPrompt": "What are you focusing on today?", "gratefulPrompt": "What are you grateful for today?", "letGoPrompt": "What do you want to let go of today?", "creator": "ObjectId(abcdef0123456789abcdef012345)", "createdAt": "2024-06-26T00:00:00.000Z", "updatedAt": "2024-06-26T00:00:00.000Z" }, "entryCreator": { "_id": "ObjectId(abcdef0123456789abcdef012345)" } }
`

**4. PUT /api/entries/:entryId (Authenticated)**

- Description: Updates an existing journal entry by its ID.
- Request Parameters:
  - `entryId` (string): The unique identifier of the journal entry.
- Request Body: The request body should contain the updated properties of the entry (e.g., new `focusPrompt`, `gratefulPrompt`, or `letGoPrompt`).

**5. DELETE /api/entries/:entryId (Authenticated)**

- Description: Deletes a journal entry by its ID.
- Request Parameters:
  - `entryId` (string): The unique identifier of the journal entry.
- Response Format: Empty response body with status code 204 (No Content) upon successful deletion.

**7. GET /api/entries/stats (Authenticated)**

- Description: Retrieves various journaling statistics for the authenticated user.
- Response Format: JSON Object

### User Endpoints

**1. GET /api/users/:userId**

- Description: Retrieves the profile of a user by their ID.
- Request Parameters:
  - `userId` (string): The unique identifier of the user.
- Authorization check: Only returns the profile if the requested user ID matches the authenticated user's ID.
- Response Format: JSON Object containing user profile information.
- Example Response:
  `{ "_id": "ObjectId(abcdef0123456789abcdef012345)", "username": "johndoe", "email": "johndoe@example.com", // Other user profile fields (depending on your User model) "createdAt": "2024-06-20T00:00:00.000Z", "updatedAt": "2024-06-25T00:00:00.000Z" }
`
  **2. PUT /api/users/:userId (Authenticated)**
- Description: Updates the profile of the authenticated user.
- Request Parameters:
  - `userId` (string): The unique identifier of the user (should match the authenticated user's ID).
- Request Body: The request body should contain only the properties of the user profile that need to be updated (e.g., new `username` or `email`).
- Response Format: JSON Object containing the updated user profile information.
- Example Response:
  `{
  "_id": "ObjectId(abcdef0123456789abcdef012345)",
  "username": "janedoe",  // Updated username
  "email": "janedoe@example.com",
  // Other user profile fields
  "createdAt": "2024-06-20T00:00:00.000Z",
  "updatedAt": "2024-06-26T00:00:00.000Z"  // Updated timestamp
}
`

**3. DELETE /api/users/:userId (Authenticated)**

- Description: Deletes the authenticated user and all their associated journal entries.
- Request Parameters:
  - `userId` (string): The unique identifier of the user (should match the authenticated user's ID).
- Authorization check: Ensures the user attempting deletion is the authenticated user.
- Response Format: Upon successful deletion:
  - Status Code: 200 OK
  - Response Body: JSON Object containing a success message (e.g., `"message": "User and entries deleted successfully."`).
- Error Response:
  - Status Code: 403 Forbidden (if attempting to delete another user)
  - Status Code: 500 Internal Server Error (if deletion fails)
  - Response Body: JSON Object containing an error message.

**Note:** This endpoint requires the user to be authenticated and attempts to delete another user will be forbidden. Upon successful deletion, the user's associated journal entries are also deleted using `Entry.deleteMany` before removing the user themself.

## Current Limitations (Work in Progress):

- **Stats Page**: the backend logic for generating user statistics is complete, but the connection to the frontend for displaying data is not yet implemented. Hardcoded values are used for demonstration purposes in the current version.

- **Password reset functionality**: while implemented, the password reset functionality may not work perfectly in all scenarios.

## Current Limitations (Work in Progress):

- **Stats Page**: the backend logic for generating user statistics is complete, but the connection to the frontend for displaying data is not yet implemented. Hardcoded values are used for demonstration purposes in the current version.

- **Password reset functionality**: while implemented, the password reset functionality may not work perfectly in all scenarios.
