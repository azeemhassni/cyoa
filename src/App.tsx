import "./styles.css";
import { useMachine } from "@xstate/react";
import { cyoaMachine } from "./machines";

export default function App() {
  const [machine, send] = useMachine(cyoaMachine);

  console.log(machine, send);

  return <div className="App">Hello World</div>;
}
