import { create } from "zustand";
// eslint-disable-next-line no-restricted-imports
import type { OrganizationStore,Region,AppliedFilters,SelectedFilters } from ".";

const initialFilters: SelectedFilters = {
  region: [],
  type: [],
  status: []
};

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  selectedFilters: initialFilters,
  appliedFilters: initialFilters,

  // Region actions
  setRegion: (region: Region) => {
    const { selectedFilters } = get();
    const isAlreadySet = selectedFilters.region.find((r: { id: any; }) => r.id === region.id);

    if (isAlreadySet) {
      const regions = selectedFilters.region.filter((r: { id: any; }) => r.id !== region.id);
      set({ selectedFilters: { ...selectedFilters, region: regions } });
    } else {
      set({
        selectedFilters: {
          ...selectedFilters,
          region: [...selectedFilters.region, region],
        },
      });
    }
  },

  // Type actions
  setType: (type: { name: string }) => {
    const { selectedFilters } = get();
    const isAlreadySet = selectedFilters.type.find((t) => t.name === type.name);

    if (isAlreadySet) {
      const types = selectedFilters.type.filter((t) => t.name !== type.name);
      set({ selectedFilters: { ...selectedFilters, type: types } });
    } else {
      set({
        selectedFilters: {
          ...selectedFilters,
          type: [...selectedFilters.type, type],
        },
      });
    }
  },

  // Status actions
  setStatus: (status: { name: string }) => {
    const { selectedFilters } = get();
    const isAlreadySet = selectedFilters.status.find(
      (s) => s.name.toLowerCase() === status.name.toLowerCase()
    );

    if (isAlreadySet) {
      const statuses = selectedFilters.status.filter(
        (s) => s.name.toLowerCase() !== status.name.toLowerCase()
      );
      set({ selectedFilters: { ...selectedFilters, status: statuses } });
    } else {
      set({
        selectedFilters: {
          ...selectedFilters,
          status: [...selectedFilters.status, status],
        },
      });
    }
  },

  // Clear actions
  clearRegion: () => {
    const { selectedFilters } = get();
    set({ selectedFilters: { ...selectedFilters, region: [] } });
  },

  clearType: () => {
    const { selectedFilters } = get();
    set({ selectedFilters: { ...selectedFilters, type: [] } });
  },

  clearStatus: () => {
    const { selectedFilters } = get();
    set({ selectedFilters: { ...selectedFilters, status: [] } });
  },

  setAppliedFilters: () => {
    const { selectedFilters } = get();
    set({ appliedFilters: { ...selectedFilters } });
  },

  resetFilters: () => {
    set({
      appliedFilters: initialFilters,
      selectedFilters: initialFilters
    });
  },

  clearAppliedFilter: (key: keyof AppliedFilters) => {
    const { appliedFilters } = get();
    set({
      appliedFilters: { ...appliedFilters, [key]: [] },
      selectedFilters: { ...appliedFilters, [key]: [] },
    });
  },
}));
