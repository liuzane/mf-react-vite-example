declare global {
  type InputElementChangeEvent = React.ChangeEvent<HTMLInputElement, HTMLInputElement>;
  type InputElementInputEvent = React.InputEvent<HTMLInputElement>;

  interface Result<T> {
    code: number;
    msg: string;
    data?: T;
  }
}

export {};
