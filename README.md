# SocialNetwork

This repository contains the code for a Social Network application. It provides a set of API routes for managing thoughts and reactions within the network.

## Routes

The routes are defined as follows:

### Thoughts

- `GET /api/thoughts`: Retrieves all thoughts.
- `POST /api/thoughts`: Creates a new thought.

### Single Thought

- `GET /api/thoughts/:thoughtId`: Retrieves a single thought by its ID.
- `PUT /api/thoughts/:thoughtId`: Updates a thought by its ID.
- `DELETE /api/thoughts/:thoughtId`: Deletes a thought by its ID.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Creates a new reaction for a thought.

### Single Reaction

- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Deletes a reaction by its ID from a thought.

## Usage

With this code, your base API route is `/api`, and you can append the respective paths for different endpoints. For example:

- `/api/thoughts` - Retrieves all thoughts.
- `/api/thoughts/:thoughtId` - Retrieves a single thought by its ID.
- `/api/thoughts/:thoughtId/reactions` - Creates a new reaction for a thought.
- `/api/thoughts/:thoughtId/reactions/:reactionId` - Deletes a reaction by its ID from a thought.

## Citations

I would like to acknowledge the contribution of Anuja Lawankar in completing this project. Their collaboration was instrumental in the development of this Social Network application.

## Creator

This Social Network application was created by Strait2thePoint.

Feel free to explore the code and utilize the API routes provided to build and enhance your own social networking applications.

