import React, { useContext, useState, createContext, ReactNode } from 'react';
import axios from 'axios';
import peopleType from '../interfaces/peopleType';

type contextType = {
    createdAt: string,
    creator: string,
    description:string,
    member: Array<peopleType>,
    name: string,
    updatedAt: string,
    _id: string

}

const contextDefaultValues:contextType = {
    createdAt: '',
    creator: '',
    description: '',
    member: [],
    name: '',
    updatedAt: '',
    _id: ''
}

export const DashboardContext = createContext<contextType>(contextDefaultValues);

export const dashboardCTX = () =>{
    return useContext(DashboardContext);
}
type Props = {
    children: ReactNode;
};

export const DashboardProvidor = ({children}: Props) =>{
    const [projects,setProjects] = useState<projectType[]>(projectDefaultValues);
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
