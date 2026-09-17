import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/use-theme';

interface Props {
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap
}

const MenuIconButton = ({ onPress, icon }: Props) => {

    const primaryColor = useTheme().primary

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Ionicons name={icon} size={24} color={primaryColor} />
        </TouchableOpacity>
    );
}

export default MenuIconButton;
