import React, { useEffect, useState } from 'react-redux';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { channels } from '../../../shared/constants';
import FindGrid from '../Grid/Grid';
import FindForm from './FindForm`';
const { ipcRenderer } = window;

function FindContainer(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');

    useEffect(() => {
        console.log('FindContainer', { props });
    });

    return (
        <FindGrid>
            <FindForm
                size='large'
                handleSubmit={props.handleSubmit((values) => {})}
                iconColor={iconColor}
                errorMessage={errorMessage}
                phone={props.phone}
                account={props.account}
                firstName={props.firstName}
                lastName={props.lastName}
            />
        </FindGrid>
    );
}

FindContainer.defaultProps = {};
FindContainer.propTypes = {};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('membership');
    return {
        phone: selectFormData(state, 'phone') || '',
        account: selectFormData(state, 'account') || '',
        firstName: selectFormData(state, 'firstName') || '',
        lastName: selectFormData(state, 'lastName') || '',
        submitSucceeded: state.form.membership
            ? state.form.membership.submitSucceeded
            : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => dispatch(reset('membership')),
    };
};

const ReduxFindFrom = reduxForm({ form: 'membership' })(FindContainer);
export default connect(mapStateToProps, mapDispatchToProps)(ReduxFindFrom);
