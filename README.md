ArtGallery-EJS is a full-stack web application where users can share artworks, leave comments, rate submissions, and manage their collections. Authentication and authorization are handled with **Passport.js**, ensuring a secure and personalized experience.


- User Authentication
  - Sign up, login, and logout using Passport.js
  - Only authenticated users can add or interact with art

- Artwork Management
  - Add new art pieces with title, description, and image
  - View details of each artwork
  - Delete own artworks (only by authorized owner)

- Comments & Ratings
  - Leave comments on artworks
  - Rate artworks (1–5 stars)
  - Delete own comments

- Authorization
  - Only the uploader can edit or delete their art
  - Only comment owners can delete their comments

Frontend: EJS (Embedded JavaScript templates), Bootstrap / CSS
Backend: Node.js, Express.js
Authentication: Passport.js (Local strategy)
Database: MongoDB + Mongoose
Session Management: express-session
Others: bcrypt (password hashing), connect-flash (messages)

