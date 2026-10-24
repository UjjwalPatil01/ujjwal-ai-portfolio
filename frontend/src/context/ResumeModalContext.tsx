import React, { createContext, useCallback, useContext, useState } from 'react';

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export const ResumeModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeResumeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}
    </ResumeModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useResumeModal = (): ResumeModalContextType => {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error('useResumeModal must be used within a ResumeModalProvider');
  }
  return context;
};
