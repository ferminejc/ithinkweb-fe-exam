/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from 'reactstrap';

const UserModal = (props) => {
  const {modal, isHide, toggle} = props;
  return (
    <div>
      <Modal isOpen={isHide} toggle={toggle} className={modal?.className}>
        <ModalHeader toggle={toggle}>{modal.title}</ModalHeader>
        {modal === 'Add' ? (
          <></>
        ) : (
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input
                type="text"
                name="id"
                id="id"
                placeholder="Enter your ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="avatar">Avatar</Label>
              <Input type="file" name="avatar" id="avatar" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email (example: helloworld@gmail.com)"
              />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your First Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your Last Name."
              />
            </FormGroup>
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={toggle}>
            Add
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserModal;
