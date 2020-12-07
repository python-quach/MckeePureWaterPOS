import React, { useState, useEffect } from 'react';
import {
    TransitionablePortal,
    Segment,
    Grid,
    Message,
    Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../types';
import MembershipRow from '../MemberRow';

// const renderBodyRow = ({ account, fullname, phone }, index) => {
//     return {
//         key: account || `row-${index}`,
//         cells: [
//             account || 'no account',
//             fullname || 'no name',
//             phone || 'no phone',
//         ],
//     };
// };

const headerRow = ['Account', 'Name', 'Phone Number', 'Actions'];

const PortalMembership = (props) => {
    const { membership, clearMembership } = props;
    const [open, setOpenPortal] = useState(true);
    const [hideField, setHideField] = useState(false);
    const [hide, setHide] = React.useState(false);

    // useEffect(() => {
    //     if (membership.members) {
    //         props.history.push('/account');
    //     }
    // }, [membership, props.history]);

    const handleClose = () => {
        setOpenPortal(false);
        clearMembership();
        props.history.push('/find');
    };
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
                        {/* <MembershipRow
                            hideField={setHideField}
                            hideRow={setHide}
                            hide={hide}
                            close={handleClose}
                            history={props.history}
                        /> */}

                        <Table celled selectable inverted>
                            <Table.Header>
                                <Table.HeaderCell>Account</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Phone</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                                {membership.members
                                    ? membership.members.map(
                                          (member, index) => {
                                              return (
                                                  <Table.Row
                                                      key={index}
                                                      onClick={() => {
                                                          console.log(
                                                              'value send account',
                                                              member.account
                                                          );
                                                      }}
                                                      onMouseOver={() => {
                                                          console.log(
                                                              'mouse over'
                                                          );
                                                      }}
                                                      style={{
                                                          cursor: 'pointer',
                                                      }}>
                                                      <Table.Cell>
                                                          {member.account}
                                                      </Table.Cell>
                                                      <Table.Cell>
                                                          {member.fullname}
                                                      </Table.Cell>
                                                      <Table.Cell>
                                                          {member.phone}
                                                      </Table.Cell>
                                                  </Table.Row>
                                              );
                                          }
                                      )
                                    : null}
                            </Table.Body>
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
