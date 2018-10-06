const router = require('express').Router();
const logger = require('@/constructors/logger');


module.exports = ({ sequelize, models }) => {
  const { Users } = models;

  router.get('/', async (req, res) => {
    logger.info('All Users');
    try {
      return res.status(200).json(await Users.findAll({ raw: true }));
    } catch(e) {
      console.error(e)
      return res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  });

  router.get('/:id', async (req, res) => {
    console.log('/:id');
    try {
      const user = await Users.findOne({ id })
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
    return res.status(200).json(user);
  });

  router.post('/', async (req, res) => {
    if (!req.body.phone) res.status(500).json({
      error: 'User.phone must be provided.',
    });

    try {
      const [user, created] = await Users.findOrCreate({ where: { phone: req.body.phone } })
      res.status(200).send(user.get({ plain: true }));
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  });

  return router; 
};
