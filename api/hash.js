const bcrypt = require('bcrypt');

async function generateHash() {
  const hashed = await bcrypt.hash('apple', 10);
  console.log(hashed);
}

generateHash();