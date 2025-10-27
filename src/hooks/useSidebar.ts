import { useNavigation } from '@react-navigation/native';
import { ComponentProps } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

interface MenuItem {
  id: string;
  title: string;
  icon: ComponentProps<typeof MaterialIcons>['name'];
  badge?: string;
}

interface UseSidebarProps {
  onClose: () => void;
  onMenuItemPress?: (item: string) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
  },
  {
    id: 'systems',
    title: 'XRGI® Systems',
    icon: 'memory',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: 'help',
    badge: '3',
  },
];

const useSidebar = ({ onClose, onMenuItemPress }: UseSidebarProps) => {
  const navigation = useNavigation();

  const handleMenuItemPress = (item: MenuItem) => {
    if (onMenuItemPress) {
      onMenuItemPress(item.id);
    }
    onClose();
  };

  const handleLogout = () => {
    (navigation as any).navigate("Login");
  };

  return {
    // Data
    menuItems,
    
    // Functions
    handleMenuItemPress,
    handleLogout,
  };
};

export default useSidebar;
export type { MenuItem };