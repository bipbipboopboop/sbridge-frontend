import { ReactNode } from "react";
import styled from "styled-components";

const Background = (props: { children?: ReactNode; backgroundUrl: string }) => {
  return (
    <Wallpaper backgroundUrl={props.backgroundUrl}>{props.children}</Wallpaper>
  );
};

interface WallpaperProps {
  backgroundUrl: string;
}

const Wallpaper = styled.div<WallpaperProps>`
  height: 100%;
  padding: 0.5em;
  //   background: rgb(129, 251, 184);
  //   background: linear-gradient(
  //     90deg,
  //     rgba(129, 251, 184, 1) 59%,
  //     rgba(40, 199, 111, 1) 100%
  //   );
  background-image: url(${(props) => props.backgroundUrl});
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
`;

export default Background;
