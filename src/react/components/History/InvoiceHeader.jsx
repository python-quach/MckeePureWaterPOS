import React from 'react';
import { Header, Step, Icon } from 'semantic-ui-react';

const InvoiceHeader = (props) => {
    const { fullname, account } = props;
    return (
        <Header>
            <Step.Group size='mini'>
                <Step>
                    <Icon name='info' />
                    <Step.Content>
                        <Step.Title>Invoice History</Step.Title>
                    </Step.Content>
                </Step>
                <Step active>
                    <Icon name='user' />
                    <Step.Content>
                        <Step.Title>{fullname}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active>
                    <Icon name='address card' />
                    <Step.Content>
                        <Step.Title>Account# {account}</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        </Header>
    );
};

export default InvoiceHeader;
