import React from 'react'
import classNames from 'classnames'

export interface TableProps {
  tags: string[]
  labels: string[]
  data: {
    [rowNumber: number]: {
      values: any[]
      errors: Set<number>
    }
  }
  visibleRowsCount: number
  rowNumbers: number[]
}

export default function Table(props: TableProps) {
  const { visibleRowsCount, rowNumbers } = props
  const isHeaderVisible = props.tags.includes('#row')
  let afterFailRowNumber = 1
  if (rowNumbers[rowNumbers.length - 1]) {
    afterFailRowNumber = rowNumbers[rowNumbers.length - 1] + 1
  } else {
    afterFailRowNumber = 2
  }
  return (
    <table className="table table-sm" style={{ display: 'table' }}>
      <tbody>
        {props.labels && isHeaderVisible && (
          <tr className="before-fail">
            <td className="text-center">1</td>
            {props.labels.map((label, index) => (
              <td key={index}>{label}</td>
            ))}
          </tr>
        )}
        {rowNumbers.map(
          (rowNumber, index) =>
            index < visibleRowsCount && (
              <tr key={index}>
                <td className="result-row-index">{rowNumber || 1}</td>
                {props.data[rowNumber].values.map((value, innerIndex) => (
                  <td
                    key={innerIndex}
                    className={classNames({
                      fail: props.data[rowNumber].errors.has(innerIndex + 1),
                    })}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            )
        )}
        <tr className="after-fail">
          <td className="result-row-index">{afterFailRowNumber}</td>
          {props.labels && props.labels.map((_, index) => <td key={index} />)}
        </tr>
      </tbody>
    </table>
  )
}
