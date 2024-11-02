// controllers/projects.js
const projectService = require('../services/projects');
const Proyecto = require('../db/models/projects');
const Usuario = require('../db/models/users');
const ProyectoMiembro = require('../db/models/proyectos_miembros');

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects();
        res.json({ ok: true, projects });
    } catch (err) {
        console.error('Error al obtener proyectos:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener proyectos', error: err.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProjectById(id);
        if (!project) {
            return res.status(404).json({ ok: false, message: 'Proyecto no encontrado' });
        }
        res.json({ ok: true, project });
    } catch (err) {
        console.error('Error al obtener proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener proyecto', error: err.message });
    }
};

const createProject = async (req, res) => {
    try {
        const newProject = await projectService.createProject(req.body);
        res.status(201).json({ ok: true, message: 'Proyecto creado correctamente', projectId: newProject.id });
    } catch (err) {
        console.error('Error al crear proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al crear proyecto', error: err.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await projectService.updateProject(id, req.body);
        if (!updatedProject) {
            return res.status(404).json({ ok: false, message: 'Proyecto no encontrado' });
        }
        res.json({ ok: true, message: 'Proyecto actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al actualizar proyecto', error: err.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await projectService.deleteProject(id);
        if (!deletedProject) {
            return res.status(404).json({ ok: false, message: 'Proyecto no encontrado' });
        }
        res.json({ ok: true, message: 'Proyecto eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al eliminar proyecto', error: err.message });
    }
};

// Función para añadir un miembro a un proyecto
const addMemberToProject = async (req, res) => {
    const { proyecto_id, email, rol } = req.body;

    try {
        // Buscar el proyecto
        const proyecto = await Proyecto.findByPk(proyecto_id);
        if (!proyecto) {
            return res.status(404).json({ ok: false, message: 'Proyecto no encontrado' });
        }

        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        // Crear la relación en la tabla intermedia con el ID del usuario
        await ProyectoMiembro.create({ proyecto_id, usuario_id: usuario.id, rol });
        res.status(201).json({ ok: true, message: 'Miembro añadido al proyecto' });
    } catch (err) {
        console.error('Error al añadir miembro al proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al añadir miembro al proyecto', error: err.message });
    }
};

// Función para obtener los miembros de un proyecto
const getMembersByProjectId = async (req, res) => {
    const { proyecto_id } = req.params;

    try {
        const proyecto = await Proyecto.findByPk(proyecto_id, {
            include: {
                model: Usuario,
                through: {
                    attributes: ['rol'],
                }
            }
        });

        if (!proyecto) {
            return res.status(404).json({ ok: false, message: 'Proyecto no encontrado' });
        }

        res.status(200).json({ ok: true, proyecto, miembros: proyecto.Usuarios });
    } catch (err) {
        console.error('Error al obtener miembros del proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener miembros del proyecto', error: err.message });
    }
};

const removeMemberFromProjectByEmail = async (req, res) => {
    const { proyecto_id, email } = req.body;

    try {
        // Buscar el proyecto
        const proyecto = await Proyecto.findByPk(proyecto_id);
        if (!proyecto) {
            return res.status(404).json({ ok: false, message: 'Proyecto no encontrado' });
        }

        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        // Eliminar la relación en la tabla intermedia
        const deleted = await ProyectoMiembro.destroy({
            where: {
                proyecto_id,
                usuario_id: usuario.id
            }
        });

        if (!deleted) {
            return res.status(404).json({ ok: false, message: 'El miembro no está asociado al proyecto' });
        }

        res.status(200).json({ ok: true, message: 'Miembro eliminado del proyecto' });
    } catch (err) {
        console.error('Error al eliminar miembro del proyecto:', err);
        res.status(500).json({ ok: false, message: 'Error al eliminar miembro del proyecto', error: err.message });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMemberToProject,
    getMembersByProjectId,
    removeMemberFromProjectByEmail, 
};