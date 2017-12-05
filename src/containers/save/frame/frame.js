import {getURL, addMessageListener} from '../../../common/interface'

(function(getURL, addMessageListener){

    let frame = document.createElement('iframe')
    frame.style.border         = 'none'
    frame.style.height         = 0
    frame.style.overflow       = 'hidden'
    frame.style.position       = 'fixed'
    frame.style.right          = 0
    frame.style.top            = 0
    frame.style.width          = '335px'
    frame.style.zIndex         = 2147483647

    // frame.style.transition     = 'height 250ms'
    // frame.style.backgroundColor= 'rgba(0,0,255, 0.5)' //DEV ONLY

    function initFrame(){
        return new Promise (resolve => {
            if(document.body && !location.ancestorOrigins.length) { // eslint-disable-line
                return resolve(appendIFrame())
            }
            window.requestAnimationFrame(initFrame)
        })
    }

    function appendIFrame(){
        frame.setAttribute('allowtransparency', true)
        frame.src = getURL('save.html')

        document.body.appendChild(frame)
    }

    function handleAction( action ){
        if(action.type === 'frameShift'){
            frame.style.height = `${action.value}px`
        }
    }

    function render(){
        initFrame()
            .then( () => {
                addMessageListener(handleAction)
            })
    }

    render()

}(getURL, addMessageListener))

