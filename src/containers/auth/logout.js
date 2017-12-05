import { Store } from 'react-chrome-redux'
import { PORT_NAME } from '../../common/constants'

const proxyStore = new Store({ portName: PORT_NAME })

proxyStore.ready().then(() => {
    proxyStore.dispatch({ type: 'USER_LOGOUT' })
})
