import './update.styles.css';
import { updatePlane, getPlane } from '../../api/planesApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAddOptions } from '../../api/companiesApi';

const Update = () => {
  const [formData, setFormData] = useState({});
  const [formCompanies, setFormCompanies] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      const plane = await getPlane(params.id);
      const fields = plane.data[0];
      setFormData({
        id: fields.id,
        model: fields.model,
        manufact: fields.manufact,
        nameCompany: fields.nameCompany,
        hours: fields.hours,
        photo: fields.photo,
        codeCompany: fields.codeCompany,
      });

      const companies = await getAddOptions();
      console.log(companies.data);
      setFormCompanies(companies.data);
    };
    fetchForm();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'nameCompany') {
      const correctCode = formCompanies.filter(
        (formComp) => formComp.nameCompany === e.target.value
      )[0].idCompany;
      // console.log(correctCode);
      setFormData({
        ...formData,
        codeCompany: correctCode,
        nameCompany: e.target.value,
      });
      // console.log(formData);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      delete formData.nameCompany;
      // console.log(formData);
      await updatePlane(formData);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="update-content">
      <h1>Update this plane's stats</h1>
      <form className="planeUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model"
          value={formData.model || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="manufact"
          id="manufact"
          placeholder="Manufacturer"
          value={formData.manufact || ''}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="company"
          id="company"
          placeholder="Air Company"
          value={formData.company || ''}
          onChange={handleChange}
        /> */}
        <select
          id="companies-select"
          name="nameCompany"
          value={formData.nameCompany}
          onChange={handleChange}
        >
          {formCompanies.map((company) => {
            return (
              <option
                key={company.idCompany}
                value={company.nameCompany}
                id={company.idCompany}
              >
                {company.nameCompany}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="hours"
          id="hours"
          value={formData.hours || ''}
          placeholder="Flight hours"
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          id="photo"
          placeholder="Photo link"
          value={formData.photo || ''}
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Update Plane
        </button>
      </form>
    </main>
  );
};

export default Update;
