import { CSSProperties, ReactNode } from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const PlaceholderCard = (
  props: {
    children?: ReactNode;
    style?: CSSProperties;
  } & { orientation?: string }
) => {
  switch (props.orientation) {
    case "left":
      return (
        <Card style={props.style} rotateBy={90}>
          {props.children}
        </Card>
      );
    case "right":
      return (
        <Card style={props.style} rotateBy={270}>
          {props.children}
        </Card>
      );
    default:
      return (
        <Card style={props.style} rotateBy={0}>
          {props.children}
        </Card>
      );
  }
};

const Card = (
  props: { children: ReactNode; style?: CSSProperties } & { rotateBy: number }
) => {
  return (
    <BootstrapCard
      style={{
        width: "12vh",
        height: "17vh",
        transform: `rotate(${props.rotateBy}deg)`,
        ...props.style,
      }}
    >
      <BootstrapCard.Body className="d-flex justify-content-center align-items-center">
        {props.children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default PlaceholderCard;
