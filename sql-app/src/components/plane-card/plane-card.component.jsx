import './plane-card.styles.css';
import { useNavigate } from 'react-router-dom';

const PlaneCard = ({ planePassed, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="plane-card">
      <h3>{`Model: ${planePassed.model}`}</h3>
      <h3>{`Manufacturer: ${planePassed.manufact}`}</h3>
      <h3>{`Flight hours: ${planePassed.hours}`}</h3>
      <h3>{`Company name: ${planePassed.nameCompany}`}</h3>
      <button onClick={() => navigate(`/update/${planePassed.id}`)}>
        Update
      </button>
      <button onClick={() => handleDelete(planePassed.id)}>Delete</button>
    </div>
  );
};

export default PlaneCard;
