// const db = require('../models');
// const Sequelize = db.Sequelize;
//+ En attente de la création de la BDD et des models +

const jwt = require('jsonwebtoken');

// const { User } = db.sequelize.models;
//+ En attente de la création du models User de la BDD

//: Création d'un token signé
const newToken = (user) => {
  token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
    //: Durée d'expiration
    expiresIn: '24h',
  });
  return { user, token };
};

//:: En attente de la création de la BDD ::
exports.signup = (req, res, next) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => res.status(201).json(newToken(user)))
    .catch((error) => res.status(401).json({ error: error }));
};

//:: En attente de la création de la BDD ::
exports.login = async (req, res, next) => {
  try {
    const response = await User.authenticate(req.body.email, req.body.password);

    if (response.valid) {
      res.status(201).json(newToken(response.user));
    } else {
      res.status(401).json({ error: response.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//:: En attente de la création de la BDD ::
exports.editUser = (req, res, next) => {
  try {
    const userObject = req.file
      ? {
          ...JSON.parse(req.body.user),
          imageUrl: `${req.protocol}://${req.get('host')}/public/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    console.log(userObject);
    req.user.update(userObject).then((user) => res.status(200).json({ user }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

//:: En attente de la création de la BDD ::
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

//:: En attente de la création de la BDD ::
exports.getAllUsers = (req, res, next) => {
  const options = {
    where: Sequelize.where(
      Sequelize.fn(
        'concat',
        Sequelize.col('firstName'),
        ' ',
        Sequelize.col('lastName')
        ),
        //++  Modifier param de recherche Table Like non intégré  ++
      //   { 
      //   [Sequelize.Op.like]: `%${req.query.search}%`,
      // }
    ),
    limit: 10,
  };

  User.findAll(options)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

//:: En attente de la création de la BDD ::
exports.deleteUserAccount = async (req, res, next) => {
  try {
    const user = req.user.admin
      ? await User.findOne({ where: { id: req.params.id } })
      : req.user;
    await user.softDestroy();
    res.status(200).json({ message: 'Compte supprimé' });
  } catch (error) {
    res.status(400).json({ error });
  }
};