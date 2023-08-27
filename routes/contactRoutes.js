const express = require('express');
const { getContacts ,getContactById,createContact,updateContact,deleteContact} = require('../controllers/contactControllers');
const router = express.Router();

const validateToken=require('../middleware/ValidateTokenHandle');
router.use(validateToken)

router.get('/', getContacts);

router.get('/:id',getContactById);

router.post('/', createContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

module.exports = router;