GET = 
/surfers
/surfers/:id 

POST = 
posting new wave break locations
logging in 

PUT = 
updating surfer board 
updating surfer skill level 

DELETE = 
deleting surfer



- Technologies Used - 
express, mustache-express, body-parser, pg-promise, express-session, methode-override, jQuery, skeleton, 


- Approach -
I first mapped out my database tables. Then found the foreign keys that related to each other in the tables (see psuedocode folder). I then mapped out the routes and what would be shown on those pages. Next, i focused on CRUD (get, put, update, delete). My main focus was to create an MVP that worked. I should have researched the API from the start. I contacted seaweed magic, an API that would have been perfect for this project, but they never got back to me. I settled for weather underground, which works fine, but it is a little boring, and I wish they have widgets or images I could pull through with ocean currents. I also did a join! (with Stefan's help). In order to show the name of the name break/break location. 

- Unsolved Problems -
1. I am still confused on how to make the css mobile friendly and collapse with the window. 
2. I did all my CSS in my html. I think this is bad. But it worked with the limited amount of time that I had. 
3. The API is so boring. I think it's a problem. I would have liked to used a better one with more information, but just could not find one. 
