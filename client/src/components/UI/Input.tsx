import React from "react";
import styled from "styled-components";
import { InputName as AuthInputName } from "../../reducers/AuthReducers";
import { InputName as QuizInputName } from "../../reducers/QuizCreation";
import { Colors } from "../../constants/colors";

export const StyledInput = styled.input`
  padding: 1rem;
  background-color: white;
  width: 300px;
  box-sizing: border-box;
  margin: 0.7rem 0 1.5rem 0;
  border: 0;
`;

export const StyledLabel = styled.label`
  font-size: 0.7rem;
  color: ${Colors.DARK_BLUE};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type InputName = AuthInputName | QuizInputName;

interface InputProps {
  inputName: InputName;
  onChangeFunction: (input: string, inputName: any) => void;
  resetError?: () => void;
  inputType?: "text" | "password";
  value: string;
  isRequired?: boolean;
  label: string;
}

export const Input: React.FC<InputProps> = ({
  inputName,
  onChangeFunction,
  resetError,
  inputType,
  value,
  label,
  isRequired = false
}) => {
  return (
    <Container>
      <StyledLabel htmlFor={inputName}>{label.toUpperCase()}</StyledLabel>
      <StyledInput
        type={inputType}
        value={value}
        required={isRequired}
        onClick={resetError}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeFunction(e.target.value, inputName)
        }
      />
    </Container>
  );
};

// import React from "react";
// import styled from "styled-components";
// import { InputName } from "../../reducers/AuthReducers";
// import { Colors } from "../../constants/colors";

// const StyledInput = styled.input`
//   padding: 1rem;
//   background-color: white;
//   width: 300px;
//   box-sizing: border-box;
//   margin: 0.6rem 0 1rem 0;
//   border: 0;
// `;

// const StyledLabel = styled.label`
//   font-size: 0.7rem;
//   color: ${Colors.DARK_BLUE};
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// interface InputProps {
//   inputName: InputName;
//   onChangeFunction: (input: string, inputName: InputName) => void;
//   resetError: () => void;
//   inputType?: "text" | "password";
// }

// export const Input: React.FC<InputProps> = ({
//   inputName,
//   onChangeFunction,
//   resetError,
//   inputType
// }) => {
//   return (
//     <Container>
//       <StyledLabel htmlFor={inputName}>{inputName.toUpperCase()}</StyledLabel>
//       <StyledInput
//         type={inputType}
//         required
//         onClick={resetError}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           onChangeFunction(e.target.value, inputName)
//         }
//       />
//     </Container>
//   );
// };
