import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavItem = styled(NavLink)`
  border: 2px solid black;
  border-radius: 4px;
  padding: 5px 10px;
  &.active {
    background-color: orange;
    border: 2px solid red;
    color: white;
  }
`;
