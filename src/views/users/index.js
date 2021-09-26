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
import styles from './Users.scss';

function Index() {
  let id = useFormInput('', 'number', true);
  let avatar = useFormInput('', 'file');
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

  function useFormInput(initialValue, type, initialDisableValue) {
    const [value, setValue] = useState(initialValue);
    const [disabled, setDisabled] = useState(initialDisableValue);

    function handleChange(e) {
      setValue(e.target.value);
    }

    return {
      attrib: {
        value,
        type,
        disabled,
        onChange: handleChange,
      },
      func: {
        setValue,
        setDisabled,
      },
    };
  }
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const pages = [];
  for (let i = 1; i <= Math.ceil(users?.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
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

    if ((currentPage - 1) % pageNumberLimit === 0) {
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
          className={currentPage === number ? 'active' : null}
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
            updateUser();
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
            deleteUser(id.attrib.value);
            toggle();
          }}
        >
          Confirm
        </Button>
      );
    }
    return button;
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
                  className={styles['card-img']}
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
                    populateUser(user, false);
                    setModal({
                      title: 'Edit User',
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
                    populateUser(user, true);

                    setModal({
                      title: 'Delete User',
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

  async function getUsers() {
    const result = await axios('https://reqres.in/api/users');
    setUsers(result.data.data);
  }

  function postUser() {
    axios
      .post('https://reqres.in/api/users', {
        id: id.attrib.value,
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
        first_name: firstName.attrib.value,
        last_name: lastName.attrib.value,
        email: email.attrib.value,
      })
      .then(function (response) {
        setUsers([...users, response.data]);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateUser() {
    axios
      .put('https://reqres.in/api/users/1', {
        id: id.attrib.value,
        avatar: users[id.attrib.value - 1].avatar,
        first_name: firstName.attrib.value,
        last_name: lastName.attrib.value,
        email: email.attrib.value,
      })
      .then(function (response) {
        const newUsers = users.map((e) => {
          if (e.id === id.attrib.value) {
            console.log(e.id);
            return {
              ...e,
              avatar: response.data.avatar,
              email: response.data.email,
              first_name: response.data.first_name,
              id: response.data.id,
              last_name: response.data.last_name,
              updatedAt: response.data.updated_at,
            };
          } else {
            return e;
          }
        });
        setUsers(newUsers);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function deleteUser(id) {
    const result = await axios.delete('https://reqres.in/api/users/' + id);
    const newUsers = users.filter((e) => e.id !== id);
    setUsers(newUsers);
    console.log(result);
  }

  function populateUser(user, isDisabled) {
    id.func.setValue(user.id);
    firstName.func.setValue(user.first_name);
    lastName.func.setValue(user.last_name);
    email.func.setValue(user.email);
    if (isDisabled) {
      avatar.func.setDisabled(true);
      firstName.func.setDisabled(true);
      lastName.func.setDisabled(true);
      email.func.setDisabled(true);
    }
  }

  function reset(user) {
    id.func.setValue('');
    firstName.func.setValue('');
    lastName.func.setValue('');
    email.func.setValue('');

    avatar.func.setDisabled(false);
    firstName.func.setDisabled(false);
    lastName.func.setDisabled(false);
    email.func.setDisabled(false);
  }

  const generateUserID = () => {
    const id = users[users.length - 1].id;
    return id + 1;
  };

  return (
    <Container className={styles['users']}>
      <UserModal
        modal={modal}
        renderButton={renderButton}
        isHide={isHide}
        toggle={toggle}
        avatar={avatar}
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
            reset();
            id.func.setValue(generateUserID());
            setModal({
              title: 'Add User',
            });
            toggle();
          }}
        >
          Add User
        </Button>
      </div>

      <Table className="mt-3 fadeInDown">
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
