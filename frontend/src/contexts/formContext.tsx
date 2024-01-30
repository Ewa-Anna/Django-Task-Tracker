 
import { createContext, useContext, useState } from "react";
 
export const ProjectFormContext = createContext({});
 
export function ProjectFormProvider({ children }) {
  const value = useState({});
  return (
    <ProjectFormContext.Provider value={value}>
      {children}
    </ProjectFormContext.Provider>
  );
}
 
export function useAppState() {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}