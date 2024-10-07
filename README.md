# Chuck Norris API

This project implements a REST API using NestJS with TypeScript, featuring user authentication, profile management, and a random joke endpoint.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd unitask-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URL=mongodb://localhost:27017/your-db-name
   JWT_SECRET=your-jwt-secret
   JOCKS_API_URL=https://api.chucknorris.io/jokes/random
   ```

4. Run the application:
   ```
   npm run start:dev
   ```

The server will start running on `http://localhost:3000`.

## API Endpoints

1. User Signup: `POST /api/users/signup`
2. User Login: `POST /api/users/login`
3. View Profile: `GET /api/users/me` (Requires authentication) 
4. Get Random Joke: `GET /api/random-joke` (Requires authentication)
5. User Logout: `POST /api/users/logout` (Requires authentication)

# For protected API you need to pass token in headers with key "x-token" 


## Testing

To test the API endpoints, you can use Postman or any other API testing tool. Create new requests for each endpoint:

1. Sign up a new user
2. Log in with the created user
3. Use the returned JWT token in the Authorization header for authenticated requests
4. Test the protected endpoints (profile, random joke, logout)

## Additional Notes

- This project uses SQLite as the database for simplicity. For production use, consider using a more robust database solution.
- Make sure to replace the JWT secret in the `.env` file with a secure, randomly generated string in a production environment.