import Sprite from "./Sprite";

interface Props {
  /** The card is hovered or focused: he drops into his fighting stance */
  active: boolean;
  alt: string;
}

/** The platform fighter's hero, idling on his project card. */
const FighterDemo = ({ active, alt }: Props) => {
  const anim = active ? "guard" : "idle";
  return (
    <div className="fighterDemo" role="img" aria-label={alt}>
      <Sprite key={anim} anim={anim} className="fighter pixelRim" />
    </div>
  );
};

export default FighterDemo;
