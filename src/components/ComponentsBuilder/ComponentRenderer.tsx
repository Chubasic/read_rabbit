import { useCallback } from "preact/hooks";
import { ComponentTypes, type ConfigSchema } from "./types.ts";
import { COMPONENT_IO_MAP, COMPONENT_MAP } from "./componentRegistry.ts";
import {
  addComponent,
  useCpmDataFlowStore,
  type CpmDataFlowStore,
  type CpmDataFlowStoreValue,
} from "../../store/componentDataFlow.ts";

type ComponentRendererProps = {
  config: ConfigSchema;
};

export const ComponentRenderer = ({ config }: ComponentRendererProps) => {
  const inputsStore = useCpmDataFlowStore();
  const inputData = inputsStore.data;

  const resolveValueBinding = useCallback(
    (componentProps: ConfigSchema["props"], store: CpmDataFlowStore) => {
      const inputs = COMPONENT_IO_MAP[config.type];
      const inputBindings = inputs
        .filter((inputName) => componentProps[inputName] !== undefined)
        .map((inputName) => componentProps[inputName]);

      const resolvedBindings = inputBindings.reduce(
        (acc: CpmDataFlowStoreValue, { $bind }: any) => {
          // For some reason, $bind is not recognized as a Binding type
          const [cmpId] = Object.keys($bind);
          return { ...acc, ...store[cmpId] };
        },
        {},
      );
      return resolvedBindings;
    },
    [],
  );

  switch (config.type) {
    case ComponentTypes.DatePicker: {
      const DatepickerCmp = COMPONENT_MAP[ComponentTypes.DatePicker];
      const datepickerBindingProp = resolveValueBinding(config.props, inputData);
      return (
        <DatepickerCmp
          {...datepickerBindingProp}
          label={config.props.label.toLocaleString()}
          onOutput={({ name, value }) => {
            addComponent(config.cmpId, name, value);
          }}
        />
      );
    }

    case ComponentTypes.EventList: {
      const EventListCmp = COMPONENT_MAP[ComponentTypes.EventList];
      const eventListBindingProp = resolveValueBinding(config.props, inputData);
      return (
        <EventListCmp
          {...(eventListBindingProp as { date: string })}
          label={config.props.label.toLocaleString()}
        />
      );
    }

    case ComponentTypes.Slider: {
      const SliderCmp = COMPONENT_MAP[ComponentTypes.Slider];
      const sliderBindingProp = resolveValueBinding(config.props, inputData);
      return (
        <SliderCmp
          {...(sliderBindingProp as {
            min?: number;
            max?: number;
            label?: string;
          })}
          onOutput={({ name, value }) => {
            addComponent(config.cmpId, name, value);
          }}
        />
      );
    }

    case ComponentTypes.ValueInput: {
      const ValueInputCmp = COMPONENT_MAP[ComponentTypes.ValueInput];
      const valueInputBindingProp = resolveValueBinding(config.props, inputData);
      const { label: inputLabel, type } = config.props;
      return (
        <ValueInputCmp
          label={inputLabel}
          type={type}
          {...(valueInputBindingProp as any)}
          onOutput={({ name, value }) => {
            addComponent(config.cmpId, name, value);
          }}
        />
      );
    }

    case ComponentTypes.TextArea: {
      const TextAreaCmp = COMPONENT_MAP[ComponentTypes.TextArea];
      const textAreaBindingProp = resolveValueBinding(config.props, inputData);
      const { label: textAreaLabel } = config.props;
      return (
        <TextAreaCmp
          {...(textAreaBindingProp as any)}
          label={textAreaLabel}
          onOutput={({ name, value }) => {
            addComponent(config.cmpId, name, value);
          }}
        />
      );
    }
    default: {
      return (
        <div>
          <span>Unknown component: {config.type}</span>
        </div>
      );
    }
  }
};
