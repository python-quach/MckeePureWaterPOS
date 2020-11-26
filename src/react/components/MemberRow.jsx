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
                        hideMemberRow={props.hideRow}
                    />

                    {!props.hide ? (
                        <>
                            <Button
                                // focus
                                size='large'
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
                                // focus
                                size='large'
                                color='facebook'
                                content='Renew'
                                labelPosition='right'
                                icon='redo'
                            />
                            <Button
                                // focus
                                size='large'
                                color='twitter'
                                content='Edit'
                                labelPosition='right'
                                icon='edit'
                            />
                            <Button
                                // focus
                                size='large'
                                color='grey'
                                content='Invoice'
                                labelPosition='right'
                                icon='sticky note'
                            />
                        </>
                    ) : null}
                    {/* <Button
                        // focus
                        size='large'
                        color='facebook'
                        content='Renew'
                        labelPosition='right'
                        icon='redo'
                    />
                    <Button
                        // focus
                        size='large'
                        color='twitter'
                        content='Edit'
                        labelPosition='right'
                        icon='edit'
                    />
                    <Button
                        // focus
                        size='large'
                        color='grey'
                        content='Invoice'
                        labelPosition='right'
                        icon='sticky note'
                    /> */}
                </List.Content>
                <List.Content>
                    {!props.hide ? (
                        <>
                            {' '}
                            <Button
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
