import { FiFileText, FiGrid, FiImage, FiLayers, FiMenu, FiMonitor, FiSettings, FiSmartphone, FiTablet, FiType } from 'react-icons/fi'

export const builderTabs = [
  { id: 'pages', label: 'Pages', icon: FiFileText },
  { id: 'sections', label: 'Add Sections', icon: FiLayers },
  { id: 'widgets', label: 'Widgets', icon: FiGrid },
  { id: 'media', label: 'Media', icon: FiImage },
  { id: 'theme', label: 'Theme', icon: FiType },
  { id: 'navigation', label: 'Navigation', icon: FiMenu },
  { id: 'settings', label: 'Settings', icon: FiSettings },
]

export const deviceOptions = {
  desktop: { label: 'Desktop', icon: FiMonitor, width: '1180px' },
  tablet: { label: 'Tablet', icon: FiTablet, width: '820px' },
  mobile: { label: 'Mobile', icon: FiSmartphone, width: '390px' },
}
