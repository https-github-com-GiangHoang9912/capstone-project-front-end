// import React from 'react'
import { useState } from 'react'
import DialogComponent from '../common/dialog'

// import Constant from "../const.json";
// import axios from "axios";

function HomePage(props: any) {
  const [className, setChoice] = useState("hidden-dialog")

  function handleDialogChoice(choice_: boolean) {
    if (choice_) {
      console.log("accept")
      return
    }
    console.log("cancel")
  }

  function handleShowDialog(isShow: boolean) {
    if (isShow) {
      setChoice("show-dialog")
      return
    }
    setChoice("hidden-dialog")
  }

  return (
    <div>
      <button onClick={() => handleShowDialog(true)}>Show dialog</button>
      <button onClick={() => handleShowDialog(false)}>Hidden dialog</button>
      {/* test dialog confirm */}
      <DialogComponent
        className={className}
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
