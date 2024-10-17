import { Button, Card, Container, Form } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';

function App() {
  const [formulario, setFormulario] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);

  const onChange = (e) => {
    const obj = { ...formulario };
    obj[e.target.name] = e.target.value;
    setFormulario(obj);

    if (
      obj.nombre && obj.carrera && obj.año_egreso &&
      obj.satisfaccion_carrera && obj.empleo_actual &&
      obj.relacion_empleo_carrera && obj.recomendaciones_universidad
    ) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Encuesta enviada con éxito');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error al enviar la encuesta');
      });
  };

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Encuesta para Egresados</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={onChange}
                placeholder="Ingresa tu nombre"
                name="nombre"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Carrera</Form.Label>
              <Form.Control
                onChange={onChange}
                placeholder="Ingresa tu carrera"
                name="carrera"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Año de Egreso</Form.Label>
              <Form.Control
                onChange={onChange}
                placeholder="Ingresa el año de egreso"
                type="number"
                name="año_egreso"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Satisfacción con la Carrera (1-5)</Form.Label>
              <Form.Control
                onChange={onChange}
                placeholder="Ingresa un valor del 1 al 5"
                type="number"
                min="1"
                max="5"
                name="satisfaccion_carrera"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>¿Estás actualmente empleado?</Form.Label>
              <Form.Select name="empleo_actual" onChange={onChange}>
                <option value="">Selecciona una opción</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Relación del Empleo con la Carrera</Form.Label>
              <Form.Select name="relacion_empleo_carrera" onChange={onChange}>
                <option value="">Selecciona una opción</option>
                <option value="Relacionado">Relacionado</option>
                <option value="No relacionado">No relacionado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recomendaciones para la Universidad</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChange}
                placeholder="Escribe tus recomendaciones"
                name="recomendaciones_universidad"
              />
            </Form.Group>
            <Button disabled={isEnabled} variant="outline-success" type="submit">
              Enviar
            </Button>
            <Button variant="outline-danger" type="reset">
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
