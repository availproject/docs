"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tabs } from 'nextra/components';

// Create context for sharing tab state
const TabContext = createContext<{
  activeTab: number;
  setActiveTab: (index: number) => void;
}>({
  activeTab: 0,
  setActiveTab: () => {},
});

// Provider component to wrap around all synced tab groups
export function SyncedTabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

// Wrapper for individual tab groups
export function SyncedTabs({ items, children }: { items: string[], children: ReactNode }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  
  return (
    <Tabs items={items} selectedIndex={activeTab} onChange={setActiveTab}>
      {children}
    </Tabs>
  );
}

SyncedTabs.Tab = Tabs.Tab;