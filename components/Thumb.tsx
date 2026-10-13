import CarArt from "./CarArt";
export default function Thumb({ art, id }: { art: { hex: string; body: string }; id: string }) { return <CarArt hex={art.hex} body={art.body} id={id + "t"} />; }
