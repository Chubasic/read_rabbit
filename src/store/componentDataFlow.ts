import { create } from 'zustand'
import { ConfigSchema } from "../components/ComponentsBuilder/types.ts";

// componentId: {output bind name: value}
//
export type CpmDataFlowStoreValue = Record<string, string | number | boolean>
export type CpmDataFlowStore = {
  [key: string]: CpmDataFlowStoreValue
};

interface CpmDataFlowState {
  data: CpmDataFlowStore;
  addComponent: (cmpId: ConfigSchema["cmpId"], outputType: string, value: string | number | boolean) => void;
}

export const useCpmDataFlowStore = create<CpmDataFlowState>((set) => ({
  data: {} as CpmDataFlowStore,
  addComponent: (cmpId, outputType, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [cmpId]: {
          ...(state.data[cmpId] || {}),
          [outputType]: value,
        },
      },
    })),
}))

export function addComponent(cmpId: ConfigSchema["cmpId"], outputType: string, value: string | number | boolean) {
  useCpmDataFlowStore.getState().addComponent(cmpId, outputType, value)
}
