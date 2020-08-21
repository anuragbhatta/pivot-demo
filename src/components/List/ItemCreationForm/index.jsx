// ns__file unit: list, comp: ItemCreationForm
// ns__custom_start unit: list, comp: ItemCreationForm, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom with start`
    and `// ns__custom with end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: list, comp: ItemCreationForm, loc: beforeImports
import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import {
  CREATE_ITEM_FOR_LIST_ACTION_ID
} from '../../../config';

// ns__custom_start unit: list, comp: ItemCreationForm, loc: addedImports

//  import AddDialog from '../../../custom/AddDialog';
import { Fragment } from 'react';
import AddDialog from '../../../custom/AddDialog';

// ns__custom_end unit: list, comp: ItemCreationForm, loc: addedImports

// ns__custom_start unit: list, comp: ItemCreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;

// border-solid border-2 border-gray-600 rounded-md mt-8
const ButtonWrapper = styled.div`
  border: 2px solid gray;
  border-radius : 20px;
  margin: 8px;
  margin-left: 50px;
  margin-right: 0px;
`;

const H1Wrapper = styled.h1`
  color: #4fd1c5;
  font-size: 200%;
`;

const AddButton = styled.button`
  margin: 5px;
  border: none;
  background-color: none;
`;

const SymbolSpan = styled.span`
  color: #4fd1c5;
  font-size: 300%;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4fd1c5;
  border-radius: 50%;
  padding-top: 8px;
`;

const TopRow = styled.div`
  margin-top: 5px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: row;
`;

const BigRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const MidRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: -webkit-fill-available
`;

const SmallRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
// ns__custom_end unit: list, comp: ItemCreationForm, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function ItemCreationForm({
  userId,
  createItem,
  refetchQueries,
  // ns__custom_start unit: list, comp: ItemCreationForm, loc: addedProps
  // ns__custom_end unit: list, comp: ItemCreationForm, loc: addedProps
}) {
  const [itemValue, updateItemValue] = useState('');
  const [loading, updateLoading] = useState(false);
  // ns__custom_start unit: list, comp: ItemCreationForm, loc: beginning
  /* any special declarations etc. */
  const [openAdd, setOpenAdd] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const [title, setTitle] = useState("Create a Task");
  const [label, setLabel] = React.useState("Task Name");
  const [submitButton, setSubmitButton] = React.useState('Add');
  const [gotResponse, setGotResponse] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('Creating Task...');
  const [completedMessage, setCompletedMessage] = React.useState('Task successfully created!');
  const [closeButton, setCloseButton] = React.useState('OKAY');
  
  // ns__custom_end unit: list, comp: ItemCreationForm, loc: beginning

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);

    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    console.log('createItemResponse : ', createItemResponse);
    if(createItemResponse.data.Execute !== null && createItemResponse.data.Execute !== undefined ){
      setGotResponse(true);
      // setCompletedMessage()
      // completedMessage
      // setTimeout(() => {
      //   setOpenAdd(false);
      // }, 12000);
    }
    // const newItemData = JSON.parse(createItemResponse.data.Execute);
    updateItemValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  // ns__custom_start unit: list, comp: ItemCreationForm, loc: beforeReturn
  // anurag functions
  const handleOpenAddDialog = (e) => {
    e.preventDefault();
    setOpenAdd(true);
  }

  const handleCloseAddDialog = (e) => {
    e.preventDefault();
    setOpenAdd(false);
  }
  // ns__custom_end unit: list, comp: ItemCreationForm, loc: beforeReturn

  // ns__start_section unit: list, comp: ItemCreationForm, loc: return

  // <Form>
  // <label htmlFor='item-value'>
  //       Item:
  //       <input
  //         id='item-value'
  //         type='text'
  //         onChange={handleChange}
  //         onKeyPress={handleKeyPress}
  //         value={ itemValue }
  //         disabled={loading}
  //       />
  //     </label>
  //     <Button type='submit'  disabled={loading}  onClick={handleSubmit}>
  //     {
  //         loading
  //           ? 'Creating Item...'
  //           : 'Create Item'
  //       }
  //     </Button>
  // </Form>

  return (
    <Fragment>
      <TopRow>
        <MidRow>
          <H1Wrapper>MultiTask</H1Wrapper>
          <ButtonWrapper>
            <AddButton onClick={(e) => { handleOpenAddDialog(e) }}> + Add Task</AddButton>
          </ButtonWrapper>
        </MidRow>
      </TopRow>

      <AddDialog
        title={title}
        label={label}
        submitButton={submitButton}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        openAdd={openAdd}
        handleCloseAddDialog={handleCloseAddDialog}
        loading={loading}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        itemValue={itemValue}
        handleSubmit={handleSubmit}
        completed={gotResponse}
        loadingMessage={loadingMessage}
        completedMessage={completedMessage}
        closeButton={closeButton}
      />
    </Fragment>
  );
  // ns__end_section unit: list, comp: ItemCreationForm, loc: return

}

export default compose(
  graphql(EXECUTE, { name: 'createItem' }),

)(ItemCreationForm);
