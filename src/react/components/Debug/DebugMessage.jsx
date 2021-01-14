import React from 'react';
import { Form, Message, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { formValueSelector } from 'redux-form';

const DebugMessage = (props) => (
    <Form.Group>
        <Divider hidden />
        <Message>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Message>
    </Form.Group>
);

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        membership: state.membership,
        account: state.account,
        loginForm: state.form.user ? state.form.user.values : {},
        findForm: state.form.membership
            ? {
                  values: state.form.membership.values,
                  submitSucceeded: state.form.membership.submitSucceeded,
              }
            : {},
    };
};

export default connect(mapStateToProps, null)(DebugMessage);
