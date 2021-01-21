import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { normalizeAreaCode, normalizeInput } from '../../helpers/helpers';

const BuyForm = (props) => {
    return (
        <Form size='large'>
            <Form.Group>
                <Form.Input
                    name='todayDate'
                    label='Today Date'
                    value={props.date}
                    className='TodayDate'
                    inverted={true}
                    icon='calendar'
                    placeholder='mm/dd/yyyy'
                    iconPosition='left'
                    readOnly
                    width={2}
                />
                <Form.Input
                    name='todayTime'
                    label='Current Time'
                    value={props.time}
                    className='TodayDate'
                    inverted={true}
                    placeholder='00:00:00 PM'
                    icon='time'
                    iconPosition='left'
                    readOnly
                    width={2}
                />
                {/* <Form.Input type='hidden' width={8} /> */}
                <Form.Input type='hidden' width={6} />
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
                    id='account'
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
                    readOnly
                    label='Invoice'
                    name='record_id'
                    className='TodayDate'
                    placeholder='xxxxxxx'
                    component={Form.Input}
                    inverted={true}
                    icon='hashtag'
                    iconPosition='left'
                    width={2}
                />
            </Form.Group>
            <Form.Group>
                <Field
                    name='areaCode'
                    id='areaCode'
                    error={!props.edited ? false : true}
                    className='AreaCode'
                    inverted={true}
                    readOnly={!props.edited}
                    placeholder='xxx'
                    component={Form.Input}
                    label='Area Code'
                    normalize={normalizeAreaCode}
                    width={1}
                />
                <Field
                    name='phone'
                    id='phone'
                    error={!props.edited ? false : true}
                    readOnly={!props.edited}
                    className='PhoneNumber'
                    inverted={true}
                    placeholder='xxx-xxxx'
                    component={Form.Input}
                    label='Phone Number'
                    normalize={normalizeInput}
                    width={2}
                />
                {!props.edited ? (
                    <Field
                        readOnly
                        className='Test'
                        name='fullname'
                        component={Form.Input}
                        label='Customer Name'
                        inverted
                        width={4}
                    />
                ) : (
                    <>
                        <Field
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            component={Form.Input}
                            className='Test'
                            error={props.edited}
                            inverted
                            width={3}
                            normalize={(value, prev) => {
                                if (value.match(/^[a-zA-Z]+$/g))
                                    return value.toUpperCase();
                                else {
                                    if (value === '') {
                                        return '';
                                    } else {
                                        return prev;
                                    }
                                }
                            }}
                        />
                        <Field
                            name='lastName'
                            label='Last Name'
                            component={Form.Input}
                            className='Test'
                            error={props.edited}
                            inverted
                            width={3}
                            normalize={(value, prev) => {
                                if (value.match(/^[a-zA-Z]+$/g))
                                    return value.toUpperCase();
                                else {
                                    if (value === '') {
                                        return '';
                                    } else {
                                        return prev;
                                    }
                                }
                            }}
                        />
                    </>
                )}
                {/* <Form.Input type='hidden' width={10} /> */}
                {/* <Form.Input type='hidden' width={10} /> */}
                {/* <Form.Input type='hidden' width={!props.edited ? 6 : 3} /> */}
                {/* <Form.Input type='hidden' width={!props.edited ? 6 : 3} /> */}
                {/* <Form.Input type='hidden' width={!props.edited ? 6 : 3} /> */}
                <Form.Input type='hidden' width={!props.edited ? 6 : 3} />
                <Form.Input
                    floated='right'
                    className='AreaCode'
                    width={1}
                    readOnly
                    inverted={true}
                    label='Current'
                    name='currentGallon'
                    disabled={props.disableBuyInput || props.edited}
                    value={props.currentGallon < 0 ? 0 : props.currentGallon}
                />
                <Form.Input
                    id='buy'
                    name='gallonBuy'
                    label='Buy'
                    className='AreaCode'
                    value={props.gallonBuy}
                    disabled={props.disableBuyInput || props.edited}
                    inverted={true}
                    width={1}
                    onChange={props.handleBuyValue}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? props.buyWaterGallon(e)
                            : null
                    }
                    floated='right'
                />

                <Form.Input
                    className={
                        props.gallonBuy >= props.currentGallon
                            ? 'Remain'
                            : 'AreaCode'
                    }
                    width={1}
                    readOnly
                    type='text'
                    inverted={true}
                    label='Remain'
                    disabled={props.edited}
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
                    // width
                    // width={5}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input type='hidden' width={14} />
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
                    content='Renew'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    disabled={props.disableRenewButton}
                    onClick={props.renewWaterGallon}
                />
            </Form.Group>
        </Form>
    );
};

export default BuyForm;
