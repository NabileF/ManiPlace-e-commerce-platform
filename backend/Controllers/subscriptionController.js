
// subscriptionController.js
const Subscription = require('../models/SubscriptionModel');
const mongoose = require('mongoose');


/**-----------------------------------------------
 * @desc    Obtenir le niveau d'accès d'un abonnement
 * @route   GET /subscriptions/:id/access-level
 * @access  Public
 ------------------------------------------------*/
const getAccessLevel = async (req, res) => {
    try {
      const subscription = await Subscription.findOne({ plan_id: req.params.id });
      if (!subscription) {
        return res.status(404).json({ message: 'Souscription non trouvée' });
      }
      res.status(200).json({ access_level: subscription.plan_access_level });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du niveau d\'accès de la souscription', error: error.message });
    }
  };
/**-----------------------------------------------
 * @desc    Obtenir les fonctionnalités d'un abonnement
 * @route   GET /subscriptions/:id/features
 * @access  Public
 ------------------------------------------------*/
  const getFeatures = async (req, res) => {
    try {
      const subscription = await Subscription.findOne({ plan_id: req.params.id });
      if (!subscription) {
        return res.status(404).json({ message: 'Souscription non trouvée' });
      }
      res.status(200).json({ features: subscription.plan_features });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des fonctionnalités de la souscription', error: error.message });
    }
  };
  
/**-----------------------------------------------
 * @desc    Obtenir le nom du plan d'un abonnement
 * @route   GET /subscriptions/:id/name
 * @access  Public
 ------------------------------------------------*/
  const getName = async (req, res) => {
    try {
      const subscription = await Subscription.findOne({ plan_id: req.params.id });
      if (!subscription) {
        return res.status(404).json({ message: 'Souscription non trouvée' });
      }
      res.status(200).json({ name: subscription.plan_name });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du nom du plan de la souscription', error: error.message });
    }
  };
 /**-----------------------------------------------
  * @desc    Obtenir l'ID du plan d'un abonnement
  * @route   GET /subscriptions/:id/plan-id
  * @access  Public
 ------------------------------------------------*/
  const getPlanId = async (req, res) => {
    try {
      const subscription = await Subscription.findOne({ plan_id: req.params.id });
      if (!subscription) {
        return res.status(404).json({ message: 'Souscription non trouvée' });
      }
      res.status(200).json({ plan_id: subscription.plan_id });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'ID du plan de la souscription', error: error.message });
    }
  };
  
 /**-----------------------------------------------
 * @desc    Créer une nouvelle souscription
  * @route   POST /subscriptions
  * @access  Public
 ------------------------------------------------*/
 const createSubscription = async (req, res) => {
    try {
      const {
        user_id,
        plan_id,
        plan_name,
        plan_price,
        plan_features,
        plan_access_level,
      } = req.body;
  
      const subscription_date = new Date().toLocaleString(); // Obtenir la date actuelle au format local
  
      const newSubscription = new Subscription({
        user_id,
        plan_id,
        plan_name,
        plan_price,
        plan_features,
        plan_access_level,
        subscription_date,
      });
  
      await newSubscription.save();
  
      res.status(201).json({ message: 'Souscription créée avec succès', subscription: newSubscription });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de la souscription', error: error.message });
    }
  };
  
module.exports = {
  getAccessLevel,
  getFeatures,
  getName,
  getPlanId,
  createSubscription,
};
