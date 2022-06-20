# Database_sequelize

Sequelize 🧬
-
*Sequelize* is a promise-based Node.js ORM for 

- **Postgres**, 
- **MySQL**, 
- **MariaDB**, 
- **SQLite** and 
- **Microsoft SQL Server**. 

It features solid transaction support, relations, eager and lazy loading, read replication and more.

Sequelize follows Semantic Versioning and supports *Node v10* and above.

sequelize-cli
-

*sequelize-cli* is is a command line interface for *sequelize*
it allows versioning of your database by keeping track of changes and evolution of your database throughout your project.
sequelize-cli is used for data migration and database bootstrapping
## Setup

### `steps to follow`

1️⃣ Clone or download the project and and install the dependencies

```node
cd <your_folder>
npm install
```

2️⃣ Initialize the database with sequelize-cli

```
npx sequelize-cli init
```

This command creates 4 folders, the **config** folder with the *config.json* file, a **migrations** folder, a **seeders** folder and a **models** folder containing an *index.js* file.

3️⃣ Launch your database serve

Login to **mysql** with your usual login and password or launch your servers via **xampp** **lampp** **mampp**.

4️⃣ Create your database

You can create your database directly on mysql or phpmyadmin.

It is also possible to create your database with seq-cli with the commade :

```
npx sequelize-cli db:create <nmae_of_your_database>
```

5️⃣ Create the models of your database tables

To create the `models` of your database tables use the sequelize-cli command :

```
npx sequelize-cli models:generate --name your_name_of_table --attributes your_attribute:datatype
```

- Example :
```sql
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,admin:boolean
```

### **Sequelize Commandes** 

🧾 list and description of possible actions

sequelize `<commande>`

```
sequelize db:migrate                        Run pending migrations

sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps

sequelize db:migrate:status                 List the status of all migrations

sequelize db:migrate:undo                   Reverts a migration

sequelize db:migrate:undo:all               Revert all migrations ran

sequelize db:seed                           Run specified seeder

sequelize db:seed:undo                      Deletes data from the database

sequelize db:seed:all                       Run every seeder

sequelize db:seed:undo:all                  Deletes data from the database

sequelize db:create                         Create database specified by configuration

sequelize db:drop                           Drop database specified by configuration

sequelize init                              Initializes project

sequelize init:config                       Initializes configuration

sequelize init:migrations                   Initializes migrations

sequelize init:models                       Initializes models

sequelize init:seeders                      Initializes seeders

sequelize migration:generate                Generates a new migration file

sequelize migration:create                  Generates a new migration file

sequelize model:generate                    Generates a model and its migration

sequelize model:create                      Generates a model and its migration

sequelize seed:generate                     Generates a new seed file

sequelize seed:create      
```

  model:generate --name User --attributes firstName:string,lastName:string,email:string