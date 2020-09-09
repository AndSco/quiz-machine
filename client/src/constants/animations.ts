import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const slideUp = keyframes`
  from { 
    transform: translate3d(0, 500px, 0); 
    opacity: 0;
  }
  to { 
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;
