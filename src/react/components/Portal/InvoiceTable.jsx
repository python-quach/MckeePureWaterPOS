import React from 'react';
import { Table, Statistic } from 'semantic-ui-react';
import InvoiceRow from './InvoiceRow';

const InvoiceTable = (props) => {
    // console.log(props);
    const {
        invoices,
        // totalRenewalFee,
        // totalRenewalAmount,
        // totalBuyGallon,
        // gallonRemain,
    } = props;
    return invoices ? (
        <Table celled color='blue' size='small'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content='Invoice' />
                    <Table.HeaderCell content='Membership' />
                    <Table.HeaderCell content='Member Since' />
                    <Table.HeaderCell content='Phone Number' />
                    <Table.HeaderCell content='Name' />
                    <Table.HeaderCell content='Renew Fee' />
                    <Table.HeaderCell content='Gallon Renew' />
                    <Table.HeaderCell content='Gallon Prev' />
                    <Table.HeaderCell content='Gallon Buy' />
                    <Table.HeaderCell content='Gallon Remain' />
                    <Table.HeaderCell content='Purchase Date' />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice, index) => (
                    <InvoiceRow {...invoice} key={index} />
                ))}
            </Table.Body>
            {/* <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'></Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='blue' size='mini'>
                            <Statistic.Value>TOTAL</Statistic.Value>
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>
                                ${totalRenewalFee}
                            </Statistic.Value>
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>
                                {totalRenewalAmount}
                            </Statistic.Value>
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell content=''></Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>{totalBuyGallon}</Statistic.Value>
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>
                        <Statistic color='green' size='mini'>
                            <Statistic.Value>{gallonRemain}</Statistic.Value>
                        </Statistic>
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='1'></Table.HeaderCell>
                </Table.Row>
            </Table.Footer> */}
        </Table>
    ) : null;
};

export default InvoiceTable;
