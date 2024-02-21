const { pool } = require('../Db');
const { v4: uuidv4 } = require('uuid');

const getItem = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const getItems = async () => {
    try {
      const result = await pool.query('SELECT * FROM items');
      return result.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  const createItem = async (name) => {
    try {
      const itemId = uuidv4(); 
      const result = await pool.query('INSERT INTO items (id, name) VALUES ($1, $2) RETURNING *', [itemId, name]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  };
  
  

  const updateItem = async (id, { name }) => {
    try {
      const result = await pool.query('UPDATE items SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
  

const deleteItem = async (id) => {
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
