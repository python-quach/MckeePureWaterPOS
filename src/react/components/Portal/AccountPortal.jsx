import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const AccountPortal = (props) => {
    return (
        <div>
            Account Portal
            <Button
                onClick={() => {
                    // props.history.push('/find');
                    if (props.membership.members) {
                        props.history.push('/member');
                    } else {
                        props.history.push('find');
                    }
                    // props.history.push('/member');
                }}>
                Back
            </Button>
            <pre>{JSON.stringify(props.membership, null, 2)}</pre>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        membership: state.membership,
    };
};

export default connect(mapStateToProps, null)(AccountPortal);
