// routes/projects.js
const verifyToken = require('../middlewares/token_validator');
const express = require('express');
const projectController = require('../controllers/projects');
const router = express.Router();

// Rutas CRUD para proyectos
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', verifyToken, projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Rutas para gestionar miembros en proyectos
router.post('/add-member', projectController.addMemberToProject);
router.get('/:proyecto_id/members', projectController.getMembersByProjectId);
router.delete('/remove-member', projectController.removeMemberFromProjectByEmail); 
router.get('/user/:user_id/projects', projectController.getProjectsByUserId);


module.exports = router;
