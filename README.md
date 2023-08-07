### Requirements
* NodeJS 18.x
* ExpressJS
* Sequelize
* Sequelize-CLI
* PostgreSQL


### Create the `.env` file

```env
NODE_ENV = "development" || "production" || "test"
PORT = ["your desired port"]
USER_SEED_PWD = ["your desired user table seed password"]
JWT_SECRET = ["your desired jwt secret"]

DB_USERNAME = ["your desired database username"]
DB_PASSWORD = ["your desired database password"]
DB_NAME = ["your desired database name"]
DB_HOST = ["your desired database host"]


MONGO_USER = ["your desired mongodb username"]
MONGO_PWD = ["your desired mongodb password"]
MONGO_HOST = ["your desired mongodb host"]
```

further examples can be found in `.env.example` file

*Licensed under the MIT license*