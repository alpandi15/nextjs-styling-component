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
  props: any
}

const ButtonComponent = ({
  title,
  type,
  props
}: ButtonProps) => {
  return (
    <Button {...props} type={type}>
      {title}
      <Ripple />
    </Button>
  )
}

export default ButtonComponent
