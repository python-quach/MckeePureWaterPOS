import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const RenewReceipt = (props) => {
    const {
        detail: {
            account,
            fullname,
            renew,
            record_id,
            invoiceTime,
            invoiceDate,
            renewFee,
            gallonRemain,
        },
    } = props;
    return (
        <Table celled basic inverted selectable striped size='large' compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='12'>
                        <Label
                            ribbon
                            icon='tags'
                            size='large'
                            color='blue'
                            content={`Last Renewal Receipt: [${account} - ${fullname}]`}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Header style={{ backgroundColor: '#9e9e9e24' }}>
                <Table.Row>
                    <Table.HeaderCell content='Account' />
                    <Table.HeaderCell content='Invoice #' />
                    <Table.HeaderCell content='Date' />
                    <Table.HeaderCell content='Time' />
                    <Table.HeaderCell content='Name' />
                    <Table.HeaderCell
                        textAlign='right'
                        content='Renew Fee'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        textAlign='right'
                        content='Renew Gallon'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        textAlign='right'
                        content='Gallon Over'
                        style={{ paddingRight: '25px' }}
                    />
                    <Table.HeaderCell
                        textAlign='right'
                        content='Gallon Total'
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
                            content={account}
                            size='large'
                        />
                    </Table.Cell>
                    <Table.Cell content={record_id} />
                    <Table.Cell content={invoiceDate} />
                    <Table.Cell content={invoiceTime} />
                    <Table.Cell content={fullname} />
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            color='green'
                            size='large'
                            icon='dollar'
                            content={renewFee}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            color='blue'
                            content={renew || 0}
                            icon='cart'
                            size='large'
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            color='red'
                            content={
                                parseInt(gallonRemain) - parseInt(renew || 0)
                            }
                            icon='tint'
                            size='large'
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Label
                            ribbon
                            color='blue'
                            content={gallonRemain}
                            icon='tint'
                            size='large'
                        />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default RenewReceipt;
