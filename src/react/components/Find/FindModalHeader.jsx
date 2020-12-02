import React from 'react';
import { Modal } from 'semantic-ui-react';

const FindModalHeader = ({ hide, content }) => {
    return !hide ? <Modal.Header>{content}</Modal.Header> : null;
};

export default FindModalHeader;
