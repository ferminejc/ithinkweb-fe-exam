import React from 'react';
import {Container, Jumbotron} from 'reactstrap';
import styles from './Home.scss';

function Index() {
  return (
    <Container className={styles['home']}>
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
