import axios from 'axios';

export const getPlanes = () => axios.get('http://localhost:5000/planes');
export const getPlane = (id) => axios.get(`http://localhost:5000/planes/${id}`);
export const postPlane = (plane) => axios.post('http://localhost:5000/planes', plane);
export const updatePlane = (plane) => axios.put('http://localhost:5000/planes', plane);
export const deletePlane = (id) => axios.delete(`http://localhost:5000/planes/${id}`);
