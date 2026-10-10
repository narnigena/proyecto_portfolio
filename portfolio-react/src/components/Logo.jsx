import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoLink = styled(Link)`
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
`;

export default function Logo({ to = "/" }) {
  return <LogoLink to={to}>Narnígena</LogoLink>;
}