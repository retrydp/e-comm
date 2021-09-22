import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const Slider: React.FC = (): JSX.Element => (
  <>
    <Range defaultValue={[0, 100]} onChange={(e: number[]): void => console.log(e)} />
  </>
);

export default Slider;
