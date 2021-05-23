import styled from 'styled-components'

const DialogComponent = ({
  className = '',
  title = '',
  message = '',
  buttonAccept = '',
  buttonCancel = '',
  isValid = true,
}) => {
  let classOfTitle = 'title-valid'
  if (!isValid) {
    classOfTitle = 'title-duplicate'
  }

  return (
    <div className={className}>
      <div className="container">
        <div className={classOfTitle}>{title}</div>
        <div className="message">{message}</div>
        <div className="div-button">
          <button className="button buttonAccept">{buttonAccept}</button>
          <button className="button buttonCancel">{buttonCancel}</button>
        </div>
      </div>
    </div>
  )
}

const StyledDialog = styled(DialogComponent)`
  position: absolute;
  left: 50%;
  font-weight: bold;

  .container {
    position: relative;
    left: -50%;
    border: 1px solid gray;
    width: 400px;
    box-shadow: 6px 12px 12px #aba2a2;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .title-valid {
    background-color: rgb(254, 251, 227);
    text-align: center;
    border-bottom: 1px solid gray;
    height: 50px;
    line-height: 50px;
    color: green;
  }

  .message {
    height: 150px;
    text-align: center;
    line-height: 150px;
  }

  .title-duplicate {
    background-color: rgb(254, 251, 227);
    text-align: center;
    border-bottom: 1px solid gray;
    height: 50px;
    line-height: 50px;
    color: red;
  }

  .div-button {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 15px;
  }

  .button {
    border: none;
    padding: 12px 37px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
  }

  .buttonAccept {
    background-color: rgb(215, 227, 250);
  }

  .buttonCancel {
    background-color: rgb(237, 104, 92);
  }
`

export default StyledDialog
