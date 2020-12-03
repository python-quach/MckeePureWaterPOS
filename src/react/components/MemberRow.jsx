import React from 'react';
import { List, Button } from 'semantic-ui-react';
import BuyModal from './BuyModal';

const MemberRow = (props) => {
    const [open, openBuyModal] = React.useState(false);
    const { close } = props;

    return (
        <List verticalAlign='middle' size='large' inverted>
            <List.Item>
                <List.Content floated='right'>
                    {/* <BuyModal
                        setOpen={openBuyModal}
                        open={open}
                        closeOnDimmerClick={false}
                        closeOnEscape={false}
                        hideField={props.hideField}
                        hideMemberRow={props.hideRow}
                    /> */}

                    {!props.hide ? (
                        <>
                            <Button
                                circular
                                size='large'
                                color='pink'
                                content='Buy'
                                labelPosition='right'
                                icon='plus cart'
                                onClick={() => {
                                    openBuyModal(true);
                                    props.hideRow(true);
                                    props.history.push('/buy');
                                }}
                            />
                            <Button
                                circular
                                size='large'
                                color='facebook'
                                content='Renew'
                                labelPosition='right'
                                icon='redo'
                            />
                            <Button
                                circular
                                size='large'
                                color='twitter'
                                content='Edit'
                                labelPosition='right'
                                icon='edit'
                            />
                            <Button
                                circular
                                size='large'
                                color='grey'
                                content='Invoice'
                                labelPosition='right'
                                icon='sticky note'
                            />
                            <Button
                                circular
                                size='large'
                                color='red'
                                content='Done'
                                labelPosition='right'
                                icon='close'
                                onClick={close}
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
                                size='large'
                                color='grey'
                                content='302039'
                                icon='gg'
                            />
                            <Button
                                inverted
                                circular
                                color='grey'
                                size='large'
                                content='Hung Quach'
                                icon='user'
                            />
                            <Button
                                circular
                                inverted
                                size='large'
                                color='grey'
                                content='Gallon Remain'
                                icon='flask'
                                label={{
                                    basic: true,
                                    color: 'blue',
                                    content: '50',
                                }}
                            />
                        </>
                    ) : null}
                </List.Content>
            </List.Item>
        </List>
    );
};

export default MemberRow;
