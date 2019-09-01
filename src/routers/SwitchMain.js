import {createSwitchNavigator,createAppContainer} from 'react-navigation'

import StackPrivate from './StackPrivate'
import StackPublic from './StackPublic'
import StackCheck from './StackCheck'

const SwitchNavigator = createSwitchNavigator({
    StackCheck,
    StackPublic,
    StackPrivate
},{
    initialRouteName:'StackCheck'
})

export default SwitchMain = createAppContainer(SwitchNavigator)