import React from 'react'
import styled from 'styled-components'
import Ripple from './Ripple'

const Button = styled.button`
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
  text-align: center;
  letter-spacing: .5px;
  font-size: 14px;
  outline: 0;
  border: none;
  border-radius: 2px;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;

  :hover {
    background-color: #2bbbad;
  }
`

type ButtonProps = {
  title: string,
  type: string,
  disabled?: boolean,
  onClick?: Function,
  props?: any
}

const ButtonComponent = ({
  title,
  type,
  disabled,
  onClick,
  props
}: ButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {title}
      <Ripple />
    </Button>
  )
}

export default ButtonComponent
