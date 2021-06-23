import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faQuestionCircle, faCopy, faIdCard, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

ViewHistory.propTypes = {
  className: PropTypes.string,
}
ViewHistory.defaultProps = {
  className: '',
}

function ViewHistory(props: any){
  const { className } = props;
  const [activity, setActivity] = useState<any>([
    { id: 1,
     title: "Self-Generation"
    },
    { id: 2,
      title: "Duplicate Detection"
     },
     { id: 3,
      title: "Update Profile"
     },
     { id: 4,
      title: "Change password"
     },
  ])
  const [history, setHistory] = useState<any>([
      {
        date: "20/05/2021",
        activity: "Self-Generation questions",
        icon: faQuestionCircle,
      },
      {
        date: "22/05/2021",
        activity: "Duplicate detection questions",
        icon: faCopy,
      },
      {
        date: "23/05/2021",
        activity: "Self-Generation questions",
        icon: faQuestionCircle,
      },
      {
        date: "25/05/2021",
        activity: "Update profile",
        icon: faIdCard,
      },
      {
        date: "25/05/2021",
        activity: "Change password",
        icon: faLock,
      },
      {
        date: "26/05/2021",
        activity: "Self-Generation questions",
        icon: faQuestionCircle,
      },
      {
        date: "26/05/2021",
        activity: "Update profile",
        icon: faIdCard,
      },
      {
        date: "27/05/2021",
        activity: "Change password",
        icon: faLock,
      },

  ]);

   
  return (
    <div className={className}>
        <div className="container">
          <div className="main-left">
            <span className="text">Clear all activity history  <FontAwesomeIcon icon={faTrash}/> </span>
            <p className = "text">Filter by Activity </p>
            <select className="filter-select">
            <option key="all" value="all">All</option>
            {activity.map((act:any) => (
              <option key={act.id} value={act.title}>
                {act.title}
              </option>
              ))}
              </select>
              <div className="notice">
                 <span><FontAwesomeIcon icon={faExclamationCircle} className="item-icon"/>
                 Your activity history is only saved up to 30 days in the system. 
                After 30 days, the information about that activity will be deleted.
                 </span>
              </div>
            </div>
          <div className="main-right">
            <h5>Activity History</h5>
            <hr/>
            <div className= "list-history">
                {history.map((item: any) => (
                    <div className="item-history" key={item.activity}>  
                    <div className="item-activity" >
                      <p className="activity-title"><span className="item-date">{item.date}</span>
                      <FontAwesomeIcon icon={item.icon} className="item-icon"/> {item.activity}</p>
                      </div>
                    <div className="item-delete"><FontAwesomeIcon icon={faTrash}/></div>
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
    background-color: #f7f8fc;
   .container{
     width: 90%;
     margin:auto;
     display: flex;
     justify-content: space-between;
   }
   .main-left{
     width: 20%;
     margin: 40px 0;
   }
   .main-left .text{
     font-size: 16px;
     color: #545D7A;
     margin: 20px;
     font-weight: 500;
   }
   .filter-select{
     width: 80%;
     height: 40px;
     margin: 20px;
     border: none;
     background: none;
     outline: none;
     color: #545D7A;
     border-bottom: 2px solid #545D7A ;
   }
   .notice{
    margin: 200px 0px 20px 20px;
    color: #545D7A;
    font-size: 15px;
   }
   .main-right{
     width: 70%;
     height: auto;
     box-shadow:  rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
     margin: 20px 0;
     border-radius: 5px;
     background: #fff;
   }
   .main-right h5{
     font-size: 20px;
     font-weight: 500;
     padding: 20px;
   }
   .main-right hr{
     height: 2px;
     border: none;
     background-color: #DAE1F5;
   }
   .list-history{
     padding: 20px 10px;
   }
   .item-history{
     display: flex;
     justify-content: space-between;
     padding: 10px 0px;
   }
   .item-date{
     margin:0 20px ;
     color: #545D7A;
   }
   .item-acivity{
     width: 80%;
     
   }
   .activity-title{
    font-size: 16px;
    font-weight: 400;
   }
   .item-icon{
     color: #303f9f;
     margin-right: 5px;
   }
   .item-delete{
     margin-right:20px;
   }

`
export default StyleViewHistory