import React, { Component } from "react"
import { render } from "react-dom"
import style from "./style.less"

export default class Index extends Component {
  render() {
    return <div
      className={
        style
          .banner
      }
    >
      Dark Souls III
      
    </div>
  }
}

render(
  <Index />,
  document
    .getElementById(
      "application"
    )
)





