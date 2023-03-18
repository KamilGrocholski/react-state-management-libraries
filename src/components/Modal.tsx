import {
    KeyboardEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import ReactDOM from 'react-dom'
import useOnClickOutside from '../hooks/useOnClickOutside'

function createWrapperAndAppendToBody(wrapperId: string): HTMLDivElement {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
}

const ReactPortal: React.FC<{
    children: React.ReactNode
    wrapperId: string
}> = ({ children, wrapperId = 'react-portal-wrapper' }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
        null
    )

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId)
        if (!element) {
            element = createWrapperAndAppendToBody(wrapperId)
        }
        setWrapperElement(element)
    }, [wrapperId])

    if (wrapperElement === null) return null

    return ReactDOM.createPortal(children, wrapperElement)
}

const Modal: React.FC<{
    isOpen: boolean
    handleClose(): void
    children: React.ReactNode
}> = ({ children, isOpen, handleClose }) => {
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const modalRef = useRef<HTMLDivElement | null>(null)

    useOnClickOutside(modalRef, handleClose)

    useEffect(() => {
        const closeOnEscaperKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                return handleClose()
            }

            return null
        }

        document.body.addEventListener(
            'keydown',
            closeOnEscaperKeydown as unknown as EventListener
        )

        return () => {
            document.body.removeEventListener(
                'keydown',
                closeOnEscaperKeydown as unknown as EventListener
            )
        }
    }, [handleClose])

    if (!isOpen) return null

    return (
        <ReactPortal wrapperId='modal'>
            <div ref={overlayRef} className='overlay'>
                <div ref={modalRef} className='modal-content'>
                    {children}
                </div>
            </div>
        </ReactPortal>
    )
}

export default Modal
