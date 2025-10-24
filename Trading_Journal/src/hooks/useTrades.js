import { useState } from 'react';
import {
    getTrades,
    createTrade,
    updateTrade,
    deleteTrade,
    bulkDeleteTrades,
    bulkTagTrades,
    exportTrades,
    uploadScreenshots
} from '../api';

export const useTrades = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTrades = async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getTrades(filters);
            setTrades(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch trades');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addTrade = async (tradeData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createTrade(tradeData);
            setTrades(prev => [...prev, response.data]);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create trade');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const editTrade = async (id, tradeData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateTrade(id, tradeData);
            setTrades(prev => prev.map(trade => trade.id === id ? response.data : trade));
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update trade');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeTrade = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deleteTrade(id);
            setTrades(prev => prev.filter(trade => trade.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete trade');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleBulkDelete = async (ids) => {
        try {
            setLoading(true);
            setError(null);
            await bulkDeleteTrades(ids);
            setTrades(prev => prev.filter(trade => !ids.includes(trade.id)));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete trades');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleBulkTag = async (ids, tags) => {
        try {
            setLoading(true);
            setError(null);
            const response = await bulkTagTrades(ids, tags);
            setTrades(prev => prev.map(trade => 
                ids.includes(trade.id) ? { ...trade, tags: [...trade.tags, ...tags] } : trade
            ));
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to tag trades');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async (ids) => {
        try {
            setLoading(true);
            setError(null);
            const response = await exportTrades(ids);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to export trades');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleScreenshotUpload = async (tradeId, files) => {
        try {
            setLoading(true);
            setError(null);
            const response = await uploadScreenshots(tradeId, files);
            setTrades(prev => prev.map(trade => 
                trade.id === tradeId 
                    ? { ...trade, screenshots: [...(trade.screenshots || []), ...response.data] }
                    : trade
            ));
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload screenshots');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        trades,
        loading,
        error,
        fetchTrades,
        addTrade,
        editTrade,
        removeTrade,
        handleBulkDelete,
        handleBulkTag,
        handleExport,
        handleScreenshotUpload
    };
};
