import React, { useState, useEffect, useRef } from 'react'
import { Doorhanger } from 'components/doorhanger/doorhanger'
import { HeadingConnector } from 'connectors/heading/heading'
import { ItemPreviewConnector } from 'connectors/item-preview/item-preview'
import { TaggingConnector } from 'connectors/tagging/tagging'
import { FooterConnector } from 'connectors/footer/footer'

export const App = () => {
  const appTarget = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleDocumentClick = (e) => {
    if (appTarget?.current?.contains(e.target)) return
    setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(true)

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const closePanel = () => setIsOpen(false)

  return (
    <div ref={appTarget}>
      <Doorhanger isOpen={isOpen}>
        <HeadingConnector />
        <ItemPreviewConnector />
        <TaggingConnector closePanel={closePanel} />
        <FooterConnector />
      </Doorhanger>
    </div>
  )
}
