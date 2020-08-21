// ns__file unit: list, comp: Item

// ns__custom_start unit: list, comp: Item, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom` with`start`
    and `// ns__custom` with `end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: list, comp: Item, loc: beforeImports

import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import PropTypes from 'prop-types';
import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';


// ns__custom_start unit: list, comp: Item, loc: addedImports

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddDialog from '../../../custom/AddDialog';

// ns__custom_end unit: list, comp: Item, loc: addedImports

// ns__custom_start unit: list, comp: Item, loc: styling
// add styling here
// const ItemStyleWrapper = styled.div(({
//   selected,
//   isDeleting,
// }) => `
//   margin: 2em 1em;
//   padding: 1.5em;
//   border: ${selected ? '1px solid aquamarine' : '1px solid white'};
//   border-radius: 10px;
//   box-shadow: 5px 5px 10px #888888;
//   background-color: ${isDeleting && 'tomato'};
//   cursor: ${selected ? 'auto' : 'pointer'};

//   &:hover {
//     border: 1px solid aquamarine;
//   }
// `);

const ItemStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
.MuiSvgIcon-root {
  font-size: 300%;
}
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #888888;
  padding: 1em;
  cursor: ${selected ? 'auto' : 'pointer'};
  &:hover {
    border: 1px solid aquamarine;
  }
`);

const SymbolSpan = styled.span`
  color: #4fd1c5;
  font-size: 300%;
`;
const ExpandMoreIconWrapper = styled(ExpandMoreIcon)`
.MuiSvgIcon-root {
  font-size: 300%;
}
  color: #4fd1c5;
  font-size: 300%!;
`;

const ExpandLessIconWrapper = styled(ExpandLessIcon)`
.MuiSvgIcon-root {
  font-size: 300%;
}
  color: #4fd1c5;
  font-size: 300%!;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4fd1c5;
  border-radius: 50%;
  text-align: center;
  vertical-align: center;
`;

const Serial = styled.p`
  color: white;
`;

const BigRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  width: -webkit-fill-available;
`;

const MidRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: -webkit-fill-available;
`;

const SmallRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

// ns__custom_end unit: list, comp: Item, loc: styling

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${(props) => props.hoverColor || '#000000'};
  }
`;

function Item({
  item,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  index,
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  // ns__custom_start unit: list, comp: Item, loc: beginning
  /* any special declarations etc. */
  const [openAdd, setOpenAdd] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const [title, setTitle] = useState("");
  const [label, setLabel] = React.useState("");
  const [submitButton, setSubmitButton] = React.useState('');
  const [gotResponse, setGotResponse] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');
  const [completedMessage, setCompletedMessage] = React.useState('');
  const [closeButton, setCloseButton] = React.useState('OKAY');
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);

  // ns__custom_end unit: list, comp: Item, loc: beginning




  if (!selected) {
    return (
      <ItemStyleWrapper onClick={() => onSelect(item.id)}>
        <BigRow>
          <MidRow>
            <Circle><Serial>{(index > 8 ? index + 1 : '0' + (index + 1))}</Serial></Circle>
            <p>{itemValue}</p>
            {/* <SymbolSpan>&#94;</SymbolSpan> */}
            <ExpandMoreIconWrapper />
          </MidRow>
        </BigRow>
      </ItemStyleWrapper>
    );
  }

  const handleItemValueChange = (e) => {
    e.preventDefault();
    console.log("editing value : ", e.target.value);
    updateItemValue(e.target.value);
  }

  async function handleItemValueSave() {
    updateIsSaving(true);

    const editItemResponse = await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: item.id,
        }),
      },
      refetchQueries,
    });

    console.log('editItemResponse : ', editItemResponse);
    if (editItemResponse.data.Execute !== null && editItemResponse.data.Execute !== undefined) {
      setGotResponse(true);
      // setCompletedMessage()
      // completedMessage
      // setTimeout(() => {
      //   setOpenAdd(false);
      // }, 12000);
    }

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleKeyPress(e) {
    e.preventDefault();
    // if (e.charCode === 13) {
    //   handleItemValueSave(e);
    // }
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
    setEditMode(false);
    // setOpenAdd(false);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setLabel("Task Name");
    setTitle("Edit Task");
    setSubmitButton("SAVE");
    setLoadingMessage("Saving changes...");
    setCompletedMessage("Changes saved");
    setCloseButton("OKAY");
    updateIsEditMode(true);
    setEditMode(true);
    setOpenAdd(true);
  }
  // if (isEditMode) {

  //   setEditMode(true);
  //   // setSubmitButton()

  //   // return (
  //   //   <ItemStyleWrapper>
  //   //     <EditInstanceForm
  //   //       id={item.id}
  //   //       label='Item Value:'
  //   //       value={itemValue}
  //   //       onChange={handleItemValueChange}
  //   //       onSave={handleItemValueSave}
  //   //       onCancel={handleCancelEdit}
  //   //       disabled={isSaving}
  //   //     />
  //   //   </ItemStyleWrapper>
  //   // );
  // }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ITEM_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: item.id,
          }),
        },
        refetchQueries,
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
    setDeleteMode(false);
    setOpenAdd(false);
  }

  const handleRemove = (e) => {
    e.preventDefault();
    setLabel(`Are you sure to delete your task ${itemValue}  ?`);
    setTitle("Delete Task");
    setSubmitButton("DELETE");
    setLoadingMessage("Deleting task...");
    setCompletedMessage("Task has been successfully deleted");
    setCloseButton("OKAY");
    updateIsDeleteMode(true);
    setDeleteMode(true);
    setOpenAdd(true);
  }

  // if (isDeleteMode) {
  //   return (
  //     <ItemStyleWrapper
  //       selected={selected}
  //       isDeleting={isDeleting}
  //     >
  //       {itemValue}
  //       <DeleteInstanceMenu
  //         onDelete={handleDelete}
  //         onCancel={handleCancelDelete}
  //         disabled={isDeleting}
  //       />
  //     </ItemStyleWrapper>
  //   );
  // }

  // ns__custom_end unit: list, comp: ItemCreationForm, loc: beforeReturn

  // const handleDetails = (e) => {
  //   e.preventDefault();

  // }

  // ns__custom_end unit: list, comp: ItemCreationForm, loc: beforeReturn





  // <ItemStyleWrapper selected={selected}>
  //   { itemValue }
  //   <Button type='button'   onClick={() => updateIsEditMode(true)}>
  //     &#9998;
  //   </Button>
  //   <Button type='button'   onClick={() => updateIsDeleteMode(true)}>
  //     &#128465;
  //   </Button>
  // </ItemStyleWrapper>
  return (
    <ItemStyleWrapper selected={selected}>
      <BigRow>
        <MidRow>
          {
            console.log(index)
          }
          <Circle><Serial>{(index > 8 ? index + 1 : '0' + (index + 1))}</Serial></Circle>
          <p>{itemValue}</p>
          <ExpandLessIconWrapper />
        </MidRow>
      </BigRow>
      <BigRow>
        <MidRow>
          <SmallRow
            // onClick={() => updateIsEditMode(true)}
            onClick={(e) => handleEdit(e)}
          ><MdEdit size={25} />Edit</SmallRow>
          <SmallRow onClick={(e) => handleRemove(e)}><MdDelete size={25} style={{ fill: '#f56565' }} />Delete</SmallRow>
        </MidRow>
      </BigRow>

      {
        isEditMode &&
        <AddDialog
          title={title}
          label={label}
          submitButton={submitButton}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          openAdd={openAdd}
          handleCloseAddDialog={handleCancelEdit}
          loading={isSaving}
          handleChange={handleItemValueChange}
          handleKeyPress={handleKeyPress}
          itemValue={itemValue}
          handleSubmit={handleItemValueSave}
          completed={gotResponse}
          loadingMessage={loadingMessage}
          completedMessage={completedMessage}
          closeButton={closeButton}
          editMode={editMode}
          deleteMode={deleteMode}
          isEditMode={isEditMode}
        />
      }

      {
        isDeleteMode &&
        <AddDialog
          title={title}
          label={label}
          submitButton={submitButton}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          openAdd={openAdd}
          handleCloseAddDialog={handleCancelDelete}
          loading={isSaving}
          handleChange={handleItemValueChange}
          handleKeyPress={handleKeyPress}
          itemValue={itemValue}
          handleSubmit={handleDelete}
          completed={gotResponse}
          loadingMessage={loadingMessage}
          completedMessage={completedMessage}
          closeButton={closeButton}
          editMode={editMode}
          deleteMode={isDeleteMode}
          isEditMode={isEditMode}
        />
      }
    </ItemStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);


Item.propTypes = {
  item: PropTypes.object,
  parentId: PropTypes.string,
  selected: PropTypes.bool,
  updateInstance: PropTypes.func,
  deleteInstance: PropTypes.func,
  refetchQueries: PropTypes.array,
  app: PropTypes.shape({
    children: PropTypes.array,
    id: PropTypes.string,
  }),
  // ns__custom_start unit: list, comp: Item, loc: addedPropTypes
  // ns__custom_end unit: list, comp: Item, loc: addedPropTypes
};
