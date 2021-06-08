import styled from 'styled-components'
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-device-width: ${size.mobileS}) and (max-device-width: 480px)`,
  mobileM: `(min-device-width: ${size.mobileM})`,
  mobileL: `(min-device-width: ${size.mobileL})`,
  tablet: `(min-device-width: ${size.tablet})`,
  laptop: `(min-device-width: ${size.laptop})`,
  laptopL: `(min-device-width: ${size.laptopL})`,
  desktop: `(min-device-width: ${size.desktop})`,
  desktopL: `(min-device-width: ${size.desktop})`
}

export const Container = styled.main`
  width: 100%;
  height: 100%

  @media only screen and ${device?.mobileS} {
    width: 100%;
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 50px;
  background: #26a69a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  color: #ffffff;

  select {
    background: none;
    font-size: 16px;
    height: 50px;
    width: 50px;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;

    option {
      color: #000000;
    }
  }
`;
