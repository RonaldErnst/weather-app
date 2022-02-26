import { ReactComponent as Rain} from '../assets/rain.svg';
import { ReactComponent as Fog} from '../assets/fog.svg';
import { ReactComponent as Storm} from '../assets/storm.svg';
import { ReactComponent as Snow} from '../assets/snow.svg';
import { ReactComponent as Cloud} from '../assets/cloud.svg';
import { ReactComponent as Cloud2} from '../assets/cloud2.svg';
import { ReactComponent as Sun} from '../assets/sun.svg';
import { ReactComponent as Moon} from '../assets/moon.svg';

export default function WeatherIcon(props) {
  switch(props.icon) {
    case "01d":
      return <Sun {...props}/>;
    case "01n":
      return <Moon {...props}/>;
    case "02d":
    case "02n":
      return <Cloud {...props}/>;
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return <Cloud2 {...props}/>;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return <Rain {...props}/>;
    case "11d":
    case "11n":
      return <Storm {...props}/>;
    case "13d":
    case "13n":
      return <Snow {...props}/>;
    case "50d":
    case "50n":
      return <Fog {...props}/>;
    default: 
      return null;
  }
}