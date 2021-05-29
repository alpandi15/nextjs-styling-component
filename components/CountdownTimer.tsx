import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const zeroPad = (value: number | string | undefined) => String(value).padStart(2, '0')
const secondsToTime = (secs: number) => {
  const days = Math.floor(secs / (60 * 60 * 24))
  const hours = Math.floor((secs / (60 * 60)) % 24)

  const divisor_for_minutes = secs % (60 * 60)
  const minutes = Math.floor(divisor_for_minutes / 60)

  const divisor_for_seconds = divisor_for_minutes % 60
  const seconds = Math.ceil(divisor_for_seconds)

  const obj = {
    days,
    hours,
    minutes,
    seconds
  }
  return obj
}

type TimeProps = {
  hours:  number | undefined,
  minutes: number | undefined,
  seconds: number | undefined
}

type StateProps = {
  time: TimeProps
}

type MyProps = {
  timeTillDate: Date,
  timeOut: () => void,
  resendCode?: () => void
}

class Countdown extends React.Component<MyProps, StateProps> {
  interval!: ReturnType<typeof setInterval>

  constructor (props: MyProps) {
    super(props)
    this.state = {
      time: {
        // days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
      }
    }
  }


  componentDidMount () {
    this.interval = setInterval(() => {
      const { timeTillDate, timeOut } = this.props
      const then = moment(timeTillDate)
      const now = moment()
      const countdown = (moment(then).diff(moment(now)) / 1000)

      this.setState({
        time: secondsToTime(countdown)
      })
      // Check if we're at zero.
      if (countdown <= 0) {
        console.log('TIME OUT ', countdown)
        clearInterval(this.interval)
        timeOut()
      }
    }, 1000)
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render () {
    const {
      time: { hours, minutes, seconds }
    } = this.state
    const { resendCode } = this.props

    if ((!hours || hours < 0) && (!minutes || minutes < 0) && (!seconds || seconds < 0)) {
      return (
        <div>
          <ResendCode onClick={resendCode}>Resend Code</ResendCode>
        </div>
      )
    }

    return (
      <Content>
        {
          hours ? (
            <>
              <div>{`${zeroPad(hours)}`}</div>
              <div>:</div>
            </>
          ) : null
        }
        <div>{`${zeroPad(minutes)}`}</div>
        <div>:</div>
        <div>{`${zeroPad(seconds)}`}</div>
      </Content>
    )
  }
}

export default Countdown

const Content = styled.div`
  display: flex;
`

const ResendCode = styled.div`
  font-size: 12px;
  color: #26a69a;
  cursor: pointer;

  :hover {
    text-decoration-line: underline;
  }
`