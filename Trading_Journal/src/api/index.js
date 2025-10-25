// src/api/index.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Function to get CSRF token
const getCsrfToken = async () => {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true
        });
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};

// Request interceptor
api.interceptors.request.use(async (config) => {
    // Only get CSRF token for mutation requests (POST, PUT, DELETE)
    if (['post', 'put', 'delete'].includes(config.method)) {
        await getCsrfToken();
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login page on unauthorized access
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Add response interceptor for handling errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);
export const getTrades = (filters) => api.get('/trades', { params: filters });
export const createTrade = (tradeData) => api.post('/trades', tradeData);
export const updateTrade = (id, tradeData) => api.put('/trades/${id}', tradeData);
export const deleteTrade = (id) => api.delete('/trades/${id}');
export const bulkDeleteTrades = (ids) => api.post('/trades/bulk-delete', { trade_ids: ids });
export const bulkTagTrades = (ids, tags) => api.post('/trades/bulk-tag', { trade_ids: ids, tags });
export const exportTrades = (ids) => api.post('/trades/export', { trade_ids: ids });
export const uploadScreenshots = (tradeId, files) => {
    const formData = new FormData();
    formData.append('trade_id', tradeId);
    files.forEach(file => formData.append('screenshots[]', file));
    return api.post('/screenshots/upload', formData);
};
export const getAnalytics = () => api.get('/analytics');