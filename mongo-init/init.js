// MongoDB initialization script
db = db.getSiblingDB("addis");

// Create user for the application
db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [
    {
      role: "readWrite",
      db: "addis",
    },
  ],
});

// Create initial collections if needed
// db.createCollection("songs");
