import styled from 'styled-components'

export const FormControl = styled.div`
  margin-top: .5rem;
  position: relative;
`
export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  margin: 0 0 8px 0;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;
  transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;
  font-size: 14px;

  :focus {
    border-bottom: 1px solid #039496;
    box-shadow: 0 1px 0 0 #039496;
  }
`
export const Label = styled.label`
  font-size: 12px;
  left: .75rem;
  top: 4;
  position: absolute;
  pointer-events: none;
  cursor: text;
  transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
  transform-origin: 0% 100%;
  text-align: initial;
  transform: translateY(12px);

  ${Input}:focus ~ & {
    transform: translateY(-14px) scale(0.8);
    transform-origin: 0 0;
    color: #039496;
  }

  &.active {
    transform: translateY(-14px) scale(0.8);
    transform-origin: 0 0;
  }

  &.valid {
    color: #039496;
  }

  &.invalid {
    color: #960303;
  }

  :after {
    display: block;
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
    transition: .2s opacity ease-out, .2s color ease-out;
  }
`