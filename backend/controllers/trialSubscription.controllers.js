const Session = require('../models/trialsession');
const suppliers = require('../models/supplier');




startTrialSession = async (req, res) => {
  console.log('hello world');
  const supplierId = req.body.supplierId;
  const subscriptionPlanId  = req.body.subscriptionPlanId;
  try {
    // Vérifier si l'utilisateur a une session d'essai active
    const activeSession = await Session.findOne({ supplierId:supplierId, endTime: null, paused: false });
    if (activeSession) {
      return res.status(400).json({ message: 'L\'utilisateur a déjà une session d\'essai active.' });
    }

    // Vérifier si l'utilisateur a une session d'essai en pause
    const pausedSession = await Session.findOne({ supplierId: supplierId, paused: true });
    if (pausedSession) {
      return res.status(400).json({ message: 'L\'utilisateur a une session d\'essai en pause.' });
    }

    // Créer une nouvelle session
    const newSession = new Session({ supplierId, subscriptionPlanId });
    await newSession.save();

    res.status(201).json({ message: 'Session d\'essai démarrée avec succès.', session: newSession });
  } catch (error) {
    console.log('erreur', error);
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// endTrialSession = async (req, res) => {
//   const { supplierId } = req.body;

//   try {
//     const activeSession = await Session.findOne({ userId: userId, endTime: null, paused: false });
//     if (!activeSession) {
//       return res.status(400).json({ message: 'Aucune session active trouvée pour cet utilisateur.' });
//     }

//     activeSession.endTime = new Date();
//     await activeSession.save();

//     res.status(200).json({ message: 'Session d\'essai terminée avec succès.', session: activeSession });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur du serveur', error });
//   }
// };

// resumeTrialSession = async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const pausedSession = await Session.findOne({ userId: userId, paused: true });
//     if (!pausedSession) {
//       return res.status(400).json({ message: 'Aucune session en pause trouvée pour cet utilisateur.' });
//     }

//     pausedSession.paused = false;
//     await pausedSession.save();

//     res.status(200).json({ message: 'Session d\'essai reprise avec succès.', session: pausedSession });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur du serveur', error });
//   }
// };
module.exports = {
    startTrialSession,
    // endTrialSession,
    // resumeTrialSession,
  };

