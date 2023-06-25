# SocialNetwork

The routes are defined as follows:

/api/thoughts:

GET: Retrieves all thoughts
POST: Creates a new thought
/api/thoughts/:thoughtId:

GET: Retrieves a single thought by its ID
PUT: Updates a thought by its ID
DELETE: Deletes a thought by its ID
/api/thoughts/:thoughtId/reactions:

POST: Creates a new reaction for a thought
/api/thoughts/:thoughtId/reactions/:reactionId:

DELETE: Deletes a reaction by its ID from a thought

With this code, your base API route is /api, and you can append the respective paths for different endpoints, such as /thoughts, /thoughts/:thoughtId, /thoughts/:thoughtId/reactions, and /thoughts/:thoughtId/reactions/:reactionId.

## Citations:
I worked with Anuja Lawankar to complete this project.
 