"use client"
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface ReconciliationContextProps {
    leftColumnData: any
    rightColumnData: any
    dataColumnLabels: any
    reconciliationDetails: any
    reconciliationResults: any
    setLeftColumnData: React.Dispatch<React.SetStateAction<any>>
    setRightColumnData: React.Dispatch<React.SetStateAction<any>>
    setDataColumnLabels: React.Dispatch<React.SetStateAction<any>>
    setReconciliationDetails: React.Dispatch<React.SetStateAction<any>>
    setReconciliationResults: React.Dispatch<React.SetStateAction<any>>
}

const ReconciliationContext = createContext<Partial<ReconciliationContextProps>>({});

const useReconciliationContext = (): Partial<ReconciliationContextProps> => {
    const context = useContext(ReconciliationContext);
    if (!context) {
        throw new Error('useReconciliationContext must be used within a ReconciliationContextProvider');
    }
    return context;
};

const ReconciliationContextProvider = ({ children }: PropsWithChildren) => {
    const [leftColumnData, setLeftColumnData] = useState<any>([])
    const [rightColumnData, setRightColumnData] = useState<any>([])
    const [dataColumnLabels, setDataColumnLabels] = useState<any>([])
    const [reconciliationDetails, setReconciliationDetails] = useState<any>({})
    const [reconciliationResults, setReconciliationResults] = useState<any>({})

    return <ReconciliationContext.Provider value={{
        leftColumnData,
        rightColumnData,
        dataColumnLabels,
        reconciliationDetails,
        reconciliationResults,
        setRightColumnData,
        setLeftColumnData,
        setDataColumnLabels,
        setReconciliationResults,
        setReconciliationDetails
    }}>
        {children}
    </ReconciliationContext.Provider>
}

export { ReconciliationContext, ReconciliationContextProvider, useReconciliationContext };

