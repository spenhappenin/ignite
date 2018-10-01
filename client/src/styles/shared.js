import styled from "styled-components";

export const AddButton = styled.button`
  color: #fff !important;
  background: #2ecc71;
  border-color: transparent;
  letter-spacing: .7px;
  padding: 15px;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease;

  &:hover {
    background: #29b765;
    transition: background 0.2s ease, border 0.2s ease;
  }

  &:focus {
    outline: 0;
  }
`;

export const UpdateButton = styled.button`
  color: #fff !important;
  background: #ff9800;
  border-color: transparent;
  letter-spacing: .7px;
  padding: 15px;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease;

  &:hover {
    background: #ea8d03;
    transition: background 0.2s ease, border 0.2s ease;
  }

  &:focus {
    outline: 0;
  }
`;

export const DeleteButton = styled.button`
  color: #fff !important;
  background: #cc2e2e;
  border-color: transparent;
  letter-spacing: .7px;
  padding: 15px;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease;

  &:hover {
    background: #9a2222;
    transition: background 0.2s ease, border 0.2s ease;
  }

  &:focus {
    outline: 0;
  }
`;
