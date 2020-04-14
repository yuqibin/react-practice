import React from 'react'
import {
  useParams, useHistory, useLocation, useRouteMatch
} from "react-router-dom";

export default function () {
  let { id } = useParams()

  console.log(id, useParams(), useHistory(), useLocation(), useRouteMatch())
  return(
    <div className="home">
      我是Home
      <hr/>
      {
        id ? <div>参数：{id}</div> : <div>nothing</div>   
      }
    </div>
  )
}