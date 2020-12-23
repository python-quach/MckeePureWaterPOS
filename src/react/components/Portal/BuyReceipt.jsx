import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const BuyReceipt = (props) => {
    return (
        <Table celled basic inverted selectable striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='12'>
                        <Label ribbon color='pink'>
                            {props.detail.renew !== null &&
                            props.detail.renew > 0
                                ? `Last Renewal Receipt: [${props.detail.account} - ${props.detail.fullname}]`
                                : `Customer Last Purchase Receipt: [${props.detail.account} - ${props.detail.fullname}]`}
                        </Label>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content='Account' />
                    <Table.HeaderCell content='Invoice #' />
                    <Table.HeaderCell content='Name' />
                    <Table.HeaderCell content='Gallon Previous' />
                    <Table.HeaderCell content='Gallon Buy' />
                    <Table.HeaderCell content='Gallon Left' />
                    <Table.HeaderCell content='Date' />
                    <Table.HeaderCell content='Time' />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell content={props.detail.account}>
                        <Label color='teal' ribbon>
                            {props.detail.account}
                        </Label>
                    </Table.Cell>
                    <Table.Cell content={props.detail.record_id} />
                    <Table.Cell content={props.detail.fullname} />
                    <Table.Cell>
                        <Label
                            ribbon
                            color='blue'
                            content={props.detail.gallonCurrent}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Label ribbon content={props.detail.gallonBuy} />
                    </Table.Cell>
                    <Table.Cell>
                        <Label
                            ribbon
                            color='green'
                            content={props.detail.gallonRemain}
                        />
                    </Table.Cell>

                    <Table.Cell content={props.detail.invoiceDate} />
                    <Table.Cell content={props.detail.invoiceTime} />
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default BuyReceipt;
