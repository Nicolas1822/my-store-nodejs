const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin1.2.3';
  const hash = '$2b$10$6.K1g7Nu7YrVUbLE1FhSJORhkeOg0.X3LVamYf7aZKssfNAWbOgya';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword(); // True
