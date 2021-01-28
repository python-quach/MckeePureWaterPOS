import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonMenu = (props) => {
    const {
        edited,
        handleBackButton,
        resetBuyForm,
        setEdited,
        loadingEdited,
        setLoadingEdited,
        updateMembership,
        formBuy,
    } = props;

    return (
        <>
            <Button content='Done' floated='right' onClick={handleBackButton} />
            {edited ? (
                <Button
                    floated='right'
                    content='Cancel Edit'
                    color='blue'
                    onClick={() => {
                        resetBuyForm();
                        setEdited(false);
                    }}
                />
            ) : null}
            <Button
                loading={loadingEdited}
                floated='right'
                color={!edited ? 'vk' : 'google plus'}
                content={!edited ? 'Edit Customer' : 'Save'}
                onClick={() => {
                    if (edited) {
                        setLoadingEdited(true);
                        updateMembership(formBuy, (response) => {
                            setEdited(false);
                            setLoadingEdited(false);
                        });
                    } else {
                        setEdited(true);
                    }
                }}
            />
        </>
    );
};

export default ButtonMenu;
