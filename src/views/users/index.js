import axios from 'axios';
import UserModal from 'components/shared/UserModal';
import React, {useState, useEffect} from 'react';
import {
  Container,
  Table,
  CardImg,
  Button,
  PaginationItem,
  PaginationLink,
  Pagination,
} from 'reactstrap';

function Index() {
  let id = useFormInput('', 'number');
  let firstName = useFormInput('', 'text');
  let lastName = useFormInput('', 'text');
  let email = useFormInput('', 'email');

  const [users, setUsers] = useState();
  const [isHide, setIsHide] = useState(false);
  const [modal, setModal] = useState({
    title: 'Add User',
  });

  const toggle = () => setIsHide(!isHide);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const result = await axios('https://reqres.in/api/users');
    setUsers(result.data.data);
    console.log(result.data.data);
  }

  function postUser() {
    axios
      .post('https://reqres.in/api/users', {
        id: id.value,
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
      })
      .then(function (response) {
        setUsers([...users, response.data]);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function useFormInput(initialValue, type) {
    const [value, setValue] = useState(initialValue);

    function onChange(e) {
      setValue(e.target.value);
    }

    return {
      value,
      type,
      onChange,
    };
  }
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const pages = [];
  for (let i = 1; i <= Math.ceil(users?.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    console.log(event);
    setcurrentPage(Number(event));
  };

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <PaginationItem
          key={number}
          id={number}
          onClick={() => handleClick(number)}
          className={currentPage == number ? 'active' : null}
        >
          <PaginationLink>{number}</PaginationLink>
        </PaginationItem>
      );
    } else {
      return null;
    }
  });

  const renderButton = () => {
    let button = <></>;
    console.log(modal);
    if (modal.title === 'Add User') {
      button = (
        <Button
          color="primary"
          onClick={() => {
            toggle();
            postUser();
          }}
        >
          Create
        </Button>
      );
    } else if (modal.title === 'Edit User') {
      button = (
        <Button
          color="warning"
          onClick={() => {
            toggle();
          }}
        >
          Update
        </Button>
      );
    } else if (modal.title === 'Delete User') {
      button = (
        <Button
          color="danger"
          onClick={() => {
            toggle();
          }}
        >
          Confirm
        </Button>
      );
    }
    return button;
  };

  const getSelectedUser = (user) => {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      id: user.id,
    };
  };

  const renderUsers = (users) => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return (
      <>
        {users ? (
          users?.slice(firstPageIndex, lastPageIndex).map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>
                <CardImg
                  top
                  width="100%"
                  src={user.avatar}
                  alt="Card image cap"
                />
              </td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <Button
                  className="mr-3 mb-1"
                  color="warning"
                  onClick={() => {
                    setModal({
                      title: 'Edit User',
                      ...getSelectedUser(user),
                    });
                    toggle();
                  }}
                >
                  Edit
                </Button>

                <Button
                  className="mr-3 mb-1"
                  color="danger"
                  onClick={() => {
                    setModal({
                      title: 'Delete User',
                      ...getSelectedUser(user),
                    });
                    toggle();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Container>
      <UserModal
        modal={modal}
        renderButton={renderButton}
        isHide={isHide}
        toggle={toggle}
        id={id}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
      <div className="mt-3 text-right">
        <Button
          className="mr-3 mb-1"
          color="primary"
          onClick={() => {
            setModal({
              title: 'Add User',
            });
            toggle();
          }}
        >
          Add User
        </Button>
      </div>

      <Table className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions Button</th>
          </tr>
        </thead>
        <tbody>{renderUsers(users)}</tbody>
      </Table>
      <Pagination>
        <PaginationItem disabled={currentPage === pages[0] ? true : false}>
          <PaginationLink first onClick={handlePrevbtn} />
        </PaginationItem>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <PaginationItem
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          <PaginationLink last onClick={handleNextbtn} />
        </PaginationItem>
      </Pagination>
    </Container>
  );
}

export default Index;
