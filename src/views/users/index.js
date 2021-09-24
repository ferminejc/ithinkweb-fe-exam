import axios from 'axios';
import UserModal from 'components/shared/UserModal';
import React, {useState, useEffect} from 'react';
import {Container, Table, CardImg, Button} from 'reactstrap';

function Index() {
  const [users, setUsers] = useState();
  const [isHide, setIsHide] = useState(false);
  const [modal, setModal] = useState({
    title: 'Add',
  });
  const toggle = () => setIsHide(!isHide);

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        const {data: body} = response;
        // handle success
        setUsers(body.data);
        console.log(body.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  function postUser() {
    axios
      .post('https://reqres.in/api/users', {
        id: Date.now() + Math.random(),
        firstName: 'Fred',
        lastName: 'Flintstone',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const id = useFormInput('', 'number');
  const firstName = useFormInput('', 'text');
  const lastName = useFormInput('', 'text');
  const email = useFormInput('', 'email');
  
  function useFormInput(initialValue, type) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      setValue(e.target.value);
    }

    return {
      value,
      type,
      onChange: handleChange,
    };
  }

  return (
    <Container>
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

        <tbody>
          {users ? (
            users?.map((user, index) => (
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
                    color="success"
                    onClick={() => {
                      setModal({
                        title: 'Edit User',
                      });
                      toggle();
                    }}
                  >
                    Edit User
                  </Button>

                  <Button
                    className="mr-3 mb-1"
                    color="danger"
                    onClick={() => {
                      setModal({
                        title: 'Delete User',
                      });
                      toggle();
                    }}
                  >
                    Delete User
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      <UserModal
        modal={modal}
        isHide={isHide}
        toggle={toggle}
        postUser={postUser}
        id={id}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    </Container>
  );
}

export default Index;
