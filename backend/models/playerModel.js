const mongoose = require('mongoose');

/* example input POST api/signup/
{
    "playerName": "Kaiffari",
    "password": "Xf1&8opq",
    "email": "kaiffari@kaiffaritOY.fi"
}
 */

/* example output POST api/signup/
{
    "email": "kaiffari@kaiffaritOY.fi",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWE1NGM4YzgzYjUzZmEyNWU1OTQxMzIiLCJpYXQiOjE3NzI0NDA3MTYsImV4cCI6MTc3MjY5OTkxNn0.5hxihhjFfyHuURLT5UPXIRxtALyFPQZwWe6EkF24YPg"
}
 */



const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playerName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);