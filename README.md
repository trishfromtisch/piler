Application description:

Piler is a way for users to pinpoint an incedent of a dog poop on Googlemaps.

A user can submit anonymously or create a user account and follow the legitimacy of their claim (using comments and voting).

This is a single-page application which has both a client-based and server-side component.

Team Members:

Janine Rosen Shotaro Kamegai Daniel Farber Tegal Patel Trish Laws

Technology used:

The library has 4 modular connections which use Active_record to persist to the database(PostGresQL):

require_relative "../lib/comment.rb" require_relative "../lib/neighborhood.rb" require_relative "../lib/report.rb" require_relative "../lib/user.rb"

You need to bundle install the gem file first.

The database is called 'piler' and can be created by running the schema.sql The database can be seeded using the seed.rb file

The following scripts are being use: jquery

underscore.js

googlemap api

Trello board link: https://trello.com/b/O0ZdNPbu/piler

Artifacts:

Wireframes: https://github.com/WDI-Team-Geodude/piler/tree/master/updated%20wire%20frames https://github.com/WDI-Team-Geodude/piler/tree/master/wireframe%20screencaps ERDs: https://github.com/neener/piler/blob/master/ERD.jpg