import React from 'react'
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'
import Colors from './Colors'

const Container: React.FC = () => {
  const components = [
    {
      value: 'input',
      label: 'Input',
    },
    {
      value: 'select',
      label: 'Select',
    },
    {
      value: 'datePicker',
      label: 'DatePicker',
    },
  ];
  return (
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
      <div style={{ float: 'left' }}>
        {/* {
          components.map(component => (<SourceBox key={component.value} color={component.label} />))
        } */}
        <SourceBox color={Colors.BLUE} />
        <SourceBox color={Colors.YELLOW} />
        {/* <SourceBox color={Colors.BLUE}>
          <SourceBox color={Colors.YELLOW}>
            <SourceBox color={Colors.YELLOW} />
            <SourceBox color={Colors.BLUE} />
          </SourceBox>
          <SourceBox color={Colors.BLUE}>
            <SourceBox color={Colors.YELLOW} />
          </SourceBox>
        </SourceBox> */}
      </div>

      <div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
        <TargetBox />
      </div>
    </div>
  );
}
  


export default Container
