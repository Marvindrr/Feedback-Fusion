import { Button, Card, Container, Form} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';

function App() {
  const [cita, setCita] = useState({});
  const [isEnabled, setIsEnabled] = useState(true); //Se le pone true porque inicia "apagarlo"

  const onChange = (e)=>{
    e.preventDefault();
    const obj = cita; //Lo volvemos un "valor" para el objeto y tener todas las propiedades
    obj[e.target.name] = e.target.value;
    console.log(cita);
    setCita(obj)

    //El if es para validar que el formulario este completado
    if((cita.Name && cita.Name !== "") &&
      (cita.Last_name && cita.Last_name !== "") &&
      (cita.Age && cita.Age !== "") &&
      (cita.Date && cita.Date !== "") &&
      (cita.Description && cita.Description !== "") &&
      (cita.Email && cita.Email !== "")
    ){
      setIsEnabled(false) //Si lo del if se cumple, el valor se vuelve false para encenderlo (por la pregunta de disabled que sería ¿Estoy deshabilitado?)
    }
  }

  return (
    <Container>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title>Formulario para citas medicas</Card.Title>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Nombre del paciente</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa el nombre del paciente' name='Name'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Apellidos del paciente</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa los apellidos del paciente' name='Last_name'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Edad del paciente</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa la edad del paciente' type='number' name='Age'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Fecha</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa la fecha de la cita' type='date' name='Date'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Descripción del malestar</Form.Label>
              <Form.Control onChange={onChange} as='textarea' placeholder='Describe tus sintomas' name='Description'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa el correo del paciente' type='email' name='Email'/> 
            </Form.Group>
            <Button disabled={isEnabled} variant="outline-success" type='submit'>Enviar</Button>
            <Button variant="outline-danger" type='reset'>Cancelar</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
