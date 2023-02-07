import { HTMLProps, ReactNode } from "react";
type ButtonProps = { type: "primary" | "secondary" | "danger" } & {
  children: ReactNode;
};

const Button = (props: ButtonProps & HTMLProps<HTMLButtonElement>) => {
  switch (props.type) {
    case "primary":
      return (
        <button
          className={
            props.disabled ? "nes-btn is-disabled" : "nes-btn is-success"
          }
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
    case "secondary":
      return (
        <button
          className={
            props.disabled ? "nes-btn is-disabled" : "nes-btn is-warning"
          }
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
    case "danger":
      return (
        <button
          className={
            props.disabled ? "nes-btn is-disabled" : "nes-btn is-error"
          }
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
  }
};

export default Button;
