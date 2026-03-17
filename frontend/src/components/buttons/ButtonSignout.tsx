import { useSignout } from "../../hooks/useSignout";

const ButtonSignout = () => {

  const { handleSignout } = useSignout();

  return (
    <button onClick={handleSignout}>
      Signout
    </button>
  );
};

export default ButtonSignout;