import React from 'react'

import Auxy from '../../hoc/Auxy'
import classes from './Layout.css'

const layout = (props) => (
    <Auxy>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className = {classes.Content}>
        {props.children}
    </main>
    </Auxy>
)


export default layout