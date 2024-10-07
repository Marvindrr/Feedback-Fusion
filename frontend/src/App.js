import { Button, Card, Container, Form} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';

function App() {
  const [formulario, setformulario] = useState({});
  const [isEnabled, setIsEnabled] = useState(true); //Se le pone true porque inicia "apagarlo"

  const onChange = (e)=>{
    e.preventDefault();
    const obj = formulario; //Lo volvemos un "valor" para el objeto y tener todas las propiedades
    obj[e.target.name] = e.target.value;
    console.log(formulario);
    setformulario(obj)

    //El if es para validar que el formulario este completado
    if((formulario.Name && formulario.Name !== "") &&
      (formulario.Last_name && formulario.Last_name !== "") &&
      (formulario.Email && formulario.Email !== "")
    ){
      setIsEnabled(false) //Si lo del if se cumple, el valor se vuelve false para encenderlo (por la pregunta de disabled que sería ¿Estoy deshabilitado?)
    }
  }

  return (
    <Container>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title>Formulario para evaluacion de tutores</Card.Title>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Nombre del alumno</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa el nombre del alumno' name='Name'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Apellidos del alumno</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa los apellidos del alumno' name='Last_name'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa el correo institucional del alumno' type='email' name='Email'/> 
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
