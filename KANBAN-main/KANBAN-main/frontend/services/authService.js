// services/authService.js
const BASE_URL = 'http://localhost:5000/api/auth';

export const getUserData = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al obtener datos del backend');
    }
  } catch (error) {
    throw new Error('Error de red:', error);
  }
};

