import React from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';

const SearchPage = props => {
  const { searchText } = props;

  return (
    <Form>
      <FormGroup>
        <FormControl type="search" placeholder="Enter search" onChange={e => searchText(e.target.value)} />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </FormGroup>
    </Form>
  );
};

export default SearchPage;
