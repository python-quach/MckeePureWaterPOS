import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { normalizeAreaCode, normalizeInput } from '../../helpers/helpers';

const AddForm = (props) => {
    return (
        <Form size='large'>
            <Form.Group>
                <Field
                    name='todayDate'
                    className='TodayDate'
                    inverted={true}
                    icon='calendar'
                    placeholder='mm/dd/yyyy'
                    iconPosition='left'
                    readOnly
                    width={2}
                    component={Form.Input}
                    label='Today Date'
                />
                <Field
                    name='todayTime'
                    label='Current Time'
                    component={Form.Input}
                    className='TodayDate'
                    inverted={true}
                    placeholder='00:00:00 PM'
                    icon='time'
                    iconPosition='left'
                    readOnly
                    width={2}
                />
                <Form.Input type='hidden' width={8} />
                <Field
                    name='memberSince'
                    label='Member Since'
                    readOnly
                    className='TodayDate'
                    component={Form.Input}
                    inverted={true}
                    placeholder='mm/dd/yyy'
                    icon='calendar'
                    iconPosition='left'
                    width={2}
                />
                <Field
                    readOnly
                    label='Account'
                    name='account'
                    className='BuyAccount'
                    placeholder='xxxxxx'
                    component={Form.Input}
                    inverted={true}
                    icon='hashtag'
                    iconPosition='left'
                    width={2}
                />
                <Field
                    label='Invoice'
                    name='record_id'
                    component={Form.Input}
                    className='TodayDate'
                    placeholder='xxxxxxx'
                    inverted={true}
                    icon='hashtag'
                    iconPosition='left'
                    width={2}
                />
            </Form.Group>
            <Form.Group>
                <Field
                    id='areaCode'
                    className='AreaCode'
                    inverted={true}
                    name='areaCode'
                    width={1}
                    placeholder='xxx'
                    component={Form.Input}
                    label='Area Code'
                    normalize={normalizeAreaCode}
                />
                <Field
                    id='Phone'
                    className='PhoneNumber'
                    inverted={true}
                    name='phone'
                    placeholder='xxx-xxxx'
                    width={2}
                    component={Form.Input}
                    label='Phone Number'
                    normalize={normalizeInput}
                />

                {/* <Field
                    className='Test'
                    inverted={true}
                    name='fullname'
                    width={3}
                    component={Form.Input}
                    label='Customer Name'
                /> */}
                <Field
                    name='firstName'
                    inverted={true}
                    className='PhoneNumber'
                    width={2}
                    component={Form.Input}
                    label='First Name'
                />
                {/* <Form.Input type='hidden' width={7} /> */}
                <Form.Input type='hidden' width={7} />
                <Form.Input
                    className='AreaCode'
                    width={1}
                    readOnly
                    inverted={true}
                    label='Current'
                    name='currentGallon'
                    disabled={props.disableBuyInput}
                    // value={props.currentGallon || 0}
                    value={props.currentGallon < 0 ? 0 : props.currentGallon}
                />
                <Form.Input
                    id='buy'
                    name='gallonBuy'
                    label='Buy'
                    className='AreaCode'
                    value={props.gallonBuy}
                    disabled={props.disableBuyInput}
                    inverted={true}
                    width={1}
                    onChange={props.handleBuyValue}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? props.buyWaterGallon(e)
                            : null
                    }
                />

                <Form.Input
                    className={
                        props.gallonBuy > props.currentGallon
                            ? 'Remain'
                            : 'AreaCode'
                    }
                    width={1}
                    readOnly
                    type='text'
                    inverted={true}
                    label='Remain'
                    value={props.gallonAfterBuy || 0}
                />
                <Form.Button
                    content='Buy'
                    size='large'
                    style={{
                        marginTop: '30px',
                    }}
                    color='green'
                    disabled={props.disabledBuyButton}
                    onClick={props.buyWaterGallon}
                    width={1}
                />
            </Form.Group>
            <Form.Group>
                {/* <Form.Input type='hidden' width={13} /> */}
                <Form.Input type='hidden' width={12} />
                <Form.Input
                    id='renew'
                    label='Renew Fee'
                    name='renewalFee'
                    className='AreaCode'
                    value={props.renewalFee}
                    disabled={props.disableRenewInput}
                    inverted={true}
                    onChange={props.handleRenewalFee}
                    width={1}
                />
                <Form.Input
                    label='Gallon'
                    name='renewalAmount'
                    className='AreaCode'
                    value={props.renewAmount}
                    disabled={props.disableRenewInput}
                    inverted={true}
                    onChange={props.handleRenewalAmount}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? props.renewWaterGallon(e)
                            : null
                    }
                    width={1}
                />
                <Form.Button
                    content='Add Membership'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    disabled={props.disableRenewButton}
                    onClick={props.renewWaterGallon}
                    // width={1}
                />
            </Form.Group>
        </Form>
    );
};

export default AddForm;
