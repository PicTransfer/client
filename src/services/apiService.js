import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const register = (username, password) => {
    return api.post('/auth/register', { username, password });
};

export const login = (username, password) => {
    return api.post('/auth/login', { username, password });
};

export const createSpace = (name, token) => {
    return api.post('/spaces/create', { name }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addMember = (spaceId, userId, token) => {
    return api.post('/spaces/add-member', { spaceId, userId }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const uploadFile = (spaceId, file, token) => {
    const formData = new FormData();
    formData.append('spaceId', spaceId);
    formData.append('file', file);

    return api.post('/spaces/upload-file', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });
};

export const getFiles = (spaceId, token) => {
    return api.get(`/spaces/files/${spaceId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
