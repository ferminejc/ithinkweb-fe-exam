/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useState} from 'react';
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
  const {modal, isHide, toggle, postUser, id, firstName, lastName, email} =
    props;

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
              <Input {...id} />
            </FormGroup>
            <FormGroup>
              <Label for="avatar">Avatar</Label>
              <Input type="file" name="avatar" id="avatar" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input {...email} />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input {...firstName} />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input {...lastName} />
            </FormGroup>
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              postUser();
            }}
          >
            Add
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserModal;
