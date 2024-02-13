import './home.styles.css';
import PlaneCard from '../../components/plane-card/plane-card.component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlanes, deletePlane } from '../../api/planesApi';

const Home = () => {
  const [planes, setPlanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const data = await getPlanes();
        setPlanes(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlanes();
  }, []);

  const handleDelete = async (planeId) => {
    try {
      await deletePlane(planeId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>List of planes</h1>
      <button className="button-add" onClick={() => navigate('/add')}>
        Add Plane to Database
      </button>
      {/* <button className="button-add" onClick={navigate('/update')}>Edit Database Plane</button> */}
      <div className="planes-container">
        {planes.map((plane) => (
          <PlaneCard key={plane.id} planePassed={plane} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default Home;
