import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddCabin;
