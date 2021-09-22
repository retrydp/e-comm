import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface SliderProps {
  handler: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({ handler }): JSX.Element => (
  <>
    <Range min={0} max={1500} step={10} defaultValue={[10, 1500]} onChange={(range: number[]) => handler(range)} />
  </>
);

export default Slider;
