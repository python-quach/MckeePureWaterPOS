import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const BuyReceipt = (props) => {
    const {
        detail: {
            account,
            fullname,
            record_id,
            gallonCurrent,
            gallonBuy,
            gallonRemain,
            invoiceDate,
            invoiceTime,
        },
    } = props;
    return (
        <Table celled basic inverted selectable striped size='large'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='12'>
                        <Label
                            ribbon
                            icon='tags'
                            // color='green'
                            size='large'
                            content={`Last Purchase Receipt: [${account} - ${fullname}]`}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Header style={{ backgroundColor: '#9e9e9e24' }}>
                <Table.Row>
                    <Table.HeaderCell content='Account' />
                    <Table.HeaderCell content='Name' />
                    <Table.HeaderCell
                        content='Invoice'
                        textAlign='right'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        content='Date'
                        textAlign='right'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        content='Time'
                        textAlign='right'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        content='Gallon Previous'
                        textAlign='right'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        content='Gallon Buy'
                        textAlign='right'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        content='Gallon Left'
                        textAlign='right'
                        style={{ paddingRight: '25px' }}
                    />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Label
                            color='violet'
                            ribbon
                            size='large'
                            icon='hashtag'
                            content={account}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Label
                            ribbon
                            size='large'
                            icon='user'
                            color='pink'
                            content={fullname}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            size='large'
                            icon='hashtag'
                            color='yellow'
                            content={record_id}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            size='large'
                            icon='calendar'
                            color='orange'
                            content={invoiceDate}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            size='large'
                            icon='time'
                            color='orange'
                            content={invoiceTime}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            color='blue'
                            size='large'
                            icon='tint'
                            content={gallonCurrent}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            icon='cart'
                            size='large'
                            color='green'
                            content={gallonBuy}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            icon='tint'
                            size='large'
                            color={gallonRemain < 0 ? 'red' : 'blue'}
                            content={gallonRemain}
                        />
                        {gallonRemain < 0 ? (
                            <Label
                                basic
                                color='red'
                                pointing='left'
                                content='Please renew membership'
                            />
                        ) : null}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default BuyReceipt;
