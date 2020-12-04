import React from 'react';
import { Form, Divider, Header, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Input } from './BuyInput';
import { connect } from 'react-redux';

const BuyForm = (props) => {
    console.log('props');
    return (
        <Form size='huge'>
            <Header as='h1' inverted size='huge'>
                <Icon name='settings' />
                <Header.Content>
                    Mckee Pure Water
                    <Header.Subheader>Customer water purchase</Header.Subheader>
                </Header.Content>
            </Header>
            <Divider section />
            <Form.Group>
                <Field
                    name='memberSince'
                    component={Input}
                    type='date'
                    config={{
                        className: 'BuySince',
                        label: 'Membership Since',
                        placeholder: '10/22/2020',
                        inverted: true,
                        icon: 'calendar',
                        iconPosition: 'left',
                        width: 3,
                    }}
                />
                <Field
                    name='todayDate'
                    component={Input}
                    type='date'
                    config={{
                        className: 'TodayDate',
                        label: 'Today Date',
                        placeholder: 'mm/dd/yyyy',
                        inverted: true,
                        icon: 'calendar',
                        iconPosition: 'left',
                        width: 3,
                    }}
                />
                <Form.Input hidden width={6} transparent={true} />
                <Field
                    name='account'
                    component={Input}
                    config={{
                        className: 'BuyAccount',
                        label: 'Account',
                        placeholder: '00000',
                        inverted: true,
                        icon: 'hashtag',
                        iconPosition: 'left',
                        width: 2,
                    }}
                    normalize={(value, preValue) => {
                        console.log(value);
                        if (value.length < 6) {
                            return value;
                        } else {
                            return preValue;
                        }
                    }}
                />
                <Field
                    name='record'
                    component={Input}
                    config={{
                        className: 'BuyRecord',
                        label: 'Record',
                        inverted: true,
                        icon: 'hashtag',
                        iconPosition: 'left',
                        placeholder: '00000',
                        width: 2,
                    }}
                    normalize={(value, preValue) => {
                        console.log(value);
                        if (value.length < 6) {
                            return value;
                        } else {
                            return preValue;
                        }
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Field
                    name='firstName'
                    component={Input}
                    type='text'
                    config={{
                        className: 'FirstName',
                        label: 'First Name',
                        placeholder: 'Hung',
                        inverted: true,
                        width: 3,
                    }}
                />
                <Field
                    name='lastName'
                    component={Input}
                    type='text'
                    config={{
                        className: 'LastName',
                        label: 'Last Name',
                        placeholder: 'Quach',
                        inverted: true,
                        width: 3,
                    }}
                />
                <Form.Input type='hidden' placeholder='2 Wide' width={6} />
                <Field
                    name='overGallon'
                    component={Input}
                    type='number'
                    config={{
                        className: 'OverGallon',
                        label: 'Gallon Over',
                        placeholder: '0',
                        inverted: true,
                        icon: 'cart',
                        iconPosition: 'left',
                        width: 2,
                    }}
                />
                <Field
                    name='totalGallon'
                    component={Input}
                    type='number'
                    config={{
                        className: 'LastRenew',
                        label: 'Total',
                        placeholder: '0',
                        inverted: true,
                        icon: 'cart',
                        iconPosition: 'left',
                        width: 2,
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Field
                    name='phone'
                    component={Input}
                    type='text'
                    config={{
                        className: 'FirstName',
                        label: 'Phone Number',
                        placeholder: '408-386-3089',
                        inverted: true,
                        width: 3,
                    }}
                />
                <Field
                    name='lastPurchaseDate'
                    component={Input}
                    type='date'
                    config={{
                        className: 'TodayDate',
                        label: 'Last Gallon Purchase',
                        placeholder: '10/23/2020',
                        inverted: true,
                        icon: 'calendar',
                        iconPosition: 'left',
                        width: 3,
                    }}
                />
                <Form.Input type='hidden' placeholder='2 Wide' width={6} />
                <Field
                    name='gallonBuy'
                    component={Input}
                    type='text'
                    config={{
                        type: 'text',
                        className: 'GallonBuy',
                        label: 'Gallon Buy',
                        placeholder: '0',
                        inverted: true,
                        icon: 'cart',
                        iconPosition: 'left',
                        width: 2,
                    }}
                />
                <Field
                    name='totalGallon'
                    component={Input}
                    type='text'
                    config={{
                        className: 'LastRenew',
                        label: 'Gallon Left',
                        placeholder: '0',
                        inverted: true,
                        icon: 'cart',
                        iconPosition: 'left',
                        width: 2,
                    }}
                />
            </Form.Group>
            <Divider section />
        </Form>
    );
};

function todayDate() {
    const today = new Date();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    const yyyy = today.getFullYear();

    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;

    return `${mm}/${dd}/${yyyy}`;
}

const mapStateToProps = (state) => {
    const {
        Phone,
        FirstName,
        LastName,
        MemberAccount,
        MembershipID,
        RemainingGallon,
        MemberSince,
    } = state.membership.member || '';
    return {
        initialValues: {
            phone: Phone || '(xxx)-xxx-xxxx',
            firstName: FirstName || 'first name',
            lastName: LastName || 'last name',
            account: MemberAccount || 'xxxxx',
            record: MembershipID || 'xxxxx',
            totalGallon: RemainingGallon || '0',
            memberSince: MemberSince || '00/00/00',
            todayDate: todayDate(),
        },
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({ form: 'buy', enableReinitialize: true })(BuyForm));
