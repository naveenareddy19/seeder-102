import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

export interface CheckboxAtomProps extends CheckboxProps {
  label?: string;
  handleClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
}

const CheckboxAtom = ({
  handleClick,
  label,
  indeterminate = false,
  ...rest
}: CheckboxAtomProps) => {
  return (
    <Checkbox
      {...rest}
      inputProps={{
        "aria-label": label,
      }}
      onChange={(e) => {
        handleClick!(e);
      }}
      name="checkbox-atom"
      indeterminate={indeterminate}
    />
  );
};

export default CheckboxAtom;
