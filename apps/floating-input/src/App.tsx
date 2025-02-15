import { FloatingLabelInput } from "./components/common/floating-label-input";

export default function App() {
  return (
    <div className="flex p-5 max-w-3xl">
      <FloatingLabelInput
        label="Email"
        type="email"
        rootClassName="w-full"
        required
      />
    </div>
  );
}
