import { useState } from "react";

export default function useControlModal() {
  const [active, setActive] = useState<boolean>(false);

  const handleOpen = () => {
    setActive(true);
  };

  const handleClose = () => {
    setActive(false);
  };

  return { active, handleOpen, handleClose };
}
