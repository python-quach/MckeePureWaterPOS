import React, { useState, useEffect } from 'react';
import {
    TransitionablePortal,
    Segment,
    Grid,
    Message,
    Table,
    Pagination,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../types';
import { render } from 'react-dom';

const PortalMembership = (props) => {
    const { membership, clearMembership, members } = props;

    const [open, setOpenPortal] = useState(true);
    const [hideField, setHideField] = useState(false);
    const [hide, setHide] = React.useState(false);

    // Pagination State
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [account, setAccount] = useState(null);

    // const [accounts, setAccounts] = useState(members.length < 10 ? members : members.slice(offset, members.length - offset) );

    const onChange = (e, pageInfo) => {
        console.log('on page change', pageInfo.activePage);
        setActivePage(pageInfo.activePage);
        // setOffset(pageInfo.activePage * 10 - 10);
        // setAccount(members.slice((activePage - 1) * offset, activePage * 10));
    };

    useEffect(() => {
        // setOffset(activePage * 10 - 10);
        // setOffset(activePage * 10);
        setAccount(
            members
                ? members.slice((activePage - 1) * 10, activePage * 10)
                : null
        );
    }, [setOffset, setAccount, activePage, offset, members]);

    const handleClose = () => {
        setOpenPortal(false);
        clearMembership();
        props.history.push('/find');
    };

    const Row = ({ account, firstName, lastName, fullname, phone }) => (
        <Table.Row
            onClick={() => props.history.push('/account')}
            style={{ cursor: 'pointer' }}>
            <Table.Cell content={account} />
            <Table.Cell content={firstName} />
            <Table.Cell content={lastName} />
            <Table.Cell content={fullname} />
            <Table.Cell content={phone} />
        </Table.Row>
    );

    // const renderRows = () =>
    //     members
    //         ? members.map((member, index) => <Row key={index} {...member} />)
    //         : null;

    const renderRows = () =>
        account
            ? account.map((member, index) => <Row key={index} {...member} />)
            : null;

    return (
        <TransitionablePortal onClose={handleClose} open={open}>
            <Segment
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    bottom: '1%',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>
                        <Table celled selectable inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell content='Account' />
                                    <Table.HeaderCell content='First Name' />
                                    <Table.HeaderCell content='Last Name' />
                                    <Table.HeaderCell content='Full Name' />
                                    <Table.HeaderCell content='Phone' />
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{renderRows()}</Table.Body>
                        </Table>
                        <Pagination
                            activePage={activePage}
                            onPageChange={onChange}
                            totalPages={
                                members ? Math.ceil(members.length / 10) : 0
                            }
                        />
                        <Message>
                            <Message.Content>
                                <pre>{JSON.stringify(membership, null, 2)}</pre>
                            </Message.Content>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

const mapStateToProps = (state) => {
    return {
        membership: state.membership,
        members: state.membership.members,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearMembership: () => dispatch({ type: actionTypes.CLEAR_MEMBERSHIP }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortalMembership);
