const User = require('../models/user.model');

exports.addUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Le nom d\'utilisateur et le mot de passe sont requis.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Le nom d\'utilisateur est déjà pris.' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

module.exports={addUser}
