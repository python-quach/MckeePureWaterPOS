import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

const BuyForm = (props) => {
    // useEffect(() => {
    //     // if (!props.disableRenewInput) {
    //     document.getElementById('buy').focus();
    //     // } else {
    //     //     document.getElementById('renew').focus();
    //     // }
    // }, []);
    // // }, [props.disableRenewInput]);

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
                    className='AreaCode'
                    inverted={true}
                    name='areaCode'
                    width={1}
                    readOnly
                    placeholder='xxx'
                    component={Form.Input}
                    label='Area Code'
                />
                <Field
                    readOnly
                    className='PhoneNumber'
                    inverted={true}
                    name='phone'
                    placeholder='xxx-xxxx'
                    width={2}
                    component={Form.Input}
                    label='Phone Number'
                />

                <Field
                    className='Test'
                    inverted={true}
                    name='fullname'
                    width={3}
                    component={Form.Input}
                    label='Customer Name'
                />
                <Form.Input type='hidden' width={7} />
                <Form.Input
                    className='AreaCode'
                    width={1}
                    readOnly
                    inverted={true}
                    label='Current'
                    name='currentGallon'
                    value={props.currentGallon || 0}
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
            </Form.Group>
            <Form.Group>
                <Form.Input type='hidden' width={13} />
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
                    width={1}
                />
                <Form.Button
                    content='Renew'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    disabled={props.disableRenewButton}
                    onClick={props.renewWaterGallon}
                    width={1}
                />
            </Form.Group>
        </Form>
    );
};

export default BuyForm;
