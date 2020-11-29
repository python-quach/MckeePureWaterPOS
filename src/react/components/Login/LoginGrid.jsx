import React from 'react';
import { Grid } from 'semantic-ui-react';

function LoginGrid(props) {
    return (
        <Grid {...props.grid}>
            <Grid.Column style={{ maxWidth: 450 }}>
                {props.children}
            </Grid.Column>
        </Grid>
    );
}

LoginGrid.defaultProps = {
    grid: {
        textAlign: 'center',
        style: { height: '100vh' },
        verticalAlign: 'middle',
    },
};

export default LoginGrid;
