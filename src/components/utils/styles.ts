import { BAR_TEXTURE } from "../../theme";

export const getBackgroundImage = () => ({
  backgroundImage: `url("${BAR_TEXTURE}")`,
  backgroundRepeat: "repeat",
  backgroundSize: "6px 6px",
});
