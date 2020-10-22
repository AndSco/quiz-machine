import userEvent from "@testing-library/user-event";

export const click = (element: any) => userEvent.click(element);
export const enterText = (element: any, text: string) =>
  userEvent.type(element, text);
