import React from 'react'

import Auxy from '../../hoc/Auxy'

const layout = (props) => (
    <Auxy>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
        {props.children}
    </main>
    </Auxy>
)


export default layout