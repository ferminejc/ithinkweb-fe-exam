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
  const {modal, isHide, toggle, id, firstName, lastName, email, renderButton} =
    props;

  return (
    <div>
      <Modal isOpen={isHide} toggle={toggle} className={modal?.className}>
        <ModalHeader toggle={toggle}>{modal.title}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="id">ID</Label>
            <Input {...id.attrib} />
          </FormGroup>
          <FormGroup>
            <Label for="avatar">Avatar</Label>
            <Input type="file" name="avatar" id="avatar" />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input {...firstName.attrib} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input {...lastName.attrib} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input {...email.attrib} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          {renderButton()}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserModal;
