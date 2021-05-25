
import ProgressBar from "@ramonak/react-progress-bar";
import React from 'react';

function progress(props: any) {
  return (
    <div>
      <ProgressBar completed={props.percentage} bgColor="#306BF3" isLabelVisible={true} width="50%" height="30px" margin="auto" />
    </div>
  );
}

export default progress;
