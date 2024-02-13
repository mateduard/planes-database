import './add.styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postPlane } from '../../api/planesApi';
import { getAddOptions } from '../../api/companiesApi';

const Add = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    model: '',
    manufact: '',
    company: '',
    hours: null,
    photo: '',
  });

  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const data = await getAddOptions();
        setCompanies(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFormOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const correspondingId = companies.filter(
        (company) => company.nameCompany === formData.company
      )[0].idCompany;
      const postObject = { ...formData, codeCompany: correspondingId, hours: +formData.hours };
      delete postObject.company;
      console.log(postObject);
      await postPlane(postObject);
      // setFormData({
      //   model: '',
      //   manufact: '',
      //   company: '',
      //   hours: null,
      //   photo: '',
      // });

      // navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="add-content">
      <h1>Add a plane to the database</h1>
      <form className="planeAddForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model"
          onChange={handleChange}
        />
        <input
          type="text"
          name="manufact"
          id="manufact"
          placeholder="Manufacturer"
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="company"
          id="company"
          placeholder="Air Company"
          onChange={handleChange}
        /> */}
        <select id="companies-select" name="company" onChange={handleChange}>
          {companies.map((company) => (
            <option key={company.idCompany} value={company.nameCompany}>
              {company.nameCompany}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="hours"
          id="hours"
          placeholder="Flight hours"
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          id="photo"
          placeholder="Photo link"
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Add Plane
        </button>
      </form>
    </main>
  );
};

export default Add;
