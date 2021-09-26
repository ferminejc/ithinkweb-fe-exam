import styles from './Page.module.scss';
import React from 'react';
import PageNav from './PageNav';
import PageMain from './PageMain';

function Page(props) {
  const {children} = props;

  return (
    <div className={styles['page']}>
      <PageNav />
      <PageMain>{children}</PageMain>
    </div>
  );
}

export default Page;
