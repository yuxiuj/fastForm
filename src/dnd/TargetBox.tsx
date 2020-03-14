import React, { useState, useCallback, useEffect } from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import Colors from './Colors'

const style: React.CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}

export interface TargetBoxProps {
  onDrop: (item: any) => void
  lastDroppedColor?: string[]

  isOver: boolean
  canDrop: boolean
  draggingColor: string
  connectDropTarget: ConnectDropTarget
}

const TargetBoxRaw: React.FC<TargetBoxProps> = ({
  canDrop,
  isOver,
  draggingColor,
  lastDroppedColor,
  connectDropTarget,
}) => {
  const opacity = isOver ? 1 : 0.7
  let backgroundColor = '#fff'
  switch (draggingColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue'
      break
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow'
      break
    default:
      break
  }

  return connectDropTarget(
    <div style={{ ...style, backgroundColor, opacity }}>
      <p>Drop here.</p>
      {
        !canDrop && lastDroppedColor && 
        <div>
          Last dropped: {lastDroppedColor.map(color => (<div key={color}>{color}</div>))}
        </div>
      }
    </div>,
  )
}

const TargetBox = DropTarget(
  [Colors.YELLOW, Colors.BLUE],
  {
    drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
      props.onDrop(monitor.getItemType())
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggingColor: monitor.getItemType() as string,
  }),
)(TargetBoxRaw)

export interface StatefulTargetBoxState {
  lastDroppedColor: string[];
}
const StatefulTargetBox: React.FC = props => {
  const [lastDroppedColor, setLastDroppedColor] = useState<string[]>([])
  const handleDrop = (color: string) => {
    console.log('color ===', color);
    setLastDroppedColor([...lastDroppedColor ,color]);
  }

  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor}
      onDrop={handleDrop}
    />
  )
}

export default StatefulTargetBox
