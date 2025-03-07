"use client";

import type { ZSwitchCompany } from "@travlrid/types/schemas/company";
import type { Session } from "next-auth";
import type { z } from "zod";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback } from "@travlrid/ui/avatar";
import { Button } from "@travlrid/ui/button";
import { Close, Filter, Search } from "@travlrid/ui/icons";
import { toast } from "@travlrid/ui/toast/use-toast";

import { createAvatarFallback } from "@travlrid/lib/avatar";

import { Error } from "@/components/error";
import { CheckBoxWithLabel } from "@/components/filter-panel/checkbox";
import { InputWithIcon } from "@/components/forms/fields";
import { Spinner } from "@/components/spinner";

import { routes } from "@/lib/routes";

import { useGetMyCompanies } from "@/hooks/use-get-my-companies";

import { useApiClient } from "@/context/api-client";
import Image from 'next/image';

import { switchCompany } from "@/services/company";
import { me } from "@/services/me";
import { usePermissionStore } from "@/store/user-permission";
import React, { useState} from "react";
import { useOrganizationStore } from "@/store/organization";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@travlrid/ui/sheet";
import { useGetRegions } from "@/hooks/use-get-regions";

/* ----------------------------------------------------------------------------------------------- */

type SwitchCompanyMutationVariables = z.infer<typeof ZSwitchCompany>;

type Props = {
  session: Session;
};

const OrganizationScreen = (props: Props) => {
  const { apiClient } = useApiClient("OrganizationScreen");
  const { data } = useGetMyCompanies(apiClient);
  const { session } = props;
  const { update } = useSession();
  const {permissions} = usePermissionStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { appliedFilters } = useOrganizationStore();
  const mutation = useMutation({
    mutationFn: (variable: SwitchCompanyMutationVariables) => switchCompany(apiClient, variable),
    onSuccess: async (data) => {
      if (data.error) {
        toast({ variant: "error", title: data.error });
        return;
      }

      const myProfile = await me(apiClient, {
        headers: {
          Authorization: `Bearer ${data.data?.data.access_token}`,
          "X-Session-Id": data.data?.data.session_id,
          "X-Session-Token": data.data?.data.session_token,
        },
      });

      if (myProfile.error) {
        toast({ variant: "error", title: myProfile.error });
        return;
      }

      await update({
        me: myProfile.data?.data,
        sessionId: data.data?.data.session_id,
        sessionToken: data.data?.data.session_token,
        accessToken: data.data?.data.access_token,
        refreshToken: data.data?.data.refresh_token,
      });

      window.location.reload();
    },
  });

  const onSwitchCompany = (data: { company_id: string; organization_id: string }) => {
    mutation.mutate({
      company_id: data.company_id,
      organization_id: data.organization_id,
      employee_id: session.user.me.employee_id,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputText, setInputText] = useState<string>("")
  const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase)
  }

  if (data?.error) {
    return <Error error={data.error} />;
  }

  const currentCompany = data?.data?.data.find((company) => company.company.current_company);
  const otherCompanies = data?.data?.data.filter((company) => !company.company.current_company);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks, import/no-named-as-default-member
  const filteredCompanies = React.useMemo(() => {
    if (!data?.data?.data) return [];

    const nonCurrentCompanies = data.data.data.filter(
      company => !company.company.current_company
    );
    return nonCurrentCompanies.filter(company => {
      const passesRegionFilter = appliedFilters.region.length === 0 ||
        appliedFilters.region.some(filter => filter.id === company.region?.id);

      const passesSearchFilter = !searchQuery ||
        company.company.name.toLowerCase().includes(searchQuery.trim().toLowerCase());

      return passesRegionFilter && passesSearchFilter;
    });
  }, [data?.data?.data, appliedFilters.region, searchQuery]);


  return (
    <div className="w-full h-auto">
      <div className="mb-3 flex h-auto w-full items-center justify-between lg:flex-col lg:items-start">
        <span className="text-theme-heading text-4xl font-medium leading-loose">Organization</span>
        <div className="w-auto h-auto flex items-start justify-center gap-2 lg:flex-wrap lg:justify-start">
          <InputWithIcon
          onChange={inputHandler}
            icon={<Search className="text-theme-description" />}
            className="w-46"
            inputProps={{ type: "search", placeholder: "Search", className: "py-2", value: searchQuery, onChange: handleSearchChange }}
          />

          <FilterPanel />


          {permissions.settings.organization === "FULL_ACCESS" &&
          <Button asChild>
            <Link href={routes.dashboard.settings.createOrganization}>Add new company</Link>
          </Button>
         }
        </div>
      </div>

      <AppliedFiltersPanel />

      <div className="w-full h-[1px] bg-gray-200" />
      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 mt-4">
        <div className="w-full h-auto flex items-start justify-start lg:justify-between">
          <h1 className="text-base font-semibold leading-tight text-theme-heading flex-[0_0_20%] max-w-[20%]">
            Current Company
          </h1>
          <div className="w-full h-auto flex items-center justify-between flex-[0_0_70%] max-w-[70%] border border-gray-200 rounded-md p-5 lg:flex-col lg:gap-4 lg:items-start">
            <div className="w-auto h-auto flex items-center justify-start gap-5 lg:flex-col lg:items-start">
              <Avatar>
                {currentCompany?.company.comapny_logo_url !=="" &&
                <Image
                  src={currentCompany?.company.comapny_logo_url || ""}
                  className="w-20 h-20 rounded-md"
                  alt={currentCompany?.company.name || "Company logo"}
                  width={100}
                  height={100}
                />
               }
                <AvatarFallback>{createAvatarFallback(currentCompany?.company.name || "")}</AvatarFallback>
              </Avatar>

              <div className="w-auto h-auto">
                <h1 className="text-xl font-semibold leading-tight text-theme-heading">
                  {currentCompany?.company.name}
                </h1>
                <p className="text-base font-normal leading-tight text-theme-heading mt-0.5">
                  {currentCompany?.role || "-"}
                </p>
              </div>
            </div>
            <Link href={`/dashboard/settings/organization/${currentCompany?.company.id}`}>
              <Button variant="outline">View details</Button>
            </Link>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200" />

        <div className="w-full h-auto flex items-start justify-start lg:justify-between">
          <h1 className="text-base font-semibold leading-tight text-theme-heading flex-[0_0_20%] max-w-[20%]">
            Others <span className="text-theme-description">{otherCompanies?.length || 0}</span>
          </h1>
          <div className="w-full h-auto flex items-center justify-between flex-wrap flex-[0_0_70%] max-w-[70%] gap-y-4 md:flex-wrap">
            {filteredCompanies?.map((company, index) => (
              <div
                className="w-full h-auto flex items-center justify-between flex-[0_0_49%] max-w-[49%] border border-gray-200 rounded-md p-5 group md:flex-[0_0_100%] md:max-w-[100%]"
                key={index}
              >
                <div className="w-auto h-auto flex items-center justify-start gap-4">
                  <Avatar>
                    {company.company.comapny_logo_url !=='' ?
                    <Image
                      src={company.company.comapny_logo_url || ""}
                      className="w-20 h-20 rounded-md"
                      alt={company.company.name || "Company logo"}
                      width={100}
                      height={100}
                    />:
                    <AvatarFallback>{createAvatarFallback(company.company.name || "")}</AvatarFallback>}
                  </Avatar>
                  <div className="w-full h-auto">
                    <h1 className="text-base font-semibold leading-tight text-theme-heading">
                      {company.company.name || "-"}
                    </h1>
                    <p className="text-base font-normal leading-tight text-theme-description mt-0.5">
                      {company.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  onClick={() => {
                    onSwitchCompany({
                      company_id: company.company.id,
                      organization_id: company.organization_id,
                    });
                  }}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading && <Spinner className="w-5 h-5" />}
                  {!mutation.isLoading && "Switch"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200" />
      </div>
    </div>
  );
};


const FilterPanel = () => {
  const [open, setOpen] = useState(false);
  const { apiClient } = useApiClient("FilterPanel");
  const { data: regions } = useGetRegions(apiClient);
  const selectedRegions = useOrganizationStore((state) => state.selectedFilters.region);
  const setRegion = useOrganizationStore((state) => state.setRegion);
  const resetFilters = useOrganizationStore((state) => state.resetFilters);
  const setAppliedFilters = useOrganizationStore((state) => state.setAppliedFilters);

  const handleOnFilterApply = () => {
    setAppliedFilters();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Filter className="fill-theme-description" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <div className="mb-4 flex items-center justify-between">
            <SheetTitle className="text-4xl font-medium">Filter</SheetTitle>
            <SheetClose />
          </div>
        </SheetHeader>

        <CheckBoxWithLabel
          title="Regions"
          data={regions?.data?.data || []}
          accessorKey="code"
          checked={(item) => selectedRegions.find((r) => r.id === item.id) !== undefined}
          onCheck={(item) => setRegion({
            id: item.id,
            name: item.name,
            code: item.code
          })}
        />

        <div className="flex flex-col">
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="mt-4 flex w-full items-center justify-center gap-x-2">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={resetFilters}
            >
              Clear All
            </Button>
            <Button
              variant="default"
              className="w-full"
              type="button"
              onClick={handleOnFilterApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AppliedFiltersPanel = () => {
  const { appliedFilters, clearAppliedFilter } = useOrganizationStore();
  const filterKeys = ['region'] as const;
  type FilterKey = typeof filterKeys[number];
  const isFilterApplied = filterKeys.some(key =>
    (appliedFilters[key] as Array<unknown>)?.length > 0
  );

  const getFilterDisplay = (key: FilterKey): string | null => {
    if (key === 'region') {
      const filters = appliedFilters.region;
      if (filters.length === 0) return null;

      if (filters.length <= 2) {
        return filters.map(f => f.code).join(", ");
      }
      return `${filters[0].code}, ${filters[1].code}, +${filters.length - 2} more`;
    }
    return null;
  };

  if (!isFilterApplied) return null;

  return (
    <div className="border border-theme-border-white rounded-md py-2 px-3 mt-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-theme-heading">Filters</span>
        {filterKeys
          .filter(key => (appliedFilters[key] as Array<unknown>)?.length > 0)
          .map((key) => {
            const items = getFilterDisplay(key);
            if (!items) return null;

            return (
              <div
                key={key}
                className="flex items-center gap-1 py-[6px] px-3 rounded-full bg-theme-bg-decor-light-blue"
              >
                <span className="text-sm font-medium text-theme-body">{items}</span>
                <button
                  type="button"
                  onClick={() => clearAppliedFilter(key)}
                  className="ml-1 hover:opacity-75 transition-opacity"
                >
                  <Close className="text-theme-description h-4 w-4" />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrganizationScreen;
