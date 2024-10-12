import React, { useEffect, useRef, useState } from 'react'

type TruncateTextProps = {
  children: React.JSX.Element
  maxRowsAmount: number
}
const MIN_LENGTH_FOR_DOTS = 3

export const TruncateText = ({
  maxRowsAmount,
  children
}: TruncateTextProps) => {
  const [isContentOverflowed, setIsContentOverflowed] = useState({
    x: false,
    y: false
  })
  const [maxCharacters, setMaxCharacters] = useState<number>(0)
  const [maxHeight, setMaxHeight] = useState<number | null>(null)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  const contentRef = useRef<HTMLDivElement>(null)
  const hiddenTextRef = useRef<HTMLDivElement>(null)

  const { className: childrenClassName, children: childrenText } =
    children.props

  useEffect(() => {
    const computedStyle = window.getComputedStyle(contentRef.current as Element)
    const fontSize = parseInt(computedStyle.fontSize)
    const lineHeight = parseInt(computedStyle.lineHeight) / fontSize || 1.2

    setMaxHeight(fontSize * lineHeight * maxRowsAmount)

    const calculateMaxLength = () => {
      if (!contentRef.current || !hiddenTextRef.current) return
      const containerHeight = contentRef.current.clientHeight

      setIsContentOverflowed({
        x:
          (contentRef.current?.scrollWidth || 0) >
          (contentRef.current?.clientWidth || 0),
        y:
          (contentRef.current?.scrollHeight || 0) >
          (contentRef.current?.clientHeight || 0)
      })

      let maxLength = 0
      let start = 0
      let end = childrenText.length
      let middle = 0

      while (start <= end) {
        middle = Math.floor((start + end) / 2)

        hiddenTextRef.current.innerText = childrenText.slice(0, middle)

        if (hiddenTextRef.current.scrollHeight <= containerHeight) {
          maxLength = middle
          start = middle + 1
        } else {
          end = middle - 1
        }
      }
      setMaxCharacters(maxLength)
    }

    calculateMaxLength()
  }, [children])

  return (
    <>
      <div className="relative overflow-hidden">
        <div
          ref={contentRef}
          style={{ maxHeight: `${isCollapsed ? maxHeight + 'px' : '100%'}` }}
          className={`m-0  ${childrenClassName} ${
            isContentOverflowed.y && isCollapsed ? 'opacity-0' : ''
          }`}
        >
          {children}
        </div>

        {isContentOverflowed.y && isCollapsed && (
          <>
            <p
              style={{ maxHeight: `${maxHeight}px` }}
              className={`absolute top-0 m-0 ${childrenClassName}`}
            >
              {childrenText.slice(0, maxCharacters - MIN_LENGTH_FOR_DOTS)}
              ...
            </p>
          </>
        )}

        <div
          ref={hiddenTextRef}
          className={`top-0 m-0 invisible absolute ${childrenClassName}`}
        >
          {children}
        </div>
      </div>

      {isContentOverflowed.y && (
        <button
          className="absolute bottom-0 right-0 cursor-pointer z-20"
          onClick={() => setIsCollapsed((prev) => !prev)}
          type="button"
        >
          {isCollapsed ? 'Show more' : 'Show Less'}
        </button>
      )}
    </>
  )
}
