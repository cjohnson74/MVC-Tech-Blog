# MVC-Tech-Blog
Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept returns thousands of think pieces and tutorials from developers of all skill levels!  I built a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. I built this site completely from scratch and deploy it to Heroku. My app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. My application’s folder structure follows the Model-View-Controller paradigm. I used the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for my Views, used the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for my Models, and created an Express.js API for my Controllers.  I also needed the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

# Live Application Deployed on Heroku

[Live App](https://model-view-control-tech-blog.herokuapp.com/)

# Screenshots

<img width="1357" alt="Screen Shot 2021-10-24 at 11 18 59 AM" src="">

<img width="1352" alt="Screen Shot 2021-10-24 at 11 22 01 AM" src="">
