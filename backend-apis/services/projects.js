const Project = require('../db/models/projects');

// Funciones CRUD
const getProjects = async () => await Project.findAll();
const getProjectById = async (id) => await Project.findByPk(id);
const createProject = async (project) => await Project.create(project);
const updateProject = async (id, updatedData) => {
    const project = await Project.findByPk(id);
    if (!project) return null;
    return await project.update(updatedData);
};
const deleteProject = async (id) => {
    const project = await Project.findByPk(id);
    if (!project) return null;
    await project.destroy();
    return project;
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
