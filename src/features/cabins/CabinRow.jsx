import { useState } from 'react';
import styled from 'styled-components';

import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from '../cabins/CreateCabinForm';
import useDeleteCabin from './hooks/useDeleteCabin';
import useCreateCabin from './hooks/useCreateCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Row from '../../ui/Row';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const {
    id: cabinId,
    name,
    image,
    regularPrice,
    discount,
    maxCapacity,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
      description,
    });
  };

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt="cabin-image" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <Row type="horizontal">
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack size={17} />
          </button>
          <button onClick={() => setIsOpenModal(!isOpenModal)}>
            <HiPencil size={17} />
          </button>

          {/* <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiTrash size={18} />
          </button> */}
          <button
            onClick={() => setIsConfirmDelete(!isConfirmDelete)}
            disabled={isDeleting}
          >
            <HiTrash size={18} />
          </button>
        </Row>
      </TableRow>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            onClose={() => setIsOpenModal(false)}
            cabinToEdit={cabin}
          />
        </Modal>
      )}

      {isConfirmDelete && (
        <Modal onClose={() => setIsConfirmDelete(false)}>
          <ConfirmDelete
            onConfirm={() => deleteCabin(cabinId)}
            onClose={() => setIsConfirmDelete(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CabinRow;
