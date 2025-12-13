"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

interface MembershipPlan {
  id: number;
  name: string;
}

interface ActiveMembership {
  id: string;
  member_id: string;
  status: string;
  plan_id: MembershipPlan;
}

interface CheckAccessResponse {
  success: boolean;
  status: number;
  message: string;
  data?: {
    id: string;
    email: string;
    activeMembership?: ActiveMembership;
    allMemberships?: ActiveMembership[];
  };
}

type AccessStatus = "unverified" | "denied" | "granted";

interface AccessState {
  status: AccessStatus;
  loading: boolean;
  error: string | null;
  email: string;
  membershipData?: CheckAccessResponse["data"];
}

type AccessAction =
  | { type: "SET_ACCESS_STATUS"; payload: AccessStatus }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_MEMBERSHIP_DATA"; payload: CheckAccessResponse["data"] | undefined }
  | { type: "RESET_STATE" };

const initialState: AccessState = {
  status: "unverified",
  loading: false,
  error: null,
  email: "",
};

const AccessContext = createContext<{
  state: AccessState;
  dispatch: React.Dispatch<AccessAction>;
} | undefined>(undefined);

const accessReducer = (state: AccessState, action: AccessAction): AccessState => {
  switch (action.type) {
    case "SET_ACCESS_STATUS":
      return { ...state, status: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_MEMBERSHIP_DATA":
      return { ...state, membershipData: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

interface AccessProviderProps {
  children: ReactNode;
}

export const AccessProvider: React.FC<AccessProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(accessReducer, initialState);

  return (
    <AccessContext.Provider value={{ state, dispatch }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
};