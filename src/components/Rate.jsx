import React from 'react'
import { Table, Col, Row, Container } from 'react-bootstrap';

const Rate = (props) => {
  const [code, name] = props.id
  const date = new Date();
  return (
    <>
      <h2>Курс <u>{name}</u> на сегодня</h2>
      <Container>
        <Row>
          <Col>{date.toDateString()}</Col>
        </Row>
      </Container>

      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th>Код</th>
          <th>Валюта</th>
          <th>Курс (по отношению к EUR)</th>
          <th>Флаг</th>
        </tr>
        </thead>
        <tbody>
            <tr >
              <td>{code}</td>
              <td>{name}</td>
              <td>{props.rate}</td>
              <td><img src={URL.createObjectURL(props.flag)} alt='img'/></td>
            </tr>
        })}

        </tbody>
      </Table>
    </>
  );
}

export default Rate;
