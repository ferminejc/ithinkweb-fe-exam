import React from 'react';
import {Container, Table, Button, Modal} from 'reactstrap';

function Index() {
  return (
    <Container>
      <div className="mt-3 text-right">
        <Button color="primary">+ Add User</Button>
      </div>

      <Table className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions Button</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Pic</td>
            <td>John</td>
            <td>Fermin</td>
            <td>
              <Button color="success" className="mr-3">
                Edit
              </Button>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Index;
