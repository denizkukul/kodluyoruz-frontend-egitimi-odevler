import React from 'react'
import styles from './styles.module.css'

export const Button = ({ type, children }) => {
  let style;
  switch (type) {
    case 'primary': style = styles.primary;
      break;
    case 'dashed': style = styles.dashed;
      break;
    case 'text': style = styles.text;
      break;
    case 'link': style = styles.link;
      break;
    default: style = "";
  }
  return <button className={`${style} ${styles.btn}`}>{children}</button>
}
