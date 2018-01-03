import defaultTopGreenery from '../../assets/images/greenery/leaves.png';
import defaultTopFloral from '../../assets/images/florals/flower-top.png';
import defaultTopWreath from '../../assets/images/bases/wreaths/wreath.png';
import defaultArrangement from '../../assets/images/arrangement_sketch.jpg';
import defaultBouquet from '../../assets/images/bouquet_sketch.jpg';

export default props => {
  if (props.type === 'default-greenery') {
    return defaultTopGreenery;
  } else if (props.type === 'default-floral') {
    return defaultTopFloral;
  } else if (props.type === 'default-wreath') {
    return defaultTopWreath;
  } else if (props.type === 'default-bouquet') {
    return defaultBouquet;
  } else if (props.type === 'default-arrangement') {
    return defaultArrangement;
  } else {
    console.log('NO IMAGE');
  }
};
