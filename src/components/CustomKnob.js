import React from "react";
import { Knob, Pointer, Arc, Value } from "rc-knob";

function CustomKnob() {
  return (
    <Knob
      size={80}
      angleOffset={220}
      angleRange={280}
      min={0}
      max={100}
      onChange={(value) => console.log(value)}
    >
      <Arc arcWidth={5} color="#FC5A96" radius={30} />
      <Pointer width={5} radius={23} type="circle" color="#180094" />
      <Value marginBottom={40} className="value" />
    </Knob>
  );
}

export default CustomKnob;
