const projectService = require('../services/projects');

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

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
