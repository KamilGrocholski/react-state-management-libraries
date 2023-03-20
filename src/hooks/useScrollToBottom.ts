import { RefObject } from 'react'

export default function useScrollToBottom(elementRef: RefObject<Element>) {
    const scrollToBottom = () => {
        if (elementRef.current) {
            elementRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }
    }

    return scrollToBottom
}
