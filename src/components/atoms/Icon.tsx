import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Color, FoundationProps } from "../../models/types";
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import colors from '../../constants/colors';

const icons: {
  [key: string]: IconDefinition
} = {
  moon: icon({ name: "moon", style: 'regular' }),
  envelope: icon({ name: "envelope", style: 'regular' }),
  bookmark: icon({ name: "bookmark", style: 'regular' }),
  user: icon({ name: "user", style: 'regular' }),
  circleUser: icon({ name: "circle-user", style: 'regular' }),
  calendar: icon({ name: "calendar", style: 'regular' }),
  clock: icon({ name: "clock", style: 'regular' }),
  copy: icon({ name: "copy", style: 'regular' }),
  spinner: icon({ name: "spinner", style: 'solid' }),
  bars: icon({ name: "bars", style: 'solid' }),
  // git: icon({ name: 'github', style: 'solid' }),
  // html5: icon({ name: 'html5', style: 'solid' }),
  // node: icon({ name: 'node', style: 'solid' }),
  // react: icon({ name: 'react', style: 'solid' }),
  // gitlab: icon({ name: 'gitlab', style: 'solid' }),
  // yarn: icon({ name: 'yarn', style: 'solid' }),
  // vuejs: icon({ name: 'vuejs', style: 'solid' }),
  // jenkins: icon({ name: 'jenkins', style: 'solid' }),
  // jira: icon({ name: 'jira', style: 'solid' }),
  // aws: icon({ name: 'aws', style: 'solid' }),
}

type IconsName = keyof typeof icons;

export type IconProps = {
  name: IconsName;
  size?: SizeProp;
  color?: Color;
};

const Icon = ({
  className,
  name,
  size = "3x",
  color = "gray2",
}: IconProps & FoundationProps) => {
  return (
    <span className={className}>
      <FontAwesomeIcon icon={icons[name]} size={size} color={colors[color]} />
    </span >
  );
};

export default Icon;
