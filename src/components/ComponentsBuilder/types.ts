import { ComponentType } from "preact";

export type OutputDate = "date";
export type OutputValue = "value";

type DataFlowTypes = OutputDate[] | OutputValue[];

export type OnOutputFnArgs = { name: string; value: string | number | boolean };
export type OnOutputFn = ({ name, value }: OnOutputFnArgs) => void;

type Binding = {
  $bind: Record<string, OutputDate | OutputValue>;
};

type SelectOptions = string[] | number[];

export type PropValue = Binding | string | number | SelectOptions;

export enum ComponentTypes {
  DatePicker = "DatePicker",
  EventList = "EventList",
  Slider = "Slider",
  TextArea = "TextArea",
  ValueInput = "ValueInput",
}

/*
 ** Example Config Schema
 * [ { "cmpId": "componentId", "type": "DatePicker",
 * "props": { "label": "Select a Date" } },
 * { "cmpId": "input1", "type": "ValueInput", "props": { "label": "Enter a value", "type": "text" } },
 * { "cmpId": "eventList1", "type": "EventList",
 *   "props": { "label": "Events for Selected Date",
 *     "date": { "$bind": { "componentId": "date" } },
 *     "value": { "$bind": { "input1": "value" } }
 *   }
 * } ]
 */

export type ConfigSchema = {
  cmpId: string;
  type: ComponentTypes;
  props: Record<string, PropValue>;
};

export type ComponentRegistry = Map<
  string,
  {
    Component: ComponentType;
    desc: string;
    outputs?: DataFlowTypes;
    inputs?: DataFlowTypes;
  }
>;
