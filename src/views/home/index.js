import React from 'react';
import {Container, Jumbotron} from 'reactstrap';
import styles from './Home.scss';

function Index() {
  return (
    <Container className={styles['home']}>
      <Jumbotron className="mt-5 fadeInUp">
        <h1 className="display-4 fadeInDown">John Christian E. Fermin</h1>
        <address className="fadeInRight">
          <a href="mailto:ferminejc@gmail.com">ferminejc@gmail.com</a>
        </address>
        <address className="fadeInLeft">
          <a
            href="https://www.linkedin.com/in/jc-fermin-1846801b0/"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
          >
            Visit my LinkedIn
          </a>
        </address>
      </Jumbotron>
    </Container>
  );
}

export default Index;
