const bcrypt = require('bcrypt');

//: Regexp implementation to validate the password entry
function CheckEncryptedPassword(value) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/;
  if (!value.match(regex)) {
    throw new Error(
      'Votre mot de passe doit contenir un nombre minimum de 8 caractères et doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
    );
  }
}

//: Creation of salting function password :
function addAuthentification(User) {
  const encryptPassword = (user) => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
      });
    }
  };

  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email, deleted: false } });

    if (!user) {
      return { valid: false, message: 'Utilisateur non trouvé' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
//:: approvedPassword ::
    if (isPasswordValid) return { valid: true, user };
    else return { valid: false, message: 'Mot de passe incorrect' };
  };

  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);
}

module.exports = {
  CheckEncryptedPassword,
  addAuthentification,
};