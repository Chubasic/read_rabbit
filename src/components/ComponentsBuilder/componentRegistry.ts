import { ComponentTypes } from "./types.ts";
import DatePicker from "../DatePicker/index.tsx";
import EventList from "../EventList/index.tsx";
import Slider from "../Slider/index.tsx";
import TextArea from "../TextArea/index.tsx";
import ValueInput from "../ValueInput/index.tsx";

export const DATE_INPUT = "date";
export const VALUE_INPUT = "value";

export const COMPONENT_IO_MAP = Object.freeze({
  [ComponentTypes.DatePicker]: [DATE_INPUT],
  [ComponentTypes.EventList]: [DATE_INPUT, VALUE_INPUT],
  [ComponentTypes.Slider]: [VALUE_INPUT],
  [ComponentTypes.TextArea]: [VALUE_INPUT],
  [ComponentTypes.ValueInput]: [VALUE_INPUT],
});

export const COMPONENT_MAP = Object.freeze({
  DatePicker: DatePicker,
  Slider: Slider,
  EventList: EventList,
  ValueInput: ValueInput,
  TextArea: TextArea,
});

export const COMPONENT_REGISTRY = [
  {
    type: ComponentTypes.DatePicker,
    description: "A date picker input.",
    inputs: COMPONENT_IO_MAP[ComponentTypes.DatePicker],
    outputs: COMPONENT_IO_MAP[ComponentTypes.DatePicker],
    component: COMPONENT_MAP[ComponentTypes.DatePicker],
    props: {
      label: "string, shown above the list",
      date: "a date $bind reference to another component's `date` output",
    },
  },
  {
    type: ComponentTypes.Slider,
    description: "A numeric slider.",
    inputs: COMPONENT_IO_MAP[ComponentTypes.Slider],
    outputs: COMPONENT_IO_MAP[ComponentTypes.Slider],
    component: COMPONENT_MAP[ComponentTypes.Slider],
    props: {
      label: "string, shown above the slider",
    },
  },
  {
    type: ComponentTypes.EventList,
    description: "Lists events for a given date.",
    inputs: COMPONENT_IO_MAP[ComponentTypes.EventList],
    component: COMPONENT_MAP[ComponentTypes.EventList],
    props: {
      label: "string, shown above the list",
      date: "a date string, OR a $bind reference to another component's `date` output",
    },
  },
  {
    type: ComponentTypes.ValueInput,
    description: "A single input field.",
    inputs: COMPONENT_IO_MAP[ComponentTypes.ValueInput],
    outputs: COMPONENT_IO_MAP[ComponentTypes.ValueInput],
    component: COMPONENT_MAP[ComponentTypes.ValueInput],
    props: {
      label: "string, shown above the input",
      type: "HTML input type, e.g. 'text', 'number', 'email'",
    },
  },
  {
    type: ComponentTypes.TextArea,
    description: "A multi-line text area.",
    inputs: COMPONENT_IO_MAP[ComponentTypes.TextArea],
    outputs: COMPONENT_IO_MAP[ComponentTypes.TextArea],
    component: COMPONENT_MAP[ComponentTypes.TextArea],
    props: {
      label: "string, shown above the input",
    },
  },
];
