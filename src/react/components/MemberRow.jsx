import React from 'react';
import { List, Button, Modal, Icon } from 'semantic-ui-react';
import BuyForm from './BuyForm';
import BuyModal from './BuyModal';

const MemberRow = (props) => {
    const [open, openBuyModal] = React.useState(false);

    return (
        <List verticalAlign='middle' size='huge' inverted>
            <List.Item>
                <List.Content floated='right'>
                    <BuyModal
                        setOpen={openBuyModal}
                        open={open}
                        hideField={props.hideField}
                        hideMemberRow={props.hideRow}
                    />

                    {!props.hide ? (
                        <>
                            <Button
                                // focus
                                circular
                                size='huge'
                                color='pink'
                                content='Buy'
                                labelPosition='right'
                                icon='plus cart'
                                onClick={() => {
                                    openBuyModal(true);
                                    props.hideRow(true);
                                }}
                            />
                            <Button
                                circular
                                // focus
                                size='huge'
                                color='facebook'
                                content='Renew'
                                labelPosition='right'
                                icon='redo'
                            />
                            <Button
                                circular
                                // focus
                                size='huge'
                                color='twitter'
                                content='Edit'
                                labelPosition='right'
                                icon='edit'
                            />
                            <Button
                                circular
                                // focus
                                size='huge'
                                color='grey'
                                content='Invoice'
                                labelPosition='right'
                                icon='sticky note'
                            />
                        </>
                    ) : null}
                </List.Content>
                <List.Content>
                    {!props.hide ? (
                        <>
                            <Button
                                circular
                                inverted
                                // inverted
                                // circular
                                size='huge'
                                color='grey'
                                // color='blue'
                                content='302039'
                                icon='gg'
                                // label={{
                                // basic: false,
                                // basic: true,
                                // color: 'blue',
                                // color: 'grey',
                                // pointing: 'right',
                                // }}
                            />
                            <Button
                                inverted
                                circular
                                color='grey'
                                // inverted
                                // circular
                                size='huge'
                                // color='red'
                                // color='blue'
                                // color='grey'
                                content='Hung Quach'
                                icon='user'
                                // label={{
                                // basic: false,
                                // basic: true,
                                // color: 'red',
                                // color: 'grey',
                                // color: 'blue',
                                // pointing: 'right',
                                // content: '200',
                                // }}
                            />
                            <Button
                                circular
                                inverted
                                size='huge'
                                color='grey'
                                content='Gallon Remain'
                                // icon='fork'
                                icon='flask'
                                label={{
                                    // as: 'h1',
                                    basic: true,
                                    color: 'blue',
                                    // pointing: 'right',
                                    content: '50',
                                }}
                            />
                        </>
                    ) : null}
                    {/* <Button
                        size='large'
                        color='grey'
                        content='302039'
                        icon='gg'
                        label={{
                            basic: false,
                            color: 'grey',
                            pointing: 'right',
                            // corner: 'left',
                            // content: '200',
                        }}
                    />
                    <Button
                        size='large'
                        color='red'
                        content='Hung Quach'
                        icon='random'
                        label={{
                            basic: false,
                            color: 'red',
                            pointing: 'right',
                            // content: '200',
                        }}
                    />
                    <Button
                        size='large'
                        color='blue'
                        content='Gallon Remaining'
                        // icon='fork'
                        icon='flask'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'right',
                            content: '50',
                        }}
                    /> */}
                </List.Content>
            </List.Item>
        </List>
    );
};

export default MemberRow;
