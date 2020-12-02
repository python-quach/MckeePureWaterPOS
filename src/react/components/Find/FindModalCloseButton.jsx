import React from 'react';
import { Button } from 'semantic-ui-react';

const FindModalCloseButton = ({ hide, close }) => {
    return !hide ? (
        <Button
            content='Close'
            icon='close'
            labelPosition='right'
            color='red'
            onClick={close}
            size='large'
            circular
        />
    ) : null;
};

export default FindModalCloseButton;
