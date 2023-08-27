const { PrismaClient } = require('@prisma/client');
const { Console } = require('console');
const prisma = new PrismaClient();


const getContacts = async (req, res) => {
    //PRINT req.user
    console.log(req.user);
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const contact = await prisma.contact.findUnique({where:{id:Number(id)}});
    res.json(contact);
};

const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            phone
        }
    });
    res.json(contact);
} catch (error) {
    console.log(error);
}
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { phone } = req.body;
    try {
    const contact = await prisma.contact.update({
        where: { id : Number(id) },
        data: {
            phone
        }
    });
    res.json(contact);
} catch (error) {
    console.log(error);
}
};

const deleteContact = async (req, res) => {
    const {id}= req.params;
    const contact = await prisma.contact.delete({where:{id:Number(id)}});
    res.json(contact);
}; 

module.exports = {getContacts,getContactById,createContact,updateContact,deleteContact}