import { useSignin } from "./hooks/useSignin";
import type { ChangeEvent } from "react";

type InputField = {
  name: "email" | "password";
  type: string;
  placeholder: string;
};

const App = () => {
  const { formData, handleChange, handleSubmit, loading, hasError } = useSignin();

  const inputs: InputField[] = [
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const input_classes = "p-2 rounded outline-none text-xs text-gray-500";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="flex flex-col gap-3 w-64" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <input
            key={input.name}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            className={input_classes}
            value={formData[input.name]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(input.name, e.target.value)
            }
          />
        ))}

        {hasError.message && (
          <small className="text-red-500 capitalize bg-red-100 border border-red-500 p-2 rounded">{hasError.message}</small>
        )}

        <button
          type="submit"
          className={`${input_classes} cursor-pointer bg-blue-400 text-white`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default App;