import React, { useState } from 'react';
import {
    TransitionablePortal,
    Segment,
    Grid,
    Message,
    Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../types';
import { render } from 'react-dom';

const PortalMembership = (props) => {
    const { membership, clearMembership } = props;
    const [open, setOpenPortal] = useState(true);
    const [hideField, setHideField] = useState(false);
    const [hide, setHide] = React.useState(false);

    // Pagination State
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const handleClose = () => {
        setOpenPortal(false);
        clearMembership();
        props.history.push('/find');
    };

    const Row = ({ account, firstName, lastName, fullname, phone }, index) => (
        <Table.Row
            key={index}
            onClick={() => {
                console.log('value send account', account);
                props.history.push('/account');
            }}
            onMouseOver={() => {
                console.log('mouse over');
            }}
            style={{
                cursor: 'pointer',
            }}>
            <Table.Cell>{account}</Table.Cell>
            <Table.Cell>{firstName}</Table.Cell>
            <Table.Cell>{lastName}</Table.Cell>
            <Table.Cell>{fullname}</Table.Cell>
            <Table.Cell>{phone}</Table.Cell>
        </Table.Row>
    );

    const renderRows = () =>
        membership.members
            ? membership.members.map((member, index) => {
                  return <Row {...member} index={index} />;
                  //   return (
                  //       <Table.Row
                  //           key={index}
                  //           onClick={() => {
                  //               console.log('value send account', member.account);
                  //               props.history.push('/account');
                  //           }}
                  //           onMouseOver={() => {
                  //               console.log('mouse over');
                  //           }}
                  //           style={{
                  //               cursor: 'pointer',
                  //           }}>
                  //           <Table.Cell>{member.account}</Table.Cell>
                  //           <Table.Cell>{member.firstName}</Table.Cell>
                  //           <Table.Cell>{member.lastName}</Table.Cell>
                  //           <Table.Cell>{member.fullname}</Table.Cell>
                  //           <Table.Cell>{member.phone}</Table.Cell>
                  //       </Table.Row>
                  //   );
              })
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
                                    <Table.HeaderCell>Account</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        First Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Last Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Full Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Phone</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{renderRows()}</Table.Body>
                        </Table>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearMembership: () => dispatch({ type: actionTypes.CLEAR_MEMBERSHIP }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortalMembership);
