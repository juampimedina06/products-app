import { useTheme } from '@/presentation/theme/hooks/use-theme'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useAuthStore } from '../store/useAuthStore'

const LogoutButton = () => {

    const primaryColor = useTheme().primary
    const { logout } = useAuthStore();

    return (
        <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={logout}
        >
            <Ionicons name='log-out-outline' size={24} color={primaryColor} />
        </TouchableOpacity>
    )
}

export default LogoutButton