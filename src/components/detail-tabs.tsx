type DetailTabsProps<T extends string> = {
  activeTab?: T
  ariaLabel: string
  tabs: readonly T[]
  onChange?: (tab: T) => void
}

export function DetailTabs<T extends string>({
  activeTab,
  ariaLabel,
  tabs,
  onChange,
}: DetailTabsProps<T>) {
  const selectedTab = activeTab ?? tabs[0]

  return (
    <div className="detail-tabs-list" aria-label={ariaLabel} role="tablist">
      {tabs.map((tab) => (
        <button
          aria-selected={selectedTab === tab}
          className={selectedTab === tab ? 'active' : undefined}
          key={tab}
          onClick={onChange ? () => onChange(tab) : undefined}
          role="tab"
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
