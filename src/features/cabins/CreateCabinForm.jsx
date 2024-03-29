import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';

import useCreateCabin from './hooks/useCreateCabin';
import useEditCabin from './hooks/useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { id: cabinId, ...editValues } = cabinToEdit;
  const isEditable = Boolean(cabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditable ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    const cabinData = {
      ...data,
      regularPrice: 1 * data.regularPrice,
      discount: 1 * data.discount,
      maxCapacity: 1 * data.maxCapacity,
      image,
    };

    if (isEditable) {
      editCabin(
        { newCabinData: cabinData, id: cabinId },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createCabin(cabinData, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const onErrors = (error) => {
    // console.log(error);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be more than 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value * 1 <= getValues().regularPrice * 1 ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: isEditable ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={onClose} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditable ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
