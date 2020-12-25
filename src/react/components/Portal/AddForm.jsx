import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reset } from 'redux-form';
import { normalizeAreaCode, normalizeInput } from '../../helpers/helpers';

const AddForm = (props) => {
    const { add } = props;
    const [currentGallon, setCurrentGallon] = useState(0);
    const [buyGallon, setBuyGallon] = useState(0);
    const [remain, setRemainGallon] = useState(0);
    const [fee, setFee] = useState(0);
    const [gallonAmount, setGallonAmount] = useState(0);
    const [fullname, setFullName] = useState(null);
    const [newMember, setNewMember] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        console.log(props.add);
        const { firstName, lastName } = props.add;
        if (firstName && lastName) {
            setFullName(firstName + ' ' + lastName);
        }
    }, [props.add]);

    useEffect(() => {
        console.log({ newMember });
    }, [newMember]);

    useEffect(() => {
        if (added) {
            document.getElementById('buy').focus();
        }
    }, [added]);

    // useEffect(() => {
    //     if (props.addForm.firstName || props.addForm.lastName) {
    //         setFullName(props.addForm.firstName + ' ' + props.addForm.lastName);
    //     }
    // }, [props.addForm.firstName, props.addForm.lastName, setFullName]);

    return (
        <Form size='large'>
            <Form.Group>
                <Field
                    // readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
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
                    // readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
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
                    // readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
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
                    // readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
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
                    // readOnly={!newMember ? false : true}
                    readOnly
                    error={!newMember ? false : true}
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
                    readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
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
                    readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
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
                <Field
                    readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
                    id='firstName'
                    name='firstName'
                    inverted={true}
                    className='PhoneNumber'
                    placeholder='Enter Name'
                    width={2}
                    component={Form.Input}
                    label='First Name'
                    normalize={(value) => {
                        if (value.match(/^[a-zA-Z]+$/g))
                            return value.toUpperCase();
                    }}
                />
                <Field
                    readOnly={!newMember ? false : true}
                    error={!newMember ? false : true}
                    name='lastName'
                    label='Last Name'
                    inverted={true}
                    className='PhoneNumber'
                    placeholder='Enter Name'
                    width={2}
                    component={Form.Input}
                    normalize={(value) => {
                        if (value.match(/^[a-zA-Z]+$/g))
                            return value.toUpperCase();
                    }}
                />
                <Form.Input type='hidden' width={5} />
                <Form.Input
                    error={!newMember ? false : true}
                    readOnly={!newMember ? false : true}
                    id='renew'
                    label='Renew Fee'
                    name='renewalFee'
                    className='AreaCode'
                    value={fee}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setFee(0);
                        } else {
                            setFee(parseInt(value));
                        }
                    }}
                    inverted={true}
                    width={1}
                />
                <Form.Input
                    error={!newMember ? false : true}
                    readOnly={!newMember ? false : true}
                    label='Gallon'
                    name='renewalAmount'
                    className='AreaCode'
                    value={gallonAmount}
                    disabled={!fee}
                    inverted={true}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setGallonAmount(0);
                        } else {
                            setGallonAmount(parseInt(value));
                        }
                    }}
                    onKeyPress={(e) =>
                        e.key === 'Enter' || e.keyCode === 13
                            ? // ? props.renewWaterGallon(e)
                              console.log({ fullname })
                            : null
                    }
                    width={1}
                />
                <Form.Button
                    content='Add Membership'
                    style={{ marginTop: '30px' }}
                    color='blue'
                    size='large'
                    disabled={!fee || !gallonAmount || added}
                    onClick={() => {
                        const data = {
                            ...add,
                            fullname: fullname,
                        };
                        console.log({ data });
                        setNewMember({
                            ...add,
                            fullname: fullname,
                        });
                        setCurrentGallon(gallonAmount);
                        setRemainGallon(gallonAmount);
                        setAdded(true);
                        // document.getElementById('buy').focus();
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input type='hidden' width={12} />
                <Form.Input
                    error={!newMember ? false : true}
                    name='currentGallon'
                    className='AreaCode'
                    value={currentGallon}
                    disabled={!currentGallon && !added}
                    width={1}
                    readOnly
                    inverted={true}
                    label='Current'
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setCurrentGallon(0);
                        } else {
                            setCurrentGallon(parseInt(value));
                        }
                    }}
                />
                <Form.Input
                    name='gallonBuy'
                    className='AreaCode'
                    id='buy'
                    label='Buy'
                    value={buyGallon}
                    disabled={!buyGallon && !added}
                    inverted={true}
                    width={1}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setBuyGallon(0);
                            setRemainGallon(currentGallon);
                        } else {
                            setBuyGallon(parseInt(value));
                            setRemainGallon(
                                parseInt(currentGallon) - parseInt(value)
                            );
                        }
                    }}
                    // onChange={props.handleBuyValue}
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
                    name='remain'
                    type='text'
                    inverted={true}
                    label='Remain'
                    disabled={!remain}
                    // value={props.gallonAfterBuy || 0}
                    value={remain}
                    onChange={(e, { value }) => {
                        if (isNaN(parseInt(value))) {
                            setRemainGallon(0);
                        } else {
                            setRemainGallon(parseInt(value));
                        }
                    }}
                />
                <Form.Button
                    content='Buy'
                    size='large'
                    style={{
                        marginTop: '30px',
                    }}
                    color='green'
                    // disabled={!currentGallon && !buyGallon}
                    disabled={!currentGallon || !buyGallon}
                    onClick={props.buyWaterGallon}
                    width={1}
                />
            </Form.Group>
        </Form>
    );
};

export default AddForm;
