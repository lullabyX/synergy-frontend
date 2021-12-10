import React, { useContext, useState, createContext, ReactNode } from 'react';
import axios from 'axios';

type contextType = {
    projects: []
    setProjects: () => void
}

const contextDefaultValues:contextType = {
    projects: [],
    setProjects: function (): void {
        throw new Error('Function not implemented.');
    }
}

export const DashboardContext = createContext<contextType>(contextDefaultValues);

export const dashboardCTX = () =>{
    return useContext(DashboardContext);
}
type Props = {
    children: ReactNode;
};

export const DashboardProvidor = ({children}: Props) =>{
    const [projects,setProjects] = useState([
        { 
            name:"database project"
        }
    ]);
    const value:any ={
        projects,
        setProjects
    }
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}
