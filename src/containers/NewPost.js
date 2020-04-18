import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';

const afterSubmit = (result, dispatch) =>
  dispatch(reset('post'));

const NewPost = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <Field name="body" component="input" type="text" />
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  )
};

export default reduxForm({
  form: 'post',
  onSubmitSuccess: afterSubmit,
})(NewPost);