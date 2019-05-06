import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-right: 2rem;
  padding-left: 2rem;

  > .link {
    font-size: 5rem;
    font-weight: bold;
    color: #7f7f7f;
    transition: 0.25s;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }
`;

class Header extends Component {
  render() {
    return (
      <Fragment>
        <HeaderDiv className="header">
          <Link to="/" className="link">
            {this.props.headerMessage}
          </Link>
          {/* <span>{this.props.headerMessage}</span> */}
        </HeaderDiv>
      </Fragment>
    );
  }
}

export default Header;
