import express from 'express';
import { getAllUsers, getUserById, updateUser, createUser, deleteUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
