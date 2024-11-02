// services/projects.js
const Proyecto = require('../db/models/projects');
const Usuario = require('../db/models/users');
const ProyectoMiembro = require('../db/models/proyectos_miembros');

// Funciones CRUD de proyectos
const getProjects = async () => await Proyecto.findAll();
const getProjectById = async (id) => await Proyecto.findByPk(id);
const createProject = async (project) => await Proyecto.create(project);
const updateProject = async (id, updatedData) => {
    const project = await Proyecto.findByPk(id);
    if (!project) return null;
    return await project.update(updatedData);
};
const deleteProject = async (id) => {
    const project = await Proyecto.findByPk(id);
    if (!project) return null;
    await project.destroy();
    return project;
};

// Función para añadir un miembro a un proyecto
const addMemberToProject = async (proyecto_id, usuario_id, rol) => {
    const proyecto = await Proyecto.findByPk(proyecto_id);
    const usuario = await Usuario.findByPk(usuario_id);

    if (!proyecto || !usuario) {
        return null; // Retorna null si el proyecto o usuario no existen
    }

    return await ProyectoMiembro.create({ proyecto_id, usuario_id, rol });
};

// Función para obtener los miembros de un proyecto específico
const getMembersByProjectId = async (proyecto_id) => {
    const proyecto = await Proyecto.findByPk(proyecto_id, {
        include: {
            model: Usuario,
            through: {
                attributes: ['rol'], 
            }
        }
    });
    if (!proyecto) {
        return null; 
    }
    return proyecto.Usuarios; 
};

// Función para eliminar un miembro de un proyecto por email
const removeMemberFromProjectByEmail = async (proyecto_id, email) => {
    const proyecto = await Proyecto.findByPk(proyecto_id);
    if (!proyecto) {
        return { error: 'Proyecto no encontrado' };
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        return { error: 'Usuario no encontrado' };
    }

    const deleted = await ProyectoMiembro.destroy({
        where: {
            proyecto_id,
            usuario_id: usuario.id
        }
    });

    if (!deleted) {
        return { error: 'El miembro no está asociado al proyecto' };
    }

    return { success: true };
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMemberToProject,
    getMembersByProjectId,
    removeMemberFromProjectByEmail, 
};