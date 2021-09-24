import React from 'react';
import {Container, Jumbotron} from 'reactstrap';

function Index() {
  return (
    <Container>
      <Jumbotron className="mt-5">
        <h1 className="display-4">John Christian E. Fermin</h1>
        <address>
          <a href="mailto:ferminejc@gmail.com">ferminejc@gmail.com</a>
        </address>
      </Jumbotron>
    </Container>
  );
}

export default Index;
