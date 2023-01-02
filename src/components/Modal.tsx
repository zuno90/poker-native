import React from "react";

import { Button, Modal } from "native-base";

interface IModal {
  state: boolean;
  handleOpen?: () => void;
  handleSubmit?: Promise<any>;
  handleClose: () => void;

  children?: any;
}

const CustomModal = (props: IModal) => {
  // const { active, handleOpen, handleClose } = useControlModal();

  return (
    <>
      <Modal isOpen={props.state} onClose={props.handleClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            {/* <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl> */}

            {props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={props.handleClose}
              >
                Cancel
              </Button>
              {/* <Button onPress={() =>{props.handleSubmit}}>Save</Button> */}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CustomModal;
