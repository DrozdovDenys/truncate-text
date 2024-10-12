import { useState } from 'react'
import { TruncateText } from './TruncateText'
import './app.css'

const twFontSizes = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-4xl'
]
const initialText = 'Lorem ipsum dolor sit amet.'

function App() {
  const [text, setText] = useState(initialText)
  const [fontSize, setFontSize] = useState('text-base')
  const [maxRowsAmount, setMaxRowsAmount] = useState('1')

  return (
    <div className="w-1/2 h-1/2 overflow-hidden p-4 top-0 right-0 left-0 bottom-0 absolute m-auto bg-slate-50">
      <h1 className="text-center">Truncate Text</h1>
      <div className="flex justify-between gap-20">
        <section className="flex flex-col gap-3 basis-1/2 shrink-0">
          <label htmlFor="inputTextarea">Set max rows amount:</label>
          <input
            id="input"
            type="number"
            value={maxRowsAmount}
            onChange={(e) => {
              setMaxRowsAmount(e.target.value)
            }}
            min={1}
          />
          <label htmlFor="select">Set font size in tw class:</label>
          <select
            name="fontSize"
            id="select"
            onChange={(e) => {
              setFontSize(e.target.value)
              setText(initialText)
            }}
            value={fontSize}
          >
            {twFontSizes.map((fontSize) => (
              <option key={fontSize} value={fontSize}>
                {fontSize}
              </option>
            ))}
          </select>

          <label htmlFor="inputTextarea">Write text:</label>
          <textarea
            id="inputTextarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value.replace(/\s+/g, ' '))
            }}
            rows={5}
            cols={30}
          />
        </section>
        <section className="flex flex-col gap-3 basis-1/2">
          <h2>Truncated text result:</h2>
          <div className="border bg-white p-2 border-dashed border-red-300 relative pb-6">
            <TruncateText maxRowsAmount={Number(maxRowsAmount)}>
              <div className={`${fontSize}`}>{text}</div>
            </TruncateText>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
