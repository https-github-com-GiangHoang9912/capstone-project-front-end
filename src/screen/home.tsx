// import React from 'react'
import DialogComponent from '../common/dialog'

// import Constant from "../const.json";
// import axios from "axios";

function HomePage(props: any) {
  function handleDialogChoice(choice: boolean) {
    console.log(choice)
  }

  return (
    <div>
      {/* test dialog confirm */}
      <DialogComponent
        title="Confirm Dialog"
        message="Bạn Quý có ăn cứt hong ?"
        buttonAccept="Ok"
        buttonCancel="yes"
        isValid={false}
        handleDialogChoice={handleDialogChoice}
      />
      Home
    </div>
  )
}

export default HomePage
