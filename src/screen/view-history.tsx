import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle,
  faCopy,
  faIdCard,
  faLock,
  faExclamationCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import * as moment from 'moment'
import { AccountContext } from '../contexts/account-context'
import * as CONSTANT from '../const'

ViewHistory.propTypes = {
  className: PropTypes.string,
}
ViewHistory.defaultProps = {
  className: '',
}

interface HistoryType {
  id: number
  historyName: string
}

interface History {
  id?: number
  description?: string
  userId?: number
  typeId?: number
  date?: string
  icon?: IconDefinition
}

const GET_HISTORY_TYPE_URL = `${CONSTANT.BASE_URL}/history-type`
const GET_HISTORY_URL = `${CONSTANT.BASE_URL}/history`

function ViewHistory(props: any) {
  const { className } = props
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const userId = localStorage.getItem('id') ? localStorage.getItem('id') : account.id
  const [activity, setActivity] = useState<HistoryType[]>([])
  const [typeId, setSelect] = useState(0)
  const [histories, setHistories] = useState<History[]>([])

  useEffect(() => {
    axios.get(GET_HISTORY_TYPE_URL).then((response) => {
      setActivity(response.data)
    })
  }, [])

  const search = (e: any) => {
    setSelect(e.target.value)
    if (e.target.value === '------') setHistories([])
    axios.get(`${GET_HISTORY_URL}/${userId}/${e.target.value}`).then((response) => {
      setHistories(response.data)
    })
  }

  return (
    <div className={className}>
      <div className="container">
        <div className="main-left">
          <p className="text">Filter by Activity </p>
          <select className="filter-select" onChange={search} value={typeId}>
            <option key="------" value="------">
              ------
            </option>
            <option key="all" value="all">
              All
            </option>
            {activity.map((act: HistoryType) => (
              <option key={act.id} value={act.id}>
                {act.historyName}
              </option>
            ))}
          </select>
          <div className="notice">
            <span>
              <FontAwesomeIcon icon={faExclamationCircle} className="item-icon" />
              Your activity history is only saved up to 30 days in the system. After 30 days, the
              information about that activity will be deleted.
            </span>
          </div>
        </div>
        <div className="main-right">
          <h5>Activity History</h5>
          <hr />
          <div className="list-history">
            {histories.map((item: History, index: number) => (
              <div className="item-history" key={index}>
                <div className="item-activity">
                  <div className="activity-title">
                    <span className="item-date">
                      {moment.default(item.date).format('DD/MM/YYYY')}
                    </span>
                    <span>
                    {item.typeId === CONSTANT.HISTORY_TYPE.DUPLICATE ? (
                      <>
                      <FontAwesomeIcon icon={faCopy} className="item-icon" />
                       Check duplication:{' '} 
                      </>
                      
                    ) : (
                      ''
                    )}
                    {item.typeId === CONSTANT.HISTORY_TYPE.GENERATE ? (
                      <>
                      <FontAwesomeIcon icon={faQuestionCircle} className="item-icon" />
                      Self-Generation question:{' '} 
                      </>
                    ) : (
                      ''
                    )}
                    {item.typeId === CONSTANT.HISTORY_TYPE.UPDATE_PROFILE ? (
                      <FontAwesomeIcon icon={faIdCard} className="item-icon" />
                    ) : (
                      ''
                    )}
                    {item.typeId === CONSTANT.HISTORY_TYPE.CHANGE_PASSWORD ? (
                      <FontAwesomeIcon icon={faLock} className="item-icon" />
                    ) : (
                      ''
                    )}
                    <i>{item.description}</i>
                    </span>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const StyleViewHistory = styled(ViewHistory)`
  width: 100%;
  height: 100vh;
  background-color: #f7f8fb;
  .container {
    margin: 0.5rem;
    display: flex;
    justify-content: space-around;
    padding-top: 5em;
  }
  .main-left {
    width: 25%;
    margin: 40px 0;
  }
  .main-left .text {
    font-size: 16px;
    color: #545d7a;
    margin: 20px;
    font-weight: 500;
  }
  .filter-select {
    width: 80%;
    height: 40px;
    margin: 20px;
    border: none;
    background: none;
    outline: none;
    color: #545d7a;
    border-bottom: 2px solid #545d7a;
  }
  .notice {
    margin: 200px 0px 20px 20px;
    color: #545d7a;
    font-size: 15px;
  }
  .main-right {
    width: 70%;
    height: auto;
    border: 1px solid #dae1f5;
    margin: 20px 0;
    border-radius: 5px;
    background: #fff;
  }
  .main-right h5 {
    font-size: 20px;
    font-weight: 500;
    padding: 20px;
  }
  .main-right hr {
    height: 2px;
    border: none;
    background-color: #dae1f5;
  }
  .list-history {
    padding: 20px 10px;
  }
  .item-history {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
  }
  .item-date {
    margin: 0 20px;
    color: #545d7a;
  }
  .item-acivity {
    width: 80%;
  }
  .activity-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .item-icon {
    color: #303f9f;
    margin-right: 5px;
  }
  .item-delete {
    margin-right: 20px;
  }
`
export default StyleViewHistory
