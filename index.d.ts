export interface Region {
    id: string;
    name: string;
    code: string;
  }
  
  export interface Company {
    company: {
      id: string;
      name: string;
      current_company: boolean;
      comapny_logo_url: string;
    };
    organization_id: string;
    role: string;
    region: Region;
  }
  
  // Filter related types
  export interface SelectedFilters {
    region: Region[];
    type: { name: string }[];
    status: { name: string }[];
  }
  
  export interface AppliedFilters extends SelectedFilters {}
  
  export interface OrganizationStore {
    // State
    selectedFilters: SelectedFilters;
    appliedFilters: AppliedFilters;
  
    // Filter actions
    setRegion: (region: Region) => void;
    setType: (type: { name: string }) => void;
    setStatus: (status: { name: string }) => void;
  
    // Clear individual filters
    clearRegion: () => void;
    clearType: () => void;
    clearStatus: () => void;
  
    // Global filter actions
    setAppliedFilters: () => void;
    resetFilters: () => void;
    clearAppliedFilter: (key: keyof AppliedFilters) => void;
  }
  
  // API related types
  export interface OrganizationResponse {
    data: {
      data: Company[];
      meta?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
      };
    };
    error?: string;
  }
  
  export interface SwitchCompanyPayload {
    company_id: string;
    organization_id: string;
    employee_id: string;
  }
  
  export interface SwitchCompanyResponse {
    data?: {
      data: {
        access_token: string;
        refresh_token: string;
        session_id: string;
        session_token: string;
      };
    };
    error?: string;
  }
  