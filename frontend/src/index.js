import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Componente principal para la encuesta de egresados
function SurveyForm() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    carrera: '',
    año_egreso: '',
    satisfaccion_carrera: 1,
    empleo_actual: 'No',
    relacion_empleo_carrera: 'No relacionado',
    recomendaciones_universidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Encuesta para Egresados</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Carrera</label>
          <input type="text" className="form-control" name="carrera" value={formData.carrera} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Año de Egreso</label>
          <input type="number" className="form-control" name="año_egreso" value={formData.año_egreso} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Satisfacción con la Carrera (1-5)</label>
          <input type="number" className="form-control" name="satisfaccion_carrera" value={formData.satisfaccion_carrera} onChange={handleChange} min="1" max="5" required />
        </div>
        <div className="mb-3">
          <label className="form-label">¿Está actualmente empleado?</label>
          <select className="form-select" name="empleo_actual" value={formData.empleo_actual} onChange={handleChange} required>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Relación del empleo con la carrera</label>
          <select className="form-select" name="relacion_empleo_carrera" value={formData.relacion_empleo_carrera} onChange={handleChange} required>
            <option value="Relacionado">Relacionado</option>
            <option value="No relacionado">No relacionado</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Recomendaciones para la Universidad</label>
          <textarea className="form-control" name="recomendaciones_universidad" value={formData.recomendaciones_universidad} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Enviar Respuesta</button>
      </form>
    </div>
  );
}

// Renderiza el formulario en lugar de App
root.render(
  <React.StrictMode>
    <SurveyForm />
  </React.StrictMode>
);


reportWebVitals();
