import logo from './logo.svg';
import './App.css';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {


  const [cita, setCita] = useState({});
  const [IsEnable, setIsEnable] = useState(true)
  const onChange = (e) => {
    e.preventDefault();
    const obj = cita;
    obj[e.target.name] = e.target.value;
    setCita(obj)
    if ((cita.name_pet && cita.name_pet !== "") &&
      (cita.age_pet && cita.age_pet !== "") &&
      (cita.name_raza && cita.name_raza !== "") &&
      (cita.name_usuario && cita.name_usuario !== "") &&
      (cita.name_contact && cita.name_contact !== "") &&
      (cita.name_Date && cita.name_Date !== "") &&
      (cita.name_cita && cita.name_cita !== "")
    ) {
      setIsEnable(false)
    }
  }
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>formulario para cita medica</Card.Title>

          <Form>
            <Form.Group>
              <Form.Label>npmbre de mascota</Form.Label>
              <Form.Control onChange={onChange} name="name_pet" placeholder="ingreasa el nombre de la mascota" ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>edad de la mascota</Form.Label>
              <Form.Control onChange={onChange} type="number" name="age_pet" placeholder='ingresa la edad de la mascota'></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>raza de la mascota</Form.Label>0
              <Form.Control onChange={onChange} name="name_raza" placeholder='ingresa la raza de la mascota'></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>nombre del propetario</Form.Label>
              <Form.Control onChange={onChange} name="name_usuario" placeholder='ingresa el nombre del propetario'></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>numero de contacto</Form.Label>
              <Form.Control onChange={onChange} type="number" name="name_contact" placeholder='ingresa el numero de contacto'></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>razon de la cita</Form.Label>
              <Form.Control onChange={onChange} as="textarea" name="name_cita" placeholder='ingresa breve descripcion de los sintomas'></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>fecha de la cita</Form.Label>
              <Form.Control onChange={onChange} type="date" name="name_Date" ></Form.Control>
            </Form.Group>
            <Button disabled={IsEnable}>enviar</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>

  );
}

export default App;
